export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          client_name: string;
          client_email: string;
          meeting_purpose: string | null;
          meeting_date: string;
          meeting_time: string;
          timezone: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          client_email: string;
          meeting_purpose?: string | null;
          meeting_date: string;
          meeting_time: string;
          timezone: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_name?: string;
          client_email?: string;
          meeting_purpose?: string | null;
          meeting_date?: string;
          meeting_time?: string;
          timezone?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
