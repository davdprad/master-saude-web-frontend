export interface DatePickerProps {
  value: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

export type ViewMode = "days" | "months" | "years";
