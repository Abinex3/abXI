import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

export default function Contact() {
  const sectionRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState(""); // "", "sending", "success", "error"

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Confetti burst on page load / refresh
  useEffect(() => {
    const duration = 1500;
    const end = Date.now() + duration;
    const colors = ["#e03a1e", "#e8a020", "#111111", "#ffffff", "#c0392b"];

    const frame = () => {
      // left side
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.6 },
        colors,
      });
      // right side
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.6 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };

    const startTimer = setTimeout(frame, 250); // small delay so it fires after mount
    return () => clearTimeout(startTimer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.target);
    formData.append("access_key", "72c1463c-0c75-419d-b87b-2ffc3a267121"); // free key from web3forms.com
    formData.append("subject", "New message from your portfolio");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        e.target.reset();
        // celebratory burst on successful send
        confetti({
          particleCount: 120,
          spread: 90,
          origin: { y: 0.6 },
          colors: ["#e03a1e", "#e8a020", "#111111", "#ffffff"],
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputBase =
    "w-full bg-black/[0.04] border border-black/10 rounded-lg px-5 py-4 " +
    "text-black placeholder-black/35 outline-none transition-all duration-200 " +
    "focus:border-black/40 focus:bg-black/[0.06]";

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#e8e0d5",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="relative z-10 max-w-2xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 text-center">

        {/* Heading */}
        <h1
          className="text-black uppercase leading-[0.85] mb-16 md:mb-20"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(4rem, 16vw, 13rem)",
            fontWeight: 900,
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          Contact
        </h1>

        {/* Response message ABOVE the form */}
        {status === "success" && (
          <div
            className="mb-8 rounded-lg border border-green-700/30 bg-green-700/10 px-5 py-4 text-center"
            role="status"
          >
            <p className="text-sm font-medium text-green-800">
              Message sent — thanks for reaching out. I'll get back to you soon.
            </p>
          </div>
        )}
        {status === "error" && (
          <div
            className="mb-8 rounded-lg border border-red-700/30 bg-red-700/10 px-5 py-4 text-center"
            role="alert"
          >
            <p className="text-sm font-medium text-red-700">
              Something went wrong. Please try again, or email me directly below.
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
          <div>
            <label className="block text-sm font-medium text-black/70 mb-2">
              Name <span className="text-[#e03a1e]">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className={inputBase}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black/70 mb-2">
              Email Address <span className="text-[#e03a1e]">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="alexa@company.com"
              required
              className={inputBase}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black/70 mb-2">
              Message <span className="text-[#e03a1e]">*</span>
            </label>
            <textarea
              name="message"
              placeholder="Tell me about the opportunity..."
              rows="5"
              required
              className={inputBase + " resize-none"}
            />
          </div>

          {/* Honeypot spam trap */}
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Centered Send button with loading spinner */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mx-auto inline-flex items-center justify-center gap-2 bg-black text-[#e8e0d5] px-9 py-4 rounded-lg font-semibold tracking-wide uppercase text-sm transition-all duration-200 hover:bg-black/85 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "sending" && (
              <span
                className="inline-block h-4 w-4 rounded-full border-2 border-[#e8e0d5]/40 border-t-[#e8e0d5] animate-spin"
                aria-hidden="true"
              />
            )}
            {status === "sending" ? "Sending..." : "Get in touch"}
          </button>
        </form>

        {/* Direct contact — centered below the form */}
        <div
          className="mt-16 flex flex-col items-center gap-8"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
          }}
        >
          <p className="text-black/70 text-sm leading-relaxed max-w-xs">
            Prefer to reach out directly? I'm quick to respond on any of these.
          </p>

          <div className="flex flex-col items-center gap-6">
            {/* Email */}
            <a href="mailto:abineshmuniyasaamy@gmail.com" className="group block text-center">
              <span className="block text-xs uppercase tracking-widest text-black/45 mb-1">
                Email
              </span>
              <span className="block text-lg text-black font-medium transition-colors group-hover:text-[#e03a1e]">
                abineshmuniyasaamy@gmail.com
              </span>
            </a>

            
            {/* Phone / WhatsApp */}
            <a
              href="https://wa.me/919489662785"
              target="_blank"
              rel="noreferrer"
              className="group block text-center"
            >
              <span className="block text-xs uppercase tracking-widest text-black/45 mb-1">
                Phone / WhatsApp
              </span>
              <span className="block text-lg text-black font-medium transition-colors group-hover:text-[#e03a1e]">
                +91 94896 62785
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "160px",
        }}
      />
    </section>
  );
}