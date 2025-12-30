import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative mt-10 overflow-hidden rounded-[32px] bg-[#0B0D10]"
      aria-label="Главный экран"
    >
      {/* BACKGROUND PHOTO (fills the whole hero by section height) */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url('/07.jpg')",
          // Подстройка кадра: по X двигаем лицо ближе к центру, по Y — чуть выше.
          // Двигай проценты: 50% 20% / 60% 25% и т.д.
          backgroundPosition: "120% 50%",
        }}
      />
      {/* READABILITY: left soft dark gradient (for text) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/95 via-[#0B0D10]/60 to-transparent" />

      {/* SOFT vignette (edges) */}
      <div className="absolute inset-0 shadow-[inset_0_0_160px_rgba(0,0,0,0.55)]" />

      {/* CONTENT */}
      <div className="relative z-10 px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <div className="max-w-2xl">
          <h1 className="font-serif text-[44px] leading-[0.95] tracking-tight text-[#EDE6D8] sm:text-[56px] lg:text-[64px]">
            ЧАСТНЫЙ
            <br />
            ЮРИСТ
          </h1>
          <p className="mt-5 text-base text-[#D0D6E3] sm:text-lg">
            для бизнеса и частных клиентов
          </p>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#9CA3AF] sm:text-base">
            Судебная защита, договоры, долги, бизнес-споры. Работаю лично, без
            посредников.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#contact"
              className="rounded-full bg-[#8B1E2D] px-6 py-3 text-sm text-white shadow-[0_16px_48px_rgba(139,30,45,0.35)] transition hover:bg-[#A32537]"
            >
              Получить консультацию
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/25 bg-black/10 px-6 py-3 text-sm text-[#EDE6D8] backdrop-blur-md transition hover:border-white/45"
            >
              Оставить заявку
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 text-sm sm:grid-cols-3">
            <div>
              <div className="font-semibold text-[#EDE6D8]">10+ лет</div>
              <div className="mt-1 text-[#9CA3AF]">практики в судах</div>
            </div>

            <div>
              <div className="font-semibold text-[#EDE6D8]">Арбитраж / ГПК</div>
              <div className="mt-1 text-[#9CA3AF]">
                коммерческие и гражданские споры
              </div>
            </div>

            <div>
              <div className="font-semibold text-[#EDE6D8]">Личный контакт</div>
              <div className="mt-1 text-[#9CA3AF]">
                без передачи «на поток»
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* subtle border */}
      <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-white/10" />
    </section>
  );
};

export default Hero;
