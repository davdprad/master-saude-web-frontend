"use client";

import { DatePickerProps, ViewMode } from "@/src/types/datePicker";
import {
  daysInMonth,
  firstDayOfMonth,
  formatDate,
} from "@/src/utils/datePickerUtils";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function DatePicker({
  value,
  onChange,
  placeholder = "Selecione uma data",
  minDate,
  maxDate,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);
  const [currentMonth, setCurrentMonth] = useState(
    value
      ? new Date(value.getFullYear(), value.getMonth(), 1)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );
  const [viewMode, setViewMode] = useState<ViewMode>("days");
  const [yearRange, setYearRange] = useState(() => {
    const year = currentMonth.getFullYear();
    return {
      start: Math.floor(year / 12) * 12,
      end: Math.floor(year / 12) * 12 + 11,
    };
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const monthNamesShort = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const handlePrevMonth = () => {
    if (viewMode === "days") {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
      );
    } else if (viewMode === "months") {
      setCurrentMonth(
        new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1),
      );
    } else if (viewMode === "years") {
      setYearRange({ start: yearRange.start - 12, end: yearRange.end - 12 });
    }
  };

  const handleNextMonth = () => {
    if (viewMode === "days") {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
      );
    } else if (viewMode === "months") {
      setCurrentMonth(
        new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1),
      );
    } else if (viewMode === "years") {
      setYearRange({ start: yearRange.start + 12, end: yearRange.end + 12 });
    }
  };

  const handleHeaderClick = () => {
    if (viewMode === "days") {
      setViewMode("months");
    } else if (viewMode === "months") {
      setViewMode("years");
      const year = currentMonth.getFullYear();
      setYearRange({
        start: Math.floor(year / 12) * 12,
        end: Math.floor(year / 12) * 12 + 11,
      });
    } else {
      setViewMode("days");
    }
  };

  const handleMonthClick = (monthIndex: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
    setViewMode("days");
  };

  const handleYearClick = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setViewMode("months");
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );

    if (minDate && newDate < minDate) return;
    if (maxDate && newDate > maxDate) return;

    setSelectedDate(newDate);
    onChange?.(newDate);
    setIsOpen(false);
    setViewMode("days");
  };

  const handleClearDate = () => {
    setSelectedDate(null);
    onChange?.(null);
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isMonthDisabled = (monthIndex: number) => {
    const year = currentMonth.getFullYear();
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);

    if (minDate && lastDay < minDate) return true;
    if (maxDate && firstDay > maxDate) return true;
    return false;
  };

  const isYearDisabled = (year: number) => {
    const firstDay = new Date(year, 0, 1);
    const lastDay = new Date(year, 11, 31);

    if (minDate && lastDay < minDate) return true;
    if (maxDate && firstDay > maxDate) return true;
    return false;
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isSelectedMonth = (monthIndex: number) => {
    if (!selectedDate) return false;
    return (
      monthIndex === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isSelectedYear = (year: number) => {
    if (!selectedDate) return false;
    return year === selectedDate.getFullYear();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setViewMode("days");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth);
    const firstDay = firstDayOfMonth(currentMonth);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-7" />);
    }

    for (let day = 1; day <= totalDays; day++) {
      const disabled = isDateDisabled(day);
      const selected = isSelected(day);

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => !disabled && handleDateClick(day)}
          disabled={disabled}
          className={`
            h-7 w-7 rounded-lg text-sm font-medium transition-all duration-200
            ${!selected ? "hover:text-indigo-600" : ""}
            ${disabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-indigo-50 cursor-pointer"}
            ${selected ? "bg-indigo-600 text-white hover:bg-indigo-700" : "text-gray-700"}
          `}
        >
          {day}
        </button>,
      );
    }

    return days;
  };

  const renderMonths = () => {
    return monthNamesShort.map((month, index) => {
      const disabled = isMonthDisabled(index);
      const selected = isSelectedMonth(index);

      return (
        <button
          key={index}
          type="button"
          onClick={() => !disabled && handleMonthClick(index)}
          disabled={disabled}
          className={`
            h-9 rounded-lg text-sm font-medium transition-all duration-200
            ${!selected ? "hover:text-indigo-600" : ""}
            ${disabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-indigo-50 cursor-pointer"}
            ${selected ? "bg-indigo-600 text-white hover:bg-indigo-700" : "text-gray-700"}
          `}
        >
          {month}
        </button>
      );
    });
  };

  const renderYears = () => {
    const years = [];
    for (let year = yearRange.start; year <= yearRange.end; year++) {
      const disabled = isYearDisabled(year);
      const selected = isSelectedYear(year);

      years.push(
        <button
          key={year}
          type="button"
          onClick={() => !disabled && handleYearClick(year)}
          disabled={disabled}
          className={`
            h-9 rounded-lg text-sm font-medium transition-all duration-200
            ${!selected ? "hover:text-indigo-600" : ""}
            ${disabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-indigo-50 cursor-pointer"}
            ${selected ? "bg-indigo-600 text-white hover:bg-indigo-700" : "text-gray-700"}
            ${!disabled ? "hover:scale-105" : ""}
          `}
        >
          {year}
        </button>,
      );
    }
    return years;
  };

  return (
    <div ref={containerRef} className="relative min-w-60">
      {/* Input Field */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between pl-10 px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
      >
        <Calendar
          size={20}
          className={`absolute left-3 top-1/2 -translate-y-1/2 ${
            selectedDate === undefined ? "text-gray-400" : "text-gray-600"
          } group-focus-within:text-indigo-500 transition`}
        />
        <span className={selectedDate ? "text-gray-900" : "text-gray-400"}>
          {formatDate(selectedDate) || placeholder}
        </span>
        <div className="flex gap-1">
          <X
            onClick={handleClearDate}
            size={18}
            className={`transition-transform ${isOpen ? "rotate-90" : ""} ${
              selectedDate === undefined ? "text-gray-400" : "text-gray-600"
            } `}
          />
          <ChevronDown
            size={18}
            className={`transition-transform text-gray-600 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl p-4 w-70 sm:w-full animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-2 hover:bg-indigo-50 hover:text-indigo-600 text-gray-800 rounded-lg transition-colors duration-200"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={handleHeaderClick}
              className="text-sm font-semibold text-gray-800 hover:text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              {viewMode === "days" &&
                `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`}
              {viewMode === "months" && currentMonth.getFullYear()}
              {viewMode === "years" && `${yearRange.start} - ${yearRange.end}`}
            </button>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2 hover:bg-indigo-50 hover:text-indigo-600 text-gray-800 rounded-lg transition-colors duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Day Names (only in days view) */}
          {viewMode === "days" && (
            <div className="grid grid-cols-7 gap-1">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="h-7 flex items-center justify-center text-xs font-medium text-gray-500"
                >
                  {day}
                </div>
              ))}
            </div>
          )}

          {/* Calendar Grid */}
          {viewMode === "days" && (
            <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
          )}

          {/* Months Grid */}
          {viewMode === "months" && (
            <div className="grid grid-cols-3 gap-2">{renderMonths()}</div>
          )}

          {/* Years Grid */}
          {viewMode === "years" && (
            <div className="grid grid-cols-3 gap-2">{renderYears()}</div>
          )}
        </div>
      )}
    </div>
  );
}
