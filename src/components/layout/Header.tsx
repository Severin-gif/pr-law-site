import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0D10]/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="text-sm uppercase tracking-[0.28em] text-[#A8ADB4]">
          МИРОНОВ ВЯЧЕСЛАВ
        </div>

        <nav className="hidden gap-6 text-sm text-[#A8ADB4] md:flex">
          <a href="#about" className="hover:text-[#EDEAE2] transition">
            О себе
            </a>
            <a href="#services" className="hover:text-[#EDEAE2] transition">
              Услуги
            </a>
            <a href="#trust" className="hover:text-[#EDEAE2] transition">
              Почему доверяют
            </a>
            <Link
              to="/partners"
              className="hover:text-[#EDEAE2] transition"
            >
              Партнёрам
            </Link>
            <Link to="/pro-bono"
              className="hover:text-[#EDEAE2] transition"
            >Pro Bono
            </Link>
            <a href="#contact" className="hover:text-[#EDEAE2] transition">
              Обратная связь
            </a>
          </nav>
      </div>
    </header>
  );
};

export default Header;
