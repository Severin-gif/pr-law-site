import React, { useState } from "react";
import RequestAuditModal from "../modals/RequestAuditModal";
import { publicUrl } from "../../utils/publicUrl";

const Hero: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        id="hero"
        aria-label="Главный экран"
        className="relative mt-10 min-h-[65vh] sm:min-h-[70vh] overflow-hidden rounded-[32px] bg-[#0B0D10]"
      >
        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${publicUrl("docs/07.jpg")})`,
            backgroundPosition: "85% 50%",
          }}
        />

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/55" />

        {/* CONTENT */}
        <div className="relative z-10 flex h-full flex-col justify-center px-8 sm:px-14 max-w-3xl">
          <h1 className="text-[42px] sm:text-[56px] leading-tight font-serif text-white">
            ЧАСТНЫЙ
            <br />
            ЮРИСТ
          </h1>

          <p className="mt-6 max-w-xl text-white/80 text-sm sm:text-base">
            Работаю с юридическими рисками и конфликтами — до того, как начинается суд
          </p>

          <div className="mt-10">
            <button
              onClick={() => setOpen(true)}
              className="rounded-full bg-[#8B1D2C] px-8 py-4 text-sm font-medium text-white hover:bg-[#A12436] transition"
            >
              Запросить разбор
            </button>
          </div>
        </div>
      </section>

      <RequestAuditModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Hero;
