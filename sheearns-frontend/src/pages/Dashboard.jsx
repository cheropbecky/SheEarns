import { useState } from "react";
import {
  Award,
  ClipboardList,
  Star,
  MessageCircle,
  Flame,
  Wallet,
  ArrowRight,
  Lock,
  CheckCircle2,
  Bot,
  FilePenLine,
  Share2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const milestones = [
  { label: "First Client Landed", sub: "Earned: Ksh 1,200", unlocked: true },
  { label: "Ksh 5,000 Earned", sub: "Milestone reached", unlocked: true },
  { label: "First 5-Star Review", sub: "Keep hustling", unlocked: false },
  { label: "Ksh 10,000 Month", sub: "You are close", unlocked: false },
  { label: "10 Clients Served", sub: "4 more to go", unlocked: false },
];

const activities = [
  { icon: ClipboardList, title: "New Booking: Knotless Braids", sub: "From Mercy Njeri - 2 hours ago", amount: "+Ksh 2,500" },
  { icon: Star, title: "New 5-Star Review", sub: '"Zawadi is a professional. Highly recommend!"', amount: null },
  { icon: MessageCircle, title: "Message from Maya", sub: '"Are you available for a quick consult?"', amount: null, unread: true },
];

export default function Dashboard() {
  const [logged, setLogged] = useState("");
  const [incomeLog, setIncomeLog] = useState([]);
  const goal = 10000;
  const earned = 6500 + incomeLog.reduce((a, b) => a + b, 0);
  const progress = Math.min((earned / goal) * 100, 100);

  return (
    <div className="min-h-screen bg-[#fdf9f3] font-['Inter',sans-serif]">
      <Navbar active="Dashboard" isLoggedIn />

      <main className="pt-28 pb-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4" data-aos="fade-down">
            <div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[#500088] text-4xl">Good morning</h1>
              <p className="text-[#4c4452] text-lg mt-1">You are making strong progress this week.</p>
            </div>
            <div className="bg-white border border-[rgba(207,194,212,0.3)] rounded-2xl flex items-center gap-3 px-5 py-3 shadow-sm">
              <div className="bg-[#fea619] w-10 h-10 rounded-xl flex items-center justify-center">
                <Flame size={18} strokeWidth={1.8} className="text-[#684000]" />
              </div>
              <div>
                <p className="text-[#4c4452] text-xs font-medium">Current Streak</p>
                <p className="text-[#500088] font-bold text-base">5-day streak</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-white rounded-3xl p-8 shadow-sm relative overflow-hidden" data-aos="fade-up">
                <Wallet className="absolute top-5 right-5 text-[rgba(80,0,136,0.08)]" size={80} strokeWidth={1.2} />
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#1c1c18] text-2xl">Income Tracker</h2>
                    <p className="text-[#4c4452] text-sm mt-1">April Goal: Ksh {goal.toLocaleString()}</p>
                  </div>
                  <span className="bg-[rgba(80,0,136,0.08)] text-[#500088] text-xs font-bold px-3 py-1.5 rounded-full">This Month</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#f7f3ed] rounded-2xl p-4">
                    <p className="text-[#4c4452] text-xs font-medium mb-1">Earned So Far</p>
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#500088] text-3xl">Ksh {earned.toLocaleString()}</p>
                  </div>
                  <div className="bg-[#f7f3ed] rounded-2xl p-4">
                    <p className="text-[#4c4452] text-xs font-medium mb-1">Remaining</p>
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#1c1c18] text-3xl">Ksh {Math.max(goal - earned, 0).toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#4c4452] font-medium">{Math.round(progress)}% complete</span>
                    <span className="text-[#500088] font-bold">Goal: Ksh {goal.toLocaleString()}</span>
                  </div>
                  <div className="h-4 bg-[#e6e2dc] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #500088, #fea619)" }} />
                  </div>
                  <p className="text-[#4c4452] text-xs text-center">You are {Math.round(progress)}% of the way to your goal.</p>
                </div>

                <div className="mt-6 flex gap-3">
                  <input
                    type="number"
                    placeholder="Log new income (Ksh)"
                    value={logged}
                    onChange={(e) => setLogged(e.target.value)}
                    className="flex-1 bg-[#f7f3ed] text-[#1c1c18] text-sm px-4 py-3 rounded-xl border-none outline-none"
                  />
                  <button
                    onClick={() => {
                      if (logged) {
                        setIncomeLog((p) => [...p, Number(logged)]);
                        setLogged("");
                      }
                    }}
                    className="bg-[#500088] text-white font-bold text-sm px-5 py-3 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    + Log
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm" data-aos="fade-up" data-aos-delay="80">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#1c1c18] text-2xl">Recent Activity</h2>
                  <button className="text-[#500088] text-sm font-bold hover:underline">View All</button>
                </div>

                <div className="flex flex-col divide-y divide-[rgba(207,194,212,0.2)]">
                  {activities.map((a, i) => (
                    <div key={i} className="flex items-center gap-4 py-4">
                      <div className="bg-[#f1ede7] w-12 h-12 rounded-2xl flex items-center justify-center shrink-0">
                        <a.icon size={18} strokeWidth={1.8} className="text-[#500088]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[#1c1c18] font-bold text-sm truncate">{a.title}</p>
                          {a.unread && <div className="w-2 h-2 bg-[#500088] rounded-full shrink-0" />}
                        </div>
                        <p className="text-[#4c4452] text-xs truncate">{a.sub}</p>
                      </div>
                      {a.amount ? (
                        <span className="text-green-600 font-bold text-sm shrink-0">{a.amount}</span>
                      ) : (
                        <ArrowRight size={16} strokeWidth={1.8} className="text-[#500088] shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm" data-aos="fade-up">
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#1c1c18] text-xl mb-5">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Bot, label: "Chat with AI Coach" },
                    { icon: FilePenLine, label: "Update My Services" },
                    { icon: Wallet, label: "Log Income" },
                    { icon: Share2, label: "Share Profile" },
                  ].map((action) => (
                    <button key={action.label} className="bg-[#f7f3ed] flex flex-col items-center gap-2 py-5 px-3 rounded-2xl hover:bg-[rgba(80,0,136,0.06)] transition-colors shadow-sm">
                      <action.icon size={20} strokeWidth={1.8} className="text-[#500088]" />
                      <span className="text-[#1c1c18] text-xs font-bold text-center leading-tight">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm" data-aos="fade-up" data-aos-delay="80">
                <div className="flex items-center gap-2 mb-5">
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#1c1c18] text-xl">Milestones</h2>
                  <span className="bg-[rgba(254,166,25,0.15)] text-[#855300] text-xs font-bold px-2 py-0.5 rounded-full">2/5</span>
                </div>

                <div className="flex flex-col gap-4">
                  {milestones.map((m, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${m.unlocked ? "bg-[rgba(254,166,25,0.15)] shadow-sm" : "bg-[#f7f3ed] opacity-40"}`}>
                        <Award size={18} strokeWidth={1.8} className="text-[#500088]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {m.unlocked ? (
                          <>
                            <p className="text-[#1c1c18] font-bold text-sm">{m.label}</p>
                            <p className="text-[#4c4452] text-xs">{m.sub}</p>
                          </>
                        ) : (
                          <>
                            <div className="h-4 bg-[#e6e2dc] rounded-full w-3/4 mb-1" />
                            <p className="text-[#4c4452] text-xs">{m.sub}</p>
                          </>
                        )}
                      </div>
                      {m.unlocked ? (
                        <CheckCircle2 size={17} strokeWidth={2} className="text-green-500" />
                      ) : (
                        <Lock size={16} strokeWidth={2} className="text-[#cfc2d4]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
