import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Wrench,
  Bell,
  ArrowRight,
  Star,
  Sparkles,
  ShieldCheck,
  MapPinned,
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#07111f] text-white font-sans overflow-hidden">

      
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#07111f]/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              The Civic Horizon
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <a className="hover:text-cyan-400 transition cursor-pointer">
              Services
            </a>

            <a className="hover:text-cyan-400 transition cursor-pointer">
              Infrastructure
            </a>

            <a className="hover:text-cyan-400 transition cursor-pointer">
              Community
            </a>

            <a className="hover:text-cyan-400 transition cursor-pointer">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">

           
            <button
              onClick={() => navigate("/login")}
              className="border border-cyan-400/30 bg-white/5 hover:bg-cyan-400/10 transition px-5 py-2 rounded-full text-cyan-300 font-medium"
            >
              Login
            </button>

            
            <button
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 transition px-5 py-2 rounded-full font-medium shadow-lg shadow-cyan-500/20"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>


      
      <section className="relative min-h-screen flex items-center px-6 md:px-12 pt-28">

        <img
          src="https://images.unsplash.com/photo-1519501025264-65ba15a82390"
          alt="city"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#07111f]/95 via-[#07111f]/80 to-cyan-900/40"></div>

        <div className="absolute top-32 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center w-full">

          <div>

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 px-4 py-2 rounded-full text-sm text-cyan-300 backdrop-blur-md mb-6">
              <Sparkles size={16} />
              Next Generation Smart City Platform
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Transforming Cities
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Through Technology
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-xl">
              Report issues, track complaints, receive emergency alerts,
              and connect with your city using one intelligent platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <button
                onClick={() => navigate("/signup")}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-2xl font-semibold text-black shadow-2xl shadow-cyan-500/30"
              >
                Get Started
              </button>

              <button className="border border-white/20 bg-white/10 backdrop-blur-lg hover:bg-white/20 transition px-8 py-4 rounded-2xl font-medium">
                Explore Services
              </button>

            </div>

            <div className="mt-12 flex flex-wrap gap-8">

              <div>
                <h2 className="text-3xl font-bold text-cyan-400">14K+</h2>
                <p className="text-gray-400 text-sm">Issues Resolved</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-cyan-400">98%</h2>
                <p className="text-gray-400 text-sm">Citizen Satisfaction</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-cyan-400">24/7</h2>
                <p className="text-gray-400 text-sm">Monitoring</p>
              </div>

            </div>

          </div>


          
          <div className="relative">

            <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl shadow-cyan-500/10">

              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-semibold">
                  Live City Dashboard
                </h3>

                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
              </div>

              <div className="space-y-5">

                <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-cyan-400/40 transition">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="bg-cyan-400/20 p-3 rounded-xl">
                        <Activity className="text-cyan-400" />
                      </div>

                      <div>
                        <h4 className="font-medium">
                          Infrastructure Health
                        </h4>

                        <p className="text-sm text-gray-400">
                          System performance
                        </p>
                      </div>

                    </div>

                    <h2 className="text-xl font-bold text-cyan-400">
                      98%
                    </h2>

                  </div>
                </div>


                <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-blue-400/40 transition">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="bg-blue-500/20 p-3 rounded-xl">
                        <Wrench className="text-blue-400" />
                      </div>

                      <div>
                        <h4 className="font-medium">
                          Complaints Processed
                        </h4>

                        <p className="text-sm text-gray-400">
                          Active civic requests
                        </p>
                      </div>

                    </div>

                    <h2 className="text-xl font-bold text-blue-400">
                      14K+
                    </h2>

                  </div>
                </div>


                <div className="bg-white/5 rounded-2xl p-5 border border-white/5 hover:border-purple-400/40 transition">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <div className="bg-purple-500/20 p-3 rounded-xl">
                        <Bell className="text-purple-400" />
                      </div>

                      <div>
                        <h4 className="font-medium">
                          Emergency Alerts
                        </h4>

                        <p className="text-sm text-gray-400">
                          Real-time notifications
                        </p>
                      </div>

                    </div>

                    <h2 className="text-xl font-bold text-purple-400">
                      3 Active
                    </h2>

                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>


      
      <section className="py-28 px-6 md:px-12 bg-[#0b1728]">

        <div className="max-w-7xl mx-auto text-center">

          <div className="inline-block px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm mb-5">
            Smart Civic Features
          </div>

          <h2 className="text-4xl md:text-5xl font-bold">
            Everything Citizens Need
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Modern services that simplify communication between citizens and city authorities.
          </p>


          <div className="grid md:grid-cols-3 gap-8 mt-16">

            {[
              {
                icon: <MapPinned className="text-cyan-400" size={28} />,
                title: "Report City Issues",
                desc: "Raise complaints instantly with smart location tracking.",
              },

              {
                icon: <ShieldCheck className="text-blue-400" size={28} />,
                title: "Secure Services",
                desc: "Book maintenance and civic services safely online.",
              },

              {
                icon: <Bell className="text-purple-400" size={28} />,
                title: "Emergency Alerts",
                desc: "Receive live notifications during emergencies.",
              },

            ].map((item, i) => (

              <div
                key={i}
                className="group bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:-translate-y-3 hover:border-cyan-400/40 transition-all duration-300"
              >

                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-semibold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-cyan-400 font-medium cursor-pointer">
                  Explore <ArrowRight size={18} />
                </div>

              </div>
            ))}

          </div>
        </div>
      </section>


     
      <section className="py-28 px-6 md:px-12 bg-[#07111f] text-center">

        <h2 className="text-4xl font-bold">
          Loved by Citizens
        </h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Thousands of Indian citizens trust Civic Horizon for smart city management.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-7xl mx-auto">

          {[
            "https://randomuser.me/api/portraits/men/75.jpg",
            "https://randomuser.me/api/portraits/women/65.jpg",
            "https://randomuser.me/api/portraits/men/45.jpg",
          ].map((img, i) => (

            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-cyan-400/30 transition"
            >

              <img
                src={img}
                alt="user"
                className="w-20 h-20 rounded-full mx-auto border-4 border-cyan-400/30 object-cover"
              />

              <h3 className="mt-4 text-xl font-semibold">
                {["Arun Kumar", "Priya Sharma", "Rahul Verma"][i]}
              </h3>

              <p className="text-cyan-400 text-sm mt-1">
                Chennai, India
              </p>

              <p className="mt-6 text-gray-300 leading-relaxed">
                “This platform made city complaint management faster and easier than ever before.”
              </p>

              <div className="flex justify-center gap-1 mt-5 text-cyan-400">

                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />
                <Star fill="currentColor" size={18} />

              </div>
            </div>
          ))}

        </div>
      </section>


     
      <section className="relative py-28 px-6 md:px-12 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-3xl"></div>

        <div className="relative max-w-5xl mx-auto bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-white/10 backdrop-blur-2xl rounded-[40px] p-14 text-center shadow-2xl shadow-cyan-500/10">

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Build a Smarter Future
            <span className="block text-cyan-400 mt-2">
              For Your City Today
            </span>
          </h2>

          <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg">
            Join thousands of citizens using modern digital services.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="mt-10 bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 transition-all duration-300 px-10 py-4 rounded-2xl text-black font-bold shadow-xl shadow-cyan-500/30"
          >
            Join Now
          </button>

        </div>
      </section>


      
      <footer className="border-t border-white/10 py-8 text-center text-gray-500 bg-[#07111f]">
        © 2026 The Civic Horizon • Designed with Modern UI
      </footer>

    </div>
  );
}