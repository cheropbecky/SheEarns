import { useState } from "react";
import {
  Scissors,
  CookingPot,
  Palette,
  BookOpen,
  Shirt,
  Camera,
  PenTool,
  Laptop,
  Dumbbell,
  Sparkles,
  Target,
  ArrowRight,
  Medal,
  CheckCircle2,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const skills = [
  { label: "Hair & Beauty", Icon: Scissors },
  { label: "Cooking & Baking", Icon: CookingPot },
  { label: "Art & Design", Icon: Palette },
  { label: "Teaching & Tutoring", Icon: BookOpen },
  { label: "Fashion & Sewing", Icon: Shirt },
  { label: "Photography", Icon: Camera },
  { label: "Writing", Icon: PenTool },
  { label: "Technology", Icon: Laptop },
  { label: "Fitness & Wellness", Icon: Dumbbell },
  { label: "Nail & Makeup Art", Icon: Sparkles },
];

const hustleResults = [
  { rank: "Top 1", badge: "Top Pick", title: "Nail Art Technician", earn: "Ksh 800 - 3,500 per client", difficulty: "Beginner", gold: true },
  { rank: "Top 2", title: "Hair Braiding Specialist", earn: "Ksh 1,000 - 5,000 per session", difficulty: "Beginner", gold: false },
  { rank: "Top 3", title: "Instagram Content Creator", earn: "Ksh 5,000 - 30,000/month", difficulty: "Intermediate", gold: false },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const toggleSkill = (label) => {
    setSelectedSkills((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  return (
    <div className="min-h-screen bg-[#fdf9f3] font-['Inter',sans-serif] flex flex-col">
      <Navbar active="How It Works" />

      <main className="flex-1 flex items-center justify-center px-4 py-12 pt-28">
        {step === 1 && (
          <div className="flex flex-col items-center gap-8 max-w-md text-center" data-aos="fade-up">
            <div className="w-40 h-40 rounded-full bg-white border border-[rgba(133,83,0,0.1)] flex items-center justify-center shadow-xl">
              <Medal size={62} strokeWidth={1.4} className="text-[#500088]" />
            </div>
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[#500088] text-5xl">
              Welcome to SheEarns
            </h1>
            <p className="text-[#4c4452] text-xl">Find your best hustle path in two minutes.</p>
            <button
              onClick={() => setStep(2)}
              className="w-full inline-flex items-center justify-center gap-3 text-white font-bold text-lg px-8 py-5 rounded-2xl shadow-lg hover:opacity-90 transition-opacity bg-[#500088]"
            >
              Start <ArrowRight size={18} strokeWidth={1.8} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="w-full max-w-2xl flex flex-col gap-8" data-aos="fade-up">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[#500088] text-sm font-bold uppercase tracking-widest">Step 1 of 2</span>
                <span className="text-[#4c4452] text-xs">50% Complete</span>
              </div>
              <div className="h-2 bg-[#e6e2dc] rounded-full">
                <div className="h-2 bg-[#500088] rounded-full w-1/2 transition-all" />
              </div>
            </div>

            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#500088] text-3xl">
              What are you naturally good at?
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skills.map((s) => (
                <button
                  key={s.label}
                  onClick={() => toggleSkill(s.label)}
                  className={`flex flex-col items-center gap-2 py-6 rounded-2xl border-2 transition-all text-sm font-bold ${
                    selectedSkills.includes(s.label)
                      ? "border-[#500088] bg-white shadow-md"
                      : "border-transparent bg-white shadow-sm hover:border-[rgba(80,0,136,0.2)]"
                  }`}
                >
                  <s.Icon size={24} strokeWidth={1.7} className="text-[#500088]" />
                  <span className="text-[#1c1c18] text-center text-xs leading-tight">{s.label}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 py-4 bg-[#e6e2dc] text-[#1c1c18] font-bold rounded-2xl">Back</button>
              <button onClick={() => setStep(3)} className="flex-1 py-4 text-white font-bold rounded-2xl shadow-md hover:opacity-90 bg-[#500088] inline-flex items-center justify-center gap-2">
                See Results <ArrowRight size={16} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="w-full max-w-2xl flex flex-col gap-8" data-aos="fade-up">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-[#ffddb8] inline-flex items-center gap-2 px-6 py-2 rounded-full">
                <Target size={16} strokeWidth={1.8} className="text-[#2a1700]" />
                <span className="text-[#2a1700] text-xs font-bold uppercase tracking-widest">Perfect Matches Found</span>
              </div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[#500088] text-4xl text-center">
                Your Top Hustle Ideas
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {hustleResults.map((h) => (
                <div
                  key={h.title}
                  className={`rounded-3xl ${
                    h.gold
                      ? "bg-white border border-[rgba(133,83,0,0.1)] shadow-[0_0_0_4px_rgba(133,83,0,0.08)] p-8"
                      : "bg-[#f7f3ed] border-l-8 border-[#500088] pl-8 pr-6 py-6"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-[#f1ede7] w-14 h-14 rounded-2xl flex items-center justify-center shrink-0">
                      <Medal size={24} strokeWidth={1.8} className="text-[#500088]" />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#4c4452]">{h.rank}</span>
                        {h.badge && <span className="text-[#855300] text-xs font-extrabold uppercase tracking-widest">{h.badge}</span>}
                      </div>
                      <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[#1c1c18] text-2xl">{h.title}</h3>
                      <p className="text-[#4c4452] text-base">{h.earn}</p>
                      <p className="inline-flex items-center gap-1 text-sm text-[#500088]">
                        <CheckCircle2 size={15} strokeWidth={1.8} /> {h.difficulty}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-3">
              <a
                href="/roadmap"
                className="w-full py-6 text-white font-extrabold text-xl rounded-3xl shadow-2xl hover:opacity-90 transition-opacity bg-[#500088] no-underline text-center inline-flex items-center justify-center gap-2"
              >
                Build My Plan <ArrowRight size={20} strokeWidth={2} />
              </a>
              <p className="text-[#4c4452] text-sm">Join other women building income this week.</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
