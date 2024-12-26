import React from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface BookingFormProps {
  onSubmit?: (data: BookingFormData) => void;
  isLoading?: boolean;
  selectedTime?: string;
  selectedDate?: Date;
}

interface BookingFormData {
  name: string;
  email: string;
  purpose: string;
}

const BookingForm: React.FC<BookingFormProps> = ({
  onSubmit = () => {},
  isLoading = false,
  selectedTime = "10:00 AM",
  selectedDate = new Date(),
}) => {
  const form = useForm<BookingFormData>({
    defaultValues: {
      name: "John Doe",
      email: "john@example.com",
      purpose: "Initial consultation",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  return (
    <Card className="p-6 bg-white w-full max-w-[500px] h-[400px]">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Book Your Meeting</h2>
        <p className="text-muted-foreground">
          Selected time: {selectedTime} on {selectedDate.toLocaleDateString()}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meeting Purpose</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Briefly describe the purpose of the meeting"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Booking..." : "Confirm Booking"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default BookingForm;
