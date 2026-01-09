import React, { useState } from "react";
import { RequestAuditModal } from "./RequestAuditModal";

export function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl bg-[#8B1F2D] px-6 py-3 text-sm font-semibold text-white hover:brightness-110"
      >
        Запросить разбор
      </button>

      <RequestAuditModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative mt-10 min-h-[65vh] overflow-hidden rounded-[32px] bg-[#0B0D10]"
      aria-label="Главный экран"
    >
      {/* BACKGROUND PHOTO */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/07.jpg')",
          backgroundPosition: "80% 50%",
        }}
      />

      {/* READABILITY GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/95 via-[#0B0D10]/65 to-transparent" />

      {/* SOFT VIGNETTE */}
      <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.6)]" />

      {/* CONTENT */}
      <div className="relative z-10 flex h-full items-center px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-36">
        <div className="max-w-2xl">
          <h1 className="font-serif uppercase tracking-[0.04em] text-[44px] leading-[0.95] text-[#EDE6D8] sm:text-[56px] lg:text-[66px]">
            Частный
          <br />
           юрист
          </h1>

          <p className="mt-10 max-w-xl text-sm leading-[1.6] text-[#D0D6E3] sm:text-base">
            Работаю с юридическими рисками и конфликтами —
            <br />
            до того, как
            начинается суд
          </p>

          <div className="mt-5">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-[#8B1E2D] px-6 py-3 text-sm font-medium text-white ring-1 ring-white/10 shadow-[0_10px_28px_rgba(0,0,0,0.38)] transition duration-200 hover:bg-[#7A1A27] hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
            >
              Запросить разбор
            </a>
          </div>
        </div>
      </div>

      {/* SUBTLE BORDER */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-white/10" />
    </section>
  );
};

export default Hero;
