export function getCols(length: number): 1 | 2 | 3 | 4 {
  if (length <= 1) return 1;
  if (length === 2) return 2;
  if (length === 3) return 3;
  return 4;
}
