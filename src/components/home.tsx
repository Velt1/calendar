import React, { useState } from "react";
import MonthlyCalendar from "./calendar/MonthlyCalendar";
import ConfirmationDialog from "./calendar/ConfirmationDialog";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timeZone, setTimeZone] = useState("America/New_York");
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

  const handleBookingSubmit = (data: {
    name: string;
    email: string;
    purpose: string;
  }) => {
    setBookingDetails({
      clientName: data.name,
      clientEmail: data.email,
      meetingPurpose: data.purpose,
      dateTime: selectedDate,
    });
    setShowConfirmation(true);
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
