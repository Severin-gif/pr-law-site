import React, { useState } from "react";
import { publicUrl } from "../../utils/publicUrl";
import RequestAuditModal from "../modals/RequestAuditModal";

const Hero: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        id="hero"
        className="relative mt-10 min-h-[65vh] overflow-hidden rounded-[32px] bg-[#0B0D10] sm:min-h-[70vh]"
        aria-label="Главный экран"
      >
        {/* BACKGROUND PHOTO */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: "url('07.jpg')",
            backgroundPosition: "85% 50%",
          }}
        />

        {/* READABILITY GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/95 via-[#0B0D10]/65 to-transparent" />

        {/* SOFT VIGNETTE */}
        <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.6)]" />

        {/* CONTENT */}
        <div className="relative z-10 flex h-full items-center px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-36">
          <div className="max-w-2xl">
            <h1 className="font-serif text-[48px] leading-[0.95] tracking-tight text-[#EDE6D8] sm:text-[60px] lg:text-[72px]">
              ЧАСТНЫЙ
              <br />
              ЮРИСТ
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-relaxed text-[#D0D6E3] sm:text-base">
              Работаю с юридическими рисками и конфликтами — до того, как
              начинается суд
            </p>

            <div className="mt-10">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center rounded-full bg-[#8B1E2D] px-8 py-3.5 text-sm font-medium text-white shadow-[0_18px_52px_rgba(139,30,45,0.4)] transition hover:bg-[#A32537]"
              >
                Запросить разбор
              </button>
            </div>
          </div>
        </div>

        {/* SUBTLE BORDER */}
        <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-white/10" />
      </section>

      <RequestAuditModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Hero;
