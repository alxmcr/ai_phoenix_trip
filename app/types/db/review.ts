export interface ReviewData {
  review_id: string;
  trip_date: string; // ISO format date
  transport_mode: string;
  company_name: string;
  origin: string;
  destination: string;
  email: string;
  rating: number;
  review_text: string;
  created_at: string; // ISO format timestamp
  updated_at: string; // ISO format timestamp
}
