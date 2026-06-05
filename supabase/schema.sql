-- Maciel's Barber Shop — Supabase Schema
-- Run this in your Supabase SQL editor to initialize the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- APPOINTMENTS
-- =============================================
CREATE TABLE appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  barber_id TEXT NOT NULL,
  service_id TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  notes TEXT,
  reminder_opt_in BOOLEAN DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prevent double-booking the same barber at the same time on the same date
CREATE UNIQUE INDEX appointments_no_double_booking
  ON appointments (barber_id, date, start_time)
  WHERE status IN ('pending', 'confirmed');

CREATE INDEX appointments_barber_date ON appointments (barber_id, date);
CREATE INDEX appointments_status ON appointments (status);
CREATE INDEX appointments_date ON appointments (date);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- REVIEWS
-- =============================================
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  body TEXT NOT NULL,
  source TEXT,
  source_url TEXT,
  barber_id TEXT,
  service_id TEXT,
  photo TEXT,
  approved BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX reviews_approved ON reviews (approved, published_at DESC);

-- =============================================
-- GALLERY IMAGES
-- =============================================
CREATE TABLE gallery_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('haircut', 'barber', 'interior', 'detail', 'before_after')),
  approved BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  customer_name TEXT,
  barber_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX gallery_approved ON gallery_images (approved, sort_order);

-- =============================================
-- CONTACT FORM SUBMISSIONS
-- =============================================
CREATE TABLE contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- BLOCKED TIME SLOTS (admin)
-- =============================================
CREATE TABLE blocked_slots (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  barber_id TEXT,
  date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX blocked_slots_barber_date ON blocked_slots (barber_id, date);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Appointments: anyone can insert, only service role can select/update
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow insert appointments"
  ON appointments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "allow service role full access appointments"
  ON appointments FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- Reviews: only service role manages; public reads approved ones
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read approved reviews"
  ON reviews FOR SELECT
  TO anon, authenticated
  USING (approved = true);

CREATE POLICY "service role manages reviews"
  ON reviews FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- Gallery: public reads approved
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read approved gallery"
  ON gallery_images FOR SELECT
  TO anon, authenticated
  USING (approved = true);

CREATE POLICY "service role manages gallery"
  ON gallery_images FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- Contact: insert only for public
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "allow insert contact"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "service role reads contact"
  ON contact_submissions FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

-- Blocked slots: service role only
ALTER TABLE blocked_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service role manages blocked slots"
  ON blocked_slots FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "public reads blocked slots"
  ON blocked_slots FOR SELECT
  TO anon, authenticated
  USING (true);

-- =============================================
-- STORAGE BUCKET for gallery photos
-- =============================================
-- Run in Supabase dashboard: Storage > New Bucket
-- Name: gallery
-- Public: true
-- Allowed MIME types: image/jpeg, image/png, image/webp
