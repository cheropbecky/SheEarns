import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ExternalLink, Calendar } from "lucide-react";

const posts = [
  {
    title: "How to Land Your First Client in 7 Days",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format&fit=crop",
    date: "April 2026",
    excerpt: "A practical checklist to move from planning to paid bookings quickly.",
  },
  {
    title: "Pricing Confidence for New Service Businesses",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop",
    date: "March 2026",
    excerpt: "Use market-based pricing without undercharging your skills.",
  },
  {
    title: "Social Media Templates That Actually Convert",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80&auto=format&fit=crop",
    date: "February 2026",
    excerpt: "A repeatable posting system for visibility, trust, and bookings.",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#fdf9f3] font-['Inter',sans-serif]">
      <Navbar active="Blog" isLoggedIn={false} />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div data-aos="fade-down" className="mb-12 text-center">
            <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[#500088] text-5xl">SheEarns Blog</h1>
            <p className="text-[#4c4452] mt-4 text-lg">Business tips, pricing guides, and growth playbooks for queens.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <article key={post.title} data-aos="fade-up" data-aos-delay={i * 120} className="bg-white rounded-3xl shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <img src={post.image} alt={post.title} loading="lazy" className="w-full h-52 object-cover object-center" />
                <div className="p-6 flex flex-col gap-3">
                  <p className="text-xs font-bold text-[#4c4452] uppercase tracking-widest inline-flex items-center gap-1">
                    <Calendar size={14} strokeWidth={1.5} />
                    {post.date}
                  </p>
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[#1c1c18] text-xl">{post.title}</h2>
                  <p className="text-[#4c4452] text-sm">{post.excerpt}</p>
                  <button className="mt-2 text-[#500088] font-bold text-sm inline-flex items-center gap-2 transition-all duration-200 active:scale-95">
                    Read Article <ExternalLink size={16} strokeWidth={1.5} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
