import React from "react";

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="relative mt-20 overflow-hidden rounded-[32px] border border-white/10"
    >
      {/* HEIGHT (управляет высотой секции) */}
      <div className="relative min-h-[420px] md:min-h-[520px]">
        {/* BACKGROUND IMAGE (масштаб/позиция) */}
       <div
          className="
            absolute inset-0 bg-no-repeat
            bg-[length:95%_auto] md:bg-[length:110%_auto]
            bg-[position:60%_50%] md:bg-[position:65%_50%]
          "
          style={{ backgroundImage: "url(/17.jpg)" }}
        />

        {/* OVERLAYS: базовая мягкая тень + читаемость слева + затемнение справа (руки) */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/40 via-black/15 to-transparent" />

        {/* микро-размытие фона (почти незаметно, но гасит “шум”/плохие детали) */}
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        {/* subtle vignette по краям */}
        <div className="absolute inset-0 shadow-[inset_0_0_140px_rgba(0,0,0,0.55)]" />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-20">
          <div className="max-w-2xl">
            {/* компактная подложка под текст для “дорогой” читаемости */}
            <div className="rounded-2xl border border-white/10 bg-black/25 p-6 backdrop-blur-md md:p-8">
              <h2 className="text-xl font-serif tracking-tight text-white">
                О СЕБЕ
              </h2>

              <p className="mt-6 text-lg font-serif text-slate-100">
                «Юрист — не просто защитник закона. Это стратег, который
                просчитывает исход спора до того, как вы зайдёте в зал суда».
              </p>

              <ul className="mt-8 space-y-3 text-sm text-slate-200">
                <li>— опыт судебной работы более 10 лет;</li>
                <li>— узкая специализация: споры, договоры, долги, бизнес;</li>
                <li>— авторские правовые решения под конкретную ситуацию;</li>
                <li>— работаю лично, без передачи дел младшим специалистам.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
