import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TimeSlotGrid from "./TimeSlotGrid";
import BookingForm from "./BookingForm";

interface BookingFormData {
  name: string;
  email: string;
  purpose: string;
}

interface MonthlyCalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  timeZone?: string;
  onTimeZoneChange?: (timeZone: string) => void;
  onTimeSlotSelect?: (time: string) => void;
  onBookingSubmit?: (data: BookingFormData) => void;
}

const timeZones = Intl.supportedValuesOf("timeZone");

const MonthlyCalendar: React.FC<MonthlyCalendarProps> = ({
  selectedDate = new Date(),
  onDateSelect = () => {},
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  onTimeZoneChange = () => {},
  onTimeSlotSelect = () => {},
  onBookingSubmit = () => {},
}) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTime(time);
    setShowBookingForm(true);
    onTimeSlotSelect(time);
  };

  const handleCancel = () => {
    setShowBookingForm(false);
    setSelectedTime(null);
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
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && onDateSelect(date)}
              className="rounded-md border"
            />
          </div>

          <div className="flex-1">
            {!showBookingForm ? (
              <TimeSlotGrid
                selectedDate={selectedDate}
                timeZone={timeZone}
                onSlotSelect={handleTimeSlotSelect}
              />
            ) : (
              <BookingForm
                selectedDate={selectedDate}
                selectedTime={selectedTime || ""}
                onSubmit={(data) => {
                  setShowBookingForm(false);
                  setSelectedTime(null);
                  onBookingSubmit(data);
                }}
                onCancel={handleCancel}
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MonthlyCalendar;
