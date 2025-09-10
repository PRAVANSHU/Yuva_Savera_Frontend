import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, MapPin, Clock, Star, Award, Trophy, Users, HeartHandshake,
  ShieldCheck, Calendar, CheckCircle, Activity, Medal, MessageSquare,
  Video, Bell
} from 'lucide-react';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const token = localStorage.getItem("token");

// UI helpers
const chip = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border bg-white';
const SectionTitle = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-2 mb-4">
    {Icon && <Icon className="w-4 h-4 text-blue-600" />}
    <h3 className="text-sm font-semibold text-gray-700 tracking-wide uppercase">{children}</h3>
  </div>
);
const StatCard = ({ icon: Icon, label, value, sub }) => (
  <Card className="p-4">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
        {Icon && <Icon className="w-5 h-5 text-blue-600" />}
      </div>
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-xl font-bold text-gray-800">{value}</div>
        {sub && <div className="text-xs text-gray-500 mt-0.5">{sub}</div>}
      </div>
    </div>
  </Card>
);
const Badge = ({ icon: Icon, text, tone = 'blue' }) => (
  <div
    className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${tone === 'blue'
        ? 'bg-blue-50 border-blue-200 text-blue-700'
        : tone === 'orange'
          ? 'bg-orange-50 border-orange-200 text-orange-700'
          : 'bg-emerald-50 border-emerald-200 text-emerald-700'
      }`}
  >
    {Icon && <Icon className="w-4 h-4" />}
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export default function VolunteerDashboard() {
  const [profile, setProfile] = useState(null);
  const [points, setPoints] = useState(0);
  const [badge, setBadge] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        // 1) Load profile
        const res1 = await fetch(`${API_BASE}/volunteer/myprofile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        if (res1.ok) {
          const json = await res1.json();
          if (mounted) setProfile(json);
        }

        // 2) Load requests and compute points
        const res2 = await fetch(`${API_BASE}/volunteer/requests`, {
          credentials: 'include',
        });
        if (res2.ok) {
          const reqs = await res2.json();
          if (mounted) {
            setRequests(reqs);

            // calculate total points from urgency
            let total = 0;
            reqs.forEach((r) => {
              if (r.status === 'completed') {
                if (r.urgency === 'critical') total += 100;
                else if (r.urgency === 'hard') total += 75;
                else if (r.urgency === 'medium') total += 50;
                else if (r.urgency === 'easy') total += 25;
              }
            });

            setPoints(total);

            // assign badge
            let b = 'New Volunteer';
            if (total >= 1000) b = 'Platinum Volunteer';
            else if (total >= 600) b = 'Gold Volunteer';
            else if (total >= 300) b = 'Silver Volunteer';
            else if (total >= 100) b = 'Bronze Volunteer';

            setBadge(b);
          }
        }
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-gray-500">Loading dashboard…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-orange-50 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-bold text-gray-800"
              >
                Welcome, <span className="text-blue-700">{profile?.name || 'Volunteer'}</span>
              </motion.h1>
              <p className="text-gray-600 mt-2">
                "Ek Naya Savera, Yuva Ke Saath" — your hub for impact, opportunities, and recognition.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className={`${chip} border-blue-200 text-blue-700`}>
                  <MapPin className="w-3.5 h-3.5 mr-1" /> {profile?.location || 'India'}
                </span>
                <span className={`${chip} border-orange-200 text-orange-700`}>
                  <Clock className="w-3.5 h-3.5 mr-1" /> {profile?.availability || 'Not set'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Bell className="w-4 h-4" /> Notifications
              </Button>
              <Button variant="primary" className="flex items-center gap-2" onClick={() => navigate("/browse-requests")}>
                <Video className="w-4 h-4" /> Browse Help Requests
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatCard icon={Trophy} label="Points" value={points} />
          <StatCard
            icon={CheckCircle}
            label="Requests Completed"
            value={requests.filter((r) => r.status === 'completed').length}
          />
          <StatCard icon={Award} label="Current Badge" value={badge} />
        </div>

        {/* Profile */}
        <Card className="p-6 mb-6">
          <SectionTitle icon={User}>Your Profile</SectionTitle>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-xs text-gray-500">Name</div>
              <div className="font-semibold text-gray-800">{profile?.name}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Email</div>
              <div className="text-gray-700">{profile?.email}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Phone</div>
              <div className="text-gray-700">{profile?.phone}</div>
            </div>
          </div>
        </Card>

        {/* Requests */}
        <Card className="p-6">
          <SectionTitle icon={Star}>Completed Requests</SectionTitle>
          {requests.filter((r) => r.status === 'completed').length === 0 ? (
            <div className="text-sm text-gray-500">No requests completed yet.</div>
          ) : (
            <ul className="space-y-3">
              {requests
                .filter((r) => r.status === 'completed')
                .map((r) => (
                  <li key={r.id} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-800">{r.title}</div>
                      <div className="text-xs text-gray-500">Urgency: {r.urgency}</div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}



