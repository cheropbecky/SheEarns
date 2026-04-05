import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Calculator,
  MapPin,
  Wrench,
  PlusCircle,
  Target,
  TrendingUp,
  Route,
  ArrowRight,
} from "lucide-react";

const serviceOptions = [
  "Accounting & Bookkeeping",
  "Baby Sitting",
  "Baking",
  "Barbering",
  "Beauty & Makeup",
  "Braid Styling",
  "Cake Decorating",
  "Car Wash",
  "Cleaning Service",
  "Content Writing",
  "Crochet",
  "Data Entry",
  "Digital Marketing",
  "Event Planning",
  "Fashion Design",
  "Gardening",
  "Graphic Design",
  "Hair Styling",
  "Henna Art",
  "Laundry Service",
  "Massage Therapy",
  "Meal Prep",
  "Mobile Nail Tech",
  "Photography",
  "Phone Repair",
  "Resin Art",
  "Sewing & Alterations",
  "Shoemaking",
  "Social Media Management",
  "Tailoring",
  "Tutoring",
  "Web Design",
  "Other (specify)",
];

const kenyanTowns = [
  "Bungoma",
  "Diani",
  "Eldoret",
  "Embu",
  "Garissa",
  "Homa Bay",
  "Isiolo",
  "Kakamega",
  "Karatina",
  "Kericho",
  "Kilifi",
  "Kisii",
  "Kisumu",
  "Kitale",
  "Kitui",
  "Kwale",
  "Lamu",
  "Machakos",
  "Malindi",
  "Meru",
  "Mombasa",
  "Murang'a",
  "Naivasha",
  "Nairobi",
  "Nakuru",
  "Nanyuki",
  "Narok",
  "Nyeri",
  "Ruiru",
  "Thika",
  "Voi",
  "Wajir",
  "Other",
];

function currency(value) {
  return `Ksh ${Math.round(value).toLocaleString()}`;
}

export default function PricingCalculator() {
  const [service, setService] = useState(serviceOptions[0]);
  const [customService, setCustomService] = useState("");
  const [location, setLocation] = useState("Nairobi");
  const [hours, setHours] = useState(2);
  const [experience, setExperience] = useState(2);
  const [urgency, setUrgency] = useState("Standard");

  const pricing = useMemo(() => {
    const serviceMultiplier = service === "Other (specify)" ? 1.05 : 1;
    const locationMultiplier = ["Nairobi", "Mombasa", "Nakuru"].includes(location) ? 1.12 : 0.95;
    const urgencyMultiplier = urgency === "Same Day" ? 1.3 : urgency === "Next Day" ? 1.15 : 1;
    const experienceMultiplier = 0.8 + experience * 0.15;
    const base = 650;

    const estimate = base * hours * serviceMultiplier * locationMultiplier * urgencyMultiplier * experienceMultiplier;
    const low = estimate * 0.85;
    const high = estimate * 1.15;

    return { estimate, low, high };
  }, [service, location, hours, experience, urgency]);

  return (
    <div className="min-h-screen bg-[#fdf9f3] font-['Inter',sans-serif]">
      <Navbar active="Pricing" isLoggedIn={false} />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section data-aos="fade-up" className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm">
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-4xl text-[#500088] inline-flex items-center gap-3">
              <Calculator size={38} strokeWidth={1.5} /> Pricing Calculator
            </h1>
            <p className="text-[#4c4452] mt-3 max-w-[680px]">
              Estimate fair pricing for your hustle based on service type, location, session hours, and urgency.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-[#1c1c18] inline-flex items-center gap-2">
                  <Wrench size={16} strokeWidth={1.5} /> Service
                </span>
                <select value={service} onChange={(e) => setService(e.target.value)} className="bg-[#f8f8f8] border border-[#e6e2dc] rounded-xl px-4 py-3 outline-none focus:border-[#500088]">
                  {serviceOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-[#1c1c18] inline-flex items-center gap-2">
                  <MapPin size={16} strokeWidth={1.5} /> Location
                </span>
                <select value={location} onChange={(e) => setLocation(e.target.value)} className="bg-[#f8f8f8] border border-[#e6e2dc] rounded-xl px-4 py-3 outline-none focus:border-[#500088]">
                  {kenyanTowns.map((town) => (
                    <option key={town}>{town}</option>
                  ))}
                </select>
              </label>
            </div>

            {service === "Other (specify)" && (
              <label data-aos="fade-up" className="mt-6 flex flex-col gap-2">
                <span className="text-sm font-bold text-[#1c1c18] inline-flex items-center gap-2">
                  <PlusCircle size={16} strokeWidth={1.5} /> Custom service
                </span>
                <input
                  value={customService}
                  onChange={(e) => setCustomService(e.target.value)}
                  placeholder="Describe your custom hustle"
                  className="bg-[#f8f8f8] border border-[#e6e2dc] rounded-xl px-4 py-3 outline-none focus:border-[#500088]"
                />
              </label>
            )}

            <div className="mt-8 grid sm:grid-cols-3 gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-[#1c1c18]">Hours ({hours})</span>
                <input type="range" min="1" max="12" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="accent-[#500088]" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-[#1c1c18]">Experience ({experience} yrs)</span>
                <input type="range" min="1" max="8" value={experience} onChange={(e) => setExperience(Number(e.target.value))} className="accent-[#500088]" />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold text-[#1c1c18] inline-flex items-center gap-2">
                  <Route size={16} strokeWidth={1.5} /> Urgency
                </span>
                <select value={urgency} onChange={(e) => setUrgency(e.target.value)} className="bg-[#f8f8f8] border border-[#e6e2dc] rounded-xl px-4 py-3 outline-none focus:border-[#500088]">
                  <option>Standard</option>
                  <option>Next Day</option>
                  <option>Same Day</option>
                </select>
              </label>
            </div>

            <p className="mt-8 text-sm text-[#4c4452] bg-[#f7f3ed] rounded-xl p-4">
              Note: These estimates are guidance only. Final prices vary by exact location, materials, and delivery needs. Add a little buffer for transport and supplies.
            </p>
          </section>

          <aside data-aos="fade-left" className="bg-white rounded-3xl p-8 shadow-sm flex flex-col gap-6">
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-2xl text-[#500088] inline-flex items-center gap-2">
              <Target size={24} strokeWidth={1.5} /> Your Estimate
            </h2>

            <div className="bg-[#f7f3ed] rounded-2xl p-5">
              <p className="text-xs uppercase tracking-widest text-[#4c4452] font-bold">Recommended Price</p>
              <p className="text-4xl font-extrabold text-[#500088] mt-2">{currency(pricing.estimate)}</p>
              <p className="text-[#4c4452] mt-2 text-sm">Range: {currency(pricing.low)} - {currency(pricing.high)}</p>
            </div>

            <div className="space-y-3 text-sm text-[#4c4452]">
              <p className="inline-flex items-center gap-2"><TrendingUp size={16} strokeWidth={1.5} className="text-[#500088]" /> Better reviews let you charge more over time.</p>
              <p className="inline-flex items-center gap-2"><MapPin size={16} strokeWidth={1.5} className="text-[#500088]" /> Consider transport costs for farther clients.</p>
              <p className="inline-flex items-center gap-2"><Wrench size={16} strokeWidth={1.5} className="text-[#500088]" /> Bundle services to increase your average order value.</p>
            </div>

            <a href="/roadmap" className="no-underline bg-[#500088] text-white font-bold px-5 py-4 rounded-2xl inline-flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-200 active:scale-95">
              Build My Hustle Roadmap <ArrowRight size={16} strokeWidth={1.5} />
            </a>

            {service === "Other (specify)" && customService.trim() && (
              <p className="text-xs text-[#4c4452]">Custom service captured: <span className="font-semibold text-[#1c1c18]">{customService.trim()}</span></p>
            )}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
