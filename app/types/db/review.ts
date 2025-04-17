export interface ReviewData {
  review_id: string;
  rating: number;
  start_date: Date; // ISO format date
  end_date: Date; // ISO format date
  created_at: string; // ISO format timestamp
  updated_at: string; // ISO format timestamp
  destination: string;
  company_name: string;
  origin: string;
  email: string;
  age_group: string;
  trip_type: string;
  description: string;
  transport_mode: string;
}
