import React from "react";

const InterludeSection: React.FC = () => {
  return (
    <section className="mt-12 md:mt-16">
      {/* ONE FRAME ONLY (outer) */}
      <div className="rounded-[28px] border border-white/10 bg-[#0B0D10]/55 p-4 md:p-6 shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
          {/* LEFT — no border/ring */}
          <div className="relative overflow-hidden rounded-[22px] bg-gradient-to-b from-[#0E1116] to-[#090B0F] shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
            {/* soft vignette to add depth without borders */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_15%,rgba(255,255,255,0.06),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_100%,rgba(0,0,0,0.55),transparent_55%)]" />

            <div className="relative p-6 md:p-8">
              <div className="mb-6 h-px w-10 bg-white/25" />

              <div className="font-serif text-[30px] leading-[1.3] text-white max-w-[18ch] space-y-6">
                <p>
                  Юрист нужен не для<br />
                  суда.
                </p>

                <p>
                  Суд — это следствие.<br />
                  Работа начинается раньше.
                </p>
              </div>

              <div className="mt-8 max-w-[34ch] text-sm leading-relaxed text-white/70">
                Проверю документы и покажу,<br />
                где риск — до того как он станет<br />
                проблемой.
              </div>
            </div>
          </div>

          {/* RIGHT — no border/ring */}
          <div className="relative overflow-hidden rounded-[22px] bg-black shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/compr3.jpg)" }}
            />
            {/* overlays for premium look */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

            {/* keep height stable */}
            <div className="relative aspect-square" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterludeSection;
