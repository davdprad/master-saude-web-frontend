export function generatePassword(length: number = 6): string {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const all = upper + lower + digits;

  const randIndex = (max: number) => {
    try {
      const arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      return arr[0] % max;
    } catch {
      return Math.floor(Math.random() * max);
    }
  };

  const pick = (chars: string) => chars[randIndex(chars.length)];

  const pwd: string[] = [pick(upper), pick(lower), pick(digits)];

  while (pwd.length < length) pwd.push(pick(all));

  for (let i = pwd.length - 1; i > 0; i--) {
    const j = randIndex(i + 1);
    [pwd[i], pwd[j]] = [pwd[j], pwd[i]];
  }

  return pwd.join("");
}
