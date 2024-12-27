import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";
import { getBookingsForDate } from "@/lib/supabase";

interface TimeSlot {
  time: string;
  available: boolean;
  bookedBy?: string;
}

interface TimeSlotGridProps {
  slots?: TimeSlot[];
  onSlotSelect?: (time: string) => void;
  selectedDate?: Date;
  timeZone?: string;
}

const generateTimeSlots = (timeZone: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const date = new Date();

  // Set to 9 AM in the specified timezone
  date.setHours(9, 0, 0, 0);

  // Create slots from 9 AM to 5 PM
  for (let i = 0; i < 9; i++) {
    const timeString = new Date(
      date.getTime() + i * 60 * 60 * 1000,
    ).toLocaleTimeString("default", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone,
    });

    slots.push({
      time: timeString,
      available: true,
    });
  }

  return slots;
};

const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({
  onSlotSelect = () => {},
  selectedDate = new Date(),
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
}) => {
  const [slots, setSlots] = useState<TimeSlot[]>(() =>
    generateTimeSlots(timeZone),
  );

  useEffect(() => {
    setSlots(generateTimeSlots(timeZone));
  }, [timeZone]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings = await getBookingsForDate(selectedDate, timeZone);
        const updatedSlots = slots.map((slot) => {
          const booking = bookings.find((b) => b.meeting_time === slot.time);
          return {
            ...slot,
            available: !booking,
            bookedBy: booking ? booking.client_name : undefined,
          };
        });
        setSlots(updatedSlots);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [selectedDate, timeZone]);

  return (
    <Card className="p-6 bg-white w-full max-w-[1100px] h-[600px] overflow-y-auto">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">
          Available Time Slots for {selectedDate.toLocaleDateString()}
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {slots.map((slot, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={slot.available ? "outline" : "secondary"}
                  className={cn(
                    "w-full h-20 p-4 flex flex-col items-center justify-center",
                    slot.available
                      ? "hover:bg-primary/10"
                      : "opacity-50 cursor-not-allowed",
                  )}
                  onClick={() => slot.available && onSlotSelect(slot.time)}
                  disabled={!slot.available}
                >
                  <span className="text-lg font-medium">{slot.time}</span>
                  <span className="text-sm">
                    {slot.available ? "Available" : "Booked"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {slot.available
                  ? "Click to select this time slot"
                  : `Booked by ${slot.bookedBy}`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </Card>
  );
};

export default TimeSlotGrid;
