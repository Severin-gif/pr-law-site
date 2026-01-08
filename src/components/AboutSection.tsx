import React from "react";
import { Link } from "react-router-dom";

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden rounded-[32px] border border-white/10"
    >
      <div className="relative min-h-[420px] md:min-h-[520px]">
        {/* BG */}
        <div
          className="
            absolute inset-0 bg-no-repeat
            bg-[length:95%_auto] md:bg-[length:110%_auto]
            bg-[position:60%_50%] md:bg-[position:65%_50%]
          "
          style={{ backgroundImage: "url(/17.jpg)" }}
        />

        {/* overlays */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/15 to-transparent" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
        <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.55)]" />

        {/* content */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
          <div className="max-w-2xl">
            <div className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-md md:p-8">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-serif tracking-tight text-white">
                  О СЕБЕ
                </h2>

                <Link
                  to="/about"
                  className="
                    inline-flex items-center justify-center
                    rounded-xl
                    border border-[#7D1F2A]/55
                    bg-[#7D1F2A]/10
                    px-4 py-2
                    text-sm font-medium
                    text-[#F3E9EB]
                    hover:bg-[#7D1F2A]/18
                    hover:border-[#7D1F2A]/75
                    transition
                  "
                >
                  Подробнее
                </Link>
              </div>

              <p className="mt-6 text-lg font-serif leading-relaxed text-slate-100">
                Юрист — это не только защита в суде.
                <br />
                В большинстве ситуаций исход спора формируется заранее —
                <br />
                до того, как вы зайдёте в зал суда.
              </p>

              <ul className="mt-8 space-y-3 text-sm text-slate-200">
                <li>— опыт судебной работы более 15 лет;</li>
                <li>— споры, договоры, долги, бизнес;</li>
                <li>— работаю лично, без передачи дел.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
