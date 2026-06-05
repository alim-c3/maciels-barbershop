"use client";

import { useState, useEffect } from "react";
import { Calendar, Users, Scissors, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { BARBERS, SERVICES } from "@/lib/data";
import type { Appointment, AppointmentStatus } from "@/lib/types";

const STATUS_COLORS: Record<AppointmentStatus, string> = {
  pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  confirmed: "text-green-400 bg-green-400/10 border-green-400/30",
  completed: "text-zinc-400 bg-zinc-400/10 border-zinc-400/30",
  cancelled: "text-red-400 bg-red-400/10 border-red-400/30",
  no_show: "text-orange-400 bg-orange-400/10 border-orange-400/30",
};

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterBarber, setFilterBarber] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [activeTab, setActiveTab] = useState<"appointments" | "barbers" | "services">(
    "appointments"
  );

  useEffect(() => {
    // In production this fetches from the API with auth
    // For now, load empty state
    setLoading(false);
  }, []);

  async function updateStatus(id: string, status: AppointmentStatus) {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    // In production: PATCH /api/bookings/:id
  }

  const filtered = appointments.filter((a) => {
    if (filterBarber && a.barberId !== filterBarber) return false;
    if (filterDate && a.date !== filterDate) return false;
    if (filterStatus && a.status !== filterStatus) return false;
    return true;
  });

  const today = new Date().toISOString().split("T")[0];
  const todayCount = appointments.filter((a) => a.date === today).length;
  const pendingCount = appointments.filter((a) => a.status === "pending").length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Today", value: todayCount, icon: Calendar, color: "text-gold" },
          { label: "Pending", value: pendingCount, icon: Clock, color: "text-yellow-400" },
          { label: "Total", value: appointments.length, icon: Scissors, color: "text-blue-400" },
          { label: "Barbers", value: BARBERS.length, icon: Users, color: "text-green-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-barber-gray text-xs uppercase tracking-widest">{label}</span>
              <Icon size={18} className={color} />
            </div>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-zinc-800">
        {(["appointments", "barbers", "services"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-gold text-gold"
                : "border-transparent text-barber-gray hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Appointments tab */}
      {activeTab === "appointments" && (
        <>
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <select
              value={filterBarber}
              onChange={(e) => setFilterBarber(e.target.value)}
              className="input-field text-sm"
            >
              <option value="">All Barbers</option>
              {BARBERS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="input-field text-sm"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input-field text-sm"
            >
              <option value="">All Statuses</option>
              {["pending", "confirmed", "completed", "cancelled", "no_show"].map((s) => (
                <option key={s} value={s}>
                  {s.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="text-center py-16 text-barber-gray">Loading appointments...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 card">
              <Calendar className="mx-auto text-barber-gray mb-3" size={32} />
              <p className="text-barber-gray text-sm">
                {appointments.length === 0
                  ? "No appointments yet. Connect Supabase to see live data."
                  : "No appointments match your filters."}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((apt) => {
                const barber = BARBERS.find((b) => b.id === apt.barberId);
                const service = SERVICES.find((s) => s.id === apt.serviceId);
                return (
                  <div key={apt.id} className="card p-5 flex flex-col sm:flex-row gap-4 justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <p className="text-white font-semibold">{apt.customerName}</p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded border capitalize ${
                            STATUS_COLORS[apt.status]
                          }`}
                        >
                          {apt.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-barber-gray text-sm">
                        {apt.date} · {apt.startTime} – {apt.endTime}
                      </p>
                      <p className="text-barber-gray text-sm">
                        {barber?.name} · {service?.name}
                      </p>
                      {apt.notes && (
                        <p className="text-zinc-500 text-xs mt-1 italic">&ldquo;{apt.notes}&rdquo;</p>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {apt.status === "pending" && (
                        <button
                          onClick={() => updateStatus(apt.id, "confirmed")}
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded border border-green-600 text-green-400 hover:bg-green-400/10 transition-colors"
                        >
                          <CheckCircle size={12} />
                          Confirm
                        </button>
                      )}
                      {apt.status !== "completed" && apt.status !== "cancelled" && (
                        <button
                          onClick={() => updateStatus(apt.id, "completed")}
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded border border-zinc-600 text-zinc-400 hover:bg-zinc-400/10 transition-colors"
                        >
                          Done
                        </button>
                      )}
                      {apt.status !== "cancelled" && apt.status !== "completed" && (
                        <button
                          onClick={() => updateStatus(apt.id, "no_show")}
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded border border-orange-600 text-orange-400 hover:bg-orange-400/10 transition-colors"
                        >
                          <AlertCircle size={12} />
                          No-show
                        </button>
                      )}
                      {apt.status !== "cancelled" && (
                        <button
                          onClick={() => updateStatus(apt.id, "cancelled")}
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded border border-red-600 text-red-400 hover:bg-red-400/10 transition-colors"
                        >
                          <XCircle size={12} />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Barbers tab */}
      {activeTab === "barbers" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BARBERS.map((barber) => (
            <div key={barber.id} className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                  {barber.name[0]}
                </div>
                <div>
                  <p className="text-white font-semibold">{barber.name}</p>
                  <p className="text-barber-gray text-xs">{barber.role}</p>
                </div>
                <span className={`ml-auto text-xs px-2 py-0.5 rounded border ${barber.active ? "border-green-600 text-green-400" : "border-red-600 text-red-400"}`}>
                  {barber.active ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {barber.specialties.map((s) => (
                  <span key={s} className="text-xs bg-barber-charcoal text-zinc-400 px-2 py-0.5 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Services tab */}
      {activeTab === "services" && (
        <div className="space-y-3">
          {SERVICES.map((service) => (
            <div key={service.id} className="card p-5 flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">{service.name}</p>
                <p className="text-barber-gray text-sm">
                  {service.durationMinutes} min · from ${service.startingPrice}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded border ${
                  service.active
                    ? "border-green-600 text-green-400"
                    : "border-red-600 text-red-400"
                }`}
              >
                {service.active ? "Active" : "Inactive"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
