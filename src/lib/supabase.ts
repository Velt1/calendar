import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export async function createBooking({
  clientName,
  clientEmail,
  meetingPurpose,
  meetingDate,
  meetingTime,
  timezone,
}: {
  clientName: string;
  clientEmail: string;
  meetingPurpose: string;
  meetingDate: Date;
  meetingTime: string;
  timezone: string;
}) {
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      client_name: clientName,
      client_email: clientEmail,
      meeting_purpose: meetingPurpose,
      meeting_date: meetingDate.toISOString().split("T")[0],
      meeting_time: meetingTime,
      timezone: timezone,
    })
    .select();

  if (error) throw error;
  return data;
}

export async function getBookingsForDate(date: Date, timezone: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select()
    .eq("meeting_date", date.toISOString().split("T")[0])
    .eq("timezone", timezone);

  if (error) throw error;
  return data;
}
