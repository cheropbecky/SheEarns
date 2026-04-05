import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { queens, slugifyQueen } from "../data/queens";
import {
  MapPin,
  Star,
  BadgeCheck,
  MessageCircle,
  ArrowRight,
  Camera,
} from "lucide-react";

const portfolio = [
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80&auto=format&fit=crop",
];

const reviews = [
  { name: "Mercy N.", rating: 5, text: "Amazing quality and super professional. I will definitely book again.", date: "2 days ago" },
  { name: "Lyn A.", rating: 5, text: "Great communication and excellent service delivery.", date: "1 week ago" },
  { name: "Ruth M.", rating: 4, text: "Loved the final results and fast turnaround.", date: "2 weeks ago" },
];

export default function QueenProfile({ slug }) {
  const queen = queens.find((q) => slugifyQueen(q.name) === slug) || queens[0];
  const similar = queens.filter((q) => q.name !== queen.name).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fdf9f3] font-['Inter',sans-serif]">
      <Navbar active="Marketplace" isLoggedIn={false} />

      <main className="pt-24 pb-24">
        <section className="relative h-[280px] bg-gradient-to-r from-[#500088] to-[#EC4899]">
          <div className="max-w-[1280px] mx-auto px-6 h-full flex items-end pb-6">
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-white text-4xl">Queen Profile</h1>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-6 -mt-16">
          <div className="bg-white rounded-3xl shadow-sm p-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <img src={queen.avatar} alt={`${queen.name} profile portrait`} loading="lazy" className="w-28 h-28 rounded-full object-cover object-center ring-4 ring-white shadow-lg" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[#500088] text-3xl">{queen.name}</h2>
                  {queen.verified && <BadgeCheck size={20} strokeWidth={1.5} className="text-[#500088]" />}
                </div>
                <p className="text-[#1c1c18] font-semibold">{queen.hustle}</p>
                <p className="text-[#4c4452] inline-flex items-center gap-1 text-sm mt-1"><MapPin size={14} strokeWidth={1.5} /> {queen.location}</p>
                <p className="inline-flex items-center gap-1 text-sm mt-2 text-[#500088] font-bold">
                  <Star size={14} strokeWidth={1.5} className="text-[#fea619] fill-[#fea619]" />
                  {queen.rating} ({queen.reviews} reviews)
                </p>
              </div>
              <div className="flex gap-3">
                <button className="bg-[#500088] text-white font-bold px-6 py-3 rounded-2xl hover:opacity-90 transition-all duration-200 active:scale-95">Book Now</button>
                <button className="bg-green-600 text-white font-bold px-6 py-3 rounded-2xl hover:opacity-90 transition-all duration-200 active:scale-95 inline-flex items-center gap-2">
                  <MessageCircle size={16} strokeWidth={1.5} /> WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1280px] mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#500088] text-2xl mb-4">About</h3>
              <p className="text-[#4c4452] leading-relaxed">{queen.bio}</p>
              <p className="text-[#4c4452] leading-relaxed mt-4">She serves clients across nearby estates and offers flexible bookings for weekdays and weekends. Every client receives a clear session breakdown, timeline, and aftercare advice.</p>
              <p className="text-[#4c4452] leading-relaxed mt-4">Her mission is to help women look and feel confident while building a dependable service business powered by consistency and quality.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#500088] text-2xl mb-4">Services Offered</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {["Starter Package", "Standard Session", "Premium Session", "Home Service"].map((service, i) => (
                  <div key={service} className="bg-[#f7f3ed] rounded-2xl p-4">
                    <p className="font-semibold text-[#1c1c18]">{service}</p>
                    <p className="text-[#500088] font-bold mt-1">Ksh {1200 + i * 900}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#500088] text-2xl mb-4 inline-flex items-center gap-2">
                <Camera size={22} strokeWidth={1.5} /> Portfolio
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {portfolio.map((img) => (
                  <img key={img} src={img} alt="Service portfolio work" loading="lazy" className="w-full h-40 rounded-2xl object-cover object-center" />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#500088] text-2xl mb-4">Reviews</h3>
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.name} className="bg-[#f7f3ed] rounded-2xl p-4">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-[#1c1c18]">{review.name}</p>
                      <p className="text-xs text-[#4c4452]">{review.date}</p>
                    </div>
                    <p className="flex items-center gap-1 mt-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={14} strokeWidth={1.5} className="text-[#fea619] fill-[#fea619]" />
                      ))}
                    </p>
                    <p className="text-[#4c4452] text-sm mt-2">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl shadow-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#500088] text-xl mb-4">Similar Queens</h3>
              <div className="space-y-4">
                {similar.map((q) => (
                  <a key={q.name} href={`/marketplace/queen/${slugifyQueen(q.name)}`} className="no-underline bg-[#f7f3ed] rounded-2xl p-3 flex items-center gap-3">
                    <img src={q.avatar} alt={`${q.name} profile`} loading="lazy" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-[#1c1c18] text-sm">{q.name}</p>
                      <p className="text-[#4c4452] text-xs">{q.hustle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <a href="/marketplace" className="bg-[#500088] text-white font-bold px-5 py-4 rounded-2xl no-underline inline-flex items-center gap-2 hover:opacity-90 transition-all duration-200 active:scale-95">
              Back to Marketplace <ArrowRight size={16} strokeWidth={1.5} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
