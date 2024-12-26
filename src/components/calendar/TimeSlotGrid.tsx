import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";

interface TimeSlot {
  time: string;
  available: boolean;
  bookedBy?: string;
}

interface TimeSlotGridProps {
  slots?: TimeSlot[];
  onSlotSelect?: (time: string) => void;
  selectedDate?: Date;
}

const defaultSlots: TimeSlot[] = [
  { time: "9:00 AM", available: true },
  { time: "10:00 AM", available: false, bookedBy: "John Doe" },
  { time: "11:00 AM", available: true },
  { time: "12:00 PM", available: true },
  { time: "1:00 PM", available: false, bookedBy: "Jane Smith" },
  { time: "2:00 PM", available: true },
  { time: "3:00 PM", available: true },
  { time: "4:00 PM", available: false, bookedBy: "Mike Johnson" },
  { time: "5:00 PM", available: true },
];

const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({
  slots = defaultSlots,
  onSlotSelect = () => {},
  selectedDate = new Date(),
}) => {
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
