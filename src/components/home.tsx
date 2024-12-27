import React, { useState, useEffect } from "react";
import MonthlyCalendar from "./calendar/MonthlyCalendar";
import ConfirmationDialog from "./calendar/ConfirmationDialog";
import { createBooking } from "@/lib/supabase";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timeZone, setTimeZone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  const [bookingDetails, setBookingDetails] = useState({
    clientName: "",
    clientEmail: "",
    meetingPurpose: "",
    dateTime: new Date(),
  });

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
  };

  const handleBookingSubmit = async (data: {
    name: string;
    email: string;
    purpose: string;
  }) => {
    try {
      // Parse the time string (e.g., "13:00")
      const [hours, minutes] = selectedTimeSlot?.split(":") || ["0", "0"];
      const dateTime = new Date(selectedDate);
      dateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

      await createBooking({
        clientName: data.name,
        clientEmail: data.email,
        meetingPurpose: data.purpose,
        meetingDate: selectedDate,
        meetingTime: selectedTimeSlot || "",
        timezone: timeZone,
      });

      setBookingDetails({
        clientName: data.name,
        clientEmail: data.email,
        meetingPurpose: data.purpose,
        dateTime: dateTime, // Use the dateTime with correct hours and minutes
      });
      setShowConfirmation(true);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Raynbows Meeting Scheduler
          </h1>
          <p className="text-muted-foreground">
            Select a date and time to schedule your meeting with our team
          </p>
        </header>

        <div className="grid gap-8">
          <MonthlyCalendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            timeZone={timeZone}
            onTimeZoneChange={setTimeZone}
            onTimeSlotSelect={handleTimeSlotSelect}
            onBookingSubmit={handleBookingSubmit}
          />

          <ConfirmationDialog
            open={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            bookingDetails={bookingDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
