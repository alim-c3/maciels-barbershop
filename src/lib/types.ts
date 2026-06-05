export interface Barber {
  id: string;
  name: string;
  slug: string;
  role: string;
  bio: string;
  specialties: string[];
  photo: string;
  active: boolean;
  sortOrder: number;
  instagramUrl?: string;
  hidden?: boolean;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  durationMinutes: number;
  startingPrice: number;
  active: boolean;
  category: string;
}

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  barberId: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  body: string;
  source?: string;
  sourceUrl?: string;
  barberId?: string;
  serviceId?: string;
  photo?: string;
  approved: boolean;
  publishedAt: string;
}

export interface GalleryImage {
  id: string;
  imageUrl: string;
  altText: string;
  category: "haircut" | "barber" | "interior" | "detail" | "before_after";
  approved: boolean;
  sortOrder: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  featuredImage: string;
  author: string;
  category: string;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingFormData {
  barberId: string;
  serviceId: string;
  date: string;
  startTime: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  reminderOptIn: boolean;
}
