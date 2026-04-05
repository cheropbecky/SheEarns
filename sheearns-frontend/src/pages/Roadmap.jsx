import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Milestone,
  CheckCircle2,
  Clock3,
  Clipboard,
  ClipboardCheck,
  Lightbulb,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    title: "Week 1: Set Your Foundation",
    summary: "Define your offer, audience, and starter pricing.",
    details: [
      "Pick one core service and one starter package.",
      "Create a simple portfolio with 3 examples.",
      "Set a minimum profitable rate using the calculator.",
    ],
  },
  {
    title: "Week 2: Launch & Get First Clients",
    summary: "Promote in your circles and local communities.",
    details: [
      "Post your service in WhatsApp and neighborhood groups.",
      "Offer a limited launch discount for first 5 clients.",
      "Collect before/after photos and testimonials.",
    ],
  },
  {
    title: "Week 3: Improve Delivery",
    summary: "Tighten your customer process and repeatability.",
    details: [
      "Use a booking checklist to avoid missed details.",
      "Set clear turnaround timelines and communication windows.",
      "Track your most profitable service types.",
    ],
  },
  {
    title: "Week 4: Scale Smart",
    summary: "Increase prices gradually and streamline operations.",
    details: [
      "Raise rates for high-demand slots.",
      "Create referral rewards for happy clients.",
      "Start documenting SOPs for future support or hiring.",
    ],
  },
];

const templates = [
  {
    title: "Client Follow-up Message",
    text: "Hi [Name], thank you for booking with me today. I'd love your feedback. If you loved the service, please share with a friend and get 10% off your next booking.",
  },
  {
    title: "Payment Reminder",
    text: "Hi [Name], this is a gentle reminder for your pending balance of Ksh [Amount]. You can send via [Method]. Thank you for your support.",
  },
  {
    title: "Weekly Planning Prompt",
    text: "This week I will focus on: 1) [top service], 2) [marketing action], 3) [client retention action]. My target revenue is Ksh [goal].",
  },
];

export default function Roadmap() {
  const [expanded, setExpanded] = useState(0);
  const [copied, setCopied] = useState("");

  async function copyText(title, text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(title);
      setTimeout(() => setCopied(""), 1800);
    } catch {
      setCopied("Copy failed");
      setTimeout(() => setCopied(""), 1800);
    }
  }

  return (
    <div className="min-h-screen bg-[#fdf9f3] font-['Inter',sans-serif]">
      <Navbar active="Roadmap" isLoggedIn={false} />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-[1160px] mx-auto flex flex-col gap-10">
          <section data-aos="fade-down" className="bg-gradient-to-r from-[#500088] to-[#8f3dbf] text-white rounded-3xl p-10">
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-4xl lg:text-6xl inline-flex items-center gap-3">
              <Milestone size={44} strokeWidth={1.5} /> 30-Day Hustle Roadmap
            </h1>
            <p className="text-[#f2defe] mt-4 max-w-[680px] text-lg">
              Move from uncertainty to consistent income with a simple week-by-week action plan tailored for women building from scratch.
            </p>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {steps.map((step, i) => {
                const isOpen = expanded === i;
                return (
                  <article key={step.title} data-aos="fade-up" data-aos-delay={i * 100} className="bg-white rounded-2xl shadow-sm p-6 border border-transparent hover:border-[rgba(80,0,136,0.2)] transition-all duration-300">
                    <button onClick={() => setExpanded(isOpen ? -1 : i)} className="w-full text-left flex items-start justify-between gap-4">
                      <div>
                        <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#1c1c18] text-xl">{step.title}</h2>
                        <p className="text-[#4c4452] mt-1">{step.summary}</p>
                      </div>
                      {isOpen ? <CheckCircle2 className="text-[#500088]" /> : <Clock3 className="text-[#4c4452]" />}
                    </button>
                    {isOpen && (
                      <ul className="mt-4 space-y-2">
                        {step.details.map((detail) => (
                          <li key={detail} className="text-sm text-[#4c4452] bg-[#f7f3ed] rounded-xl px-3 py-2">
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                );
              })}
            </div>

            <aside data-aos="fade-left" className="bg-white rounded-2xl shadow-sm p-6 h-fit">
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#500088] text-xl inline-flex items-center gap-2">
                <Lightbulb size={20} strokeWidth={1.5} /> Tips
              </h3>
              <div className="mt-4 space-y-3 text-sm text-[#4c4452]">
                <p>Keep one weekly revenue target and track progress every Sunday.</p>
                <p>Ask each client for one referral after successful delivery.</p>
                <p>Use simple systems before you use complex tools.</p>
              </div>
              <a href="/aicoach" className="mt-6 no-underline bg-[#500088] text-white font-bold rounded-xl px-4 py-3 inline-flex items-center gap-2 hover:opacity-90 transition-all duration-200 active:scale-95">
                Ask AI Coach <ArrowRight size={16} strokeWidth={1.5} />
              </a>
            </aside>
          </section>

          <section>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-3xl text-[#500088] mb-5 inline-flex items-center gap-2">
              <MessageSquare size={28} strokeWidth={1.5} /> Ready-to-use Templates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {templates.map((tpl, i) => {
                const isCopied = copied === tpl.title;
                return (
                  <article key={tpl.title} data-aos="fade-up" data-aos-delay={i * 100} className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <h3 className="font-semibold text-[#1c1c18]">{tpl.title}</h3>
                    <p className="text-sm text-[#4c4452] leading-relaxed">{tpl.text}</p>
                    <button onClick={() => copyText(tpl.title, tpl.text)} className="self-start bg-[#f7f3ed] text-[#1c1c18] font-semibold rounded-xl px-4 py-2 inline-flex items-center gap-2 hover:bg-[#ede5dc] transition-colors">
                      {isCopied ? <ClipboardCheck size={16} strokeWidth={1.5} className="text-[#500088]" /> : <Clipboard size={16} strokeWidth={1.5} />}
                      {isCopied ? "Copied" : "Copy"}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
