import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Wrench,
  Bell,
  Megaphone,
  ArrowRight,
  Users,
  Star
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-12 py-5 bg-white shadow-sm">
        <h1 className="text-lg font-semibold text-blue-900">The Civic Horizon</h1>

        <div className="hidden md:flex gap-8 text-sm text-gray-600">
          <a>Services</a>
          <a>Infrastructure</a>
          <a>Community</a>
          <a>Contact</a>
        </div>

        <div className="flex gap-4 items-center">
          <button onClick={() => navigate("/login")}>Login</button>

          <button
            className="bg-blue-900 text-white px-4 py-2 rounded-md"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[700px] flex items-center px-12">
        <img
          src="https://images.unsplash.com/photo-1494526585095-c41746248156"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
          alt="city"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/40" />

        <div className="relative z-10 grid md:grid-cols-2 gap-10 w-full">
          <div className="text-white max-w-xl">
            <h1 className="text-5xl font-bold">
              Smart City Management Platform
            </h1>

            <p className="mt-4 text-gray-200">
              Report issues, book services, and stay updated with your city.
            </p>

            <div className="mt-6 flex gap-4">
              <button
                className="bg-teal-400 px-6 py-3 rounded-md"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </button>
              <button className="border px-6 py-3 rounded-md">
                Explore
              </button>
            </div>
          </div>

          {/* LIVE DASHBOARD CARD */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl text-white max-w-sm ml-auto">
            <h3 className="mb-4">Live Dashboard</h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <Activity size={16}/> Infrastructure
                </span>
                <span>98%</span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <Wrench size={16}/> Complaints
                </span>
                <span>14k+</span>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <Bell size={16}/> Alerts
                </span>
                <span>3 Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 text-center bg-gray-100">
        <h2 className="text-3xl font-bold">Our Services</h2>

        <div className="grid md:grid-cols-3 gap-8 px-12 mt-10">
          {[
            {
              img: "https://images.unsplash.com/photo-1581091215367-59ab6b1b6c3b",
              title: "Report Issues",
              desc: "Raise complaints like potholes instantly",
            },
            {
              img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
              title: "Book Services",
              desc: "Schedule maintenance easily",
            },
            {
              img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
              title: "City Alerts",
              desc: "Stay updated with emergencies",
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow overflow-hidden">

              <img src={item.img} className="h-40 w-full object-cover" alt="service"/>

              <div className="p-5 text-left">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>

                <div className="flex items-center mt-3 text-blue-900">
                  Explore <ArrowRight size={16} className="ml-1" />
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-12 grid md:grid-cols-2 gap-16 items-center">

        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
          className="rounded-xl shadow-lg"
          alt="process"
        />

        <div>
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>

          {[
            "Register using Aadhaar",
            "Choose a civic service",
            "Track progress in real-time",
          ].map((step, i) => (
            <div key={i} className="flex gap-4 mb-6">
              <div className="bg-blue-900 text-white w-10 h-10 flex items-center justify-center rounded">
                {i + 1}
              </div>
              <p className="text-gray-600">{step}</p>
            </div>
          ))}
        </div>

      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="py-20 px-12 bg-gray-100 grid md:grid-cols-2 gap-10 items-center">

        <div>
          <h2 className="text-3xl font-bold mb-4">
            Real-Time City Dashboard
          </h2>
          <p className="text-gray-600">
            Monitor complaints, infrastructure health, and alerts in one place.
          </p>

          <button className="mt-6 bg-blue-900 text-white px-6 py-3 rounded-md">
            View Dashboard
          </button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
          className="rounded-xl shadow-lg"
          alt="dashboard"
        />

      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold">What Citizens Say</h2>

        <div className="grid md:grid-cols-3 gap-8 px-12 mt-10">
          {[
            "https://randomuser.me/api/portraits/women/44.jpg",
            "https://randomuser.me/api/portraits/men/32.jpg",
            "https://randomuser.me/api/portraits/women/68.jpg",
          ].map((img, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow text-center">

              <img
                src={img}
                className="w-16 h-16 rounded-full mx-auto mb-3"
                alt="user"
              />

              <p className="text-sm text-gray-600">
                "This platform made reporting issues super easy!"
              </p>

              <div className="flex justify-center mt-3">
                <Star /><Star /><Star /><Star /><Star />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 text-center text-white">

        <img
          src="https://images.unsplash.com/photo-1508057198894-247b23fe5ade"
          className="absolute inset-0 w-full h-full object-cover"
          alt="cta"
        />

        <div className="absolute inset-0 bg-blue-900/80"></div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold">Join Smart City Today</h2>

          <button
            onClick={() => navigate("/signup")}
            className="mt-6 bg-teal-400 px-6 py-3 rounded-md text-black"
          >
            Get Started
          </button>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 py-10 text-center">
        <p>© 2024 The Civic Horizon</p>
      </footer>

    </div>
  );
}