import React from "react";
import { Link } from "react-router-dom";

import { HEADER_NAV_LINKS } from "../../config/navigation";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0D10]/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex max-w-6xl items-center justify-between px-4 py-4">
          <Link
            to={HEADER_NAV_LINKS.home}
            className="text-sm uppercase tracking-[0.28em] text-[#A8ADB4] transition hover:opacity-80"
          >
            Миронов Вячеслав Владимирович
          </Link>
        </div>

        <nav className="hidden gap-6 text-sm text-[#A8ADB4] md:flex">
          <a href={HEADER_NAV_LINKS.about} className="transition hover:text-[#EDEAE2]">
            О себе
          </a>
          <a href={HEADER_NAV_LINKS.services} className="transition hover:text-[#EDEAE2]">
            Услуги
          </a>
          <a href={HEADER_NAV_LINKS.trust} className="transition hover:text-[#EDEAE2]">
            Почему доверяют
          </a>
          <Link to={HEADER_NAV_LINKS.partners} className="transition hover:text-[#EDEAE2]">
            Партнёрам
          </Link>
          <Link to={HEADER_NAV_LINKS.proBono} className="transition hover:text-[#EDEAE2]">
            Pro Bono
          </Link>
          <a href={HEADER_NAV_LINKS.contact} className="transition hover:text-[#EDEAE2]">
            Обратная связь
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
