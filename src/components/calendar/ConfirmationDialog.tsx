import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Calendar, Clock } from "lucide-react";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";

interface BookingDetails {
  clientName: string;
  clientEmail: string;
  meetingPurpose: string;
  dateTime: Date;
}

interface ConfirmationDialogProps {
  open?: boolean;
  onClose?: () => void;
  bookingDetails?: BookingDetails;
}

const defaultBookingDetails: BookingDetails = {
  clientName: "John Doe",
  clientEmail: "john.doe@example.com",
  meetingPurpose: "Initial Consultation",
  dateTime: new Date(),
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open = true,
  onClose = () => {},
  bookingDetails = defaultBookingDetails,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary">
            Booking Confirmed!
          </DialogTitle>
          <DialogDescription>
            Your meeting has been successfully scheduled
          </DialogDescription>
        </DialogHeader>

        <Card className="p-6 mt-4 space-y-4 bg-secondary/10">
          <div className="flex items-start space-x-3">
            <Calendar className="w-5 h-5 mt-1 text-primary" />
            <div>
              <h3 className="font-medium">Meeting Details</h3>
              <p className="text-sm text-muted-foreground">
                {bookingDetails.dateTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 mt-1 text-primary" />
            <div>
              <h3 className="font-medium">Time</h3>
              <p className="text-sm text-muted-foreground">
                {bookingDetails.dateTime.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="font-medium">Attendee</h3>
            <p className="text-sm text-muted-foreground">
              {bookingDetails.clientName}
            </p>
            <p className="text-sm text-muted-foreground">
              {bookingDetails.clientEmail}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Meeting Purpose</h3>
            <p className="text-sm text-muted-foreground">
              {bookingDetails.meetingPurpose}
            </p>
          </div>
        </Card>

        <div className="flex justify-end mt-6 space-x-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Add to Calendar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
