import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TimeSlotGrid from "./TimeSlotGrid";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthlyCalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  timeZone?: string;
  onTimeZoneChange?: (timeZone: string) => void;
}

const timeZones = [
  "America/New_York",
  "America/Los_Angeles",
  "America/Chicago",
  "Europe/London",
  "Asia/Tokyo",
  "Australia/Sydney",
];

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({
  selectedDate = new Date(),
  onDateSelect = () => {},
  timeZone = "America/New_York",
  onTimeZoneChange = () => {},
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(selectedDate);

  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)),
    );
  };

  return (
    <Card className="p-6 bg-white w-full max-w-[1200px] h-[700px] overflow-y-auto">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Schedule a Meeting</h1>
          <div className="w-64">
            <Select value={timeZone} onValueChange={onTimeZoneChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                {timeZones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-[350px]">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePreviousMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium">
                {currentMonth.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && onDateSelect(date)}
              className="rounded-md border"
            />
          </div>

          <div className="flex-1">
            <TimeSlotGrid
              selectedDate={selectedDate}
              onSlotSelect={(slot) => console.log("Selected slot:", slot)}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MonthlyCalendar;
