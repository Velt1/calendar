import React, { useState } from "react";
import MonthlyCalendar from "./calendar/MonthlyCalendar";
import BookingForm from "./calendar/BookingForm";
import ConfirmationDialog from "./calendar/ConfirmationDialog";

interface TimeSlot {
  time: string;
  available: boolean;
  bookedBy?: string;
}

const Home = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null,
  );
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timeZone, setTimeZone] = useState("America/New_York");

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = () => {
    setShowBookingForm(false);
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
          />

          {showBookingForm && selectedTimeSlot && (
            <div className="flex justify-center">
              <BookingForm
                selectedDate={selectedDate}
                selectedTime={selectedTimeSlot.time}
                onSubmit={handleBookingSubmit}
              />
            </div>
          )}

          <ConfirmationDialog
            open={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            bookingDetails={{
              clientName: "John Doe",
              clientEmail: "john.doe@example.com",
              meetingPurpose: "Initial Consultation",
              dateTime: selectedDate,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
