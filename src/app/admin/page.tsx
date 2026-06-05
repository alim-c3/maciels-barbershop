import type { Metadata } from "next";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="pt-20 min-h-screen bg-barber-black">
      <div className="bg-barber-dark border-b border-zinc-800 py-6 px-6">
        <h1 className="text-gold font-display text-2xl">Maciel&apos;s — Admin Dashboard</h1>
        <p className="text-barber-gray text-sm mt-1">Manage appointments, barbers, and shop content</p>
      </div>
      <AdminDashboard />
    </div>
  );
}
