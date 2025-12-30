import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-black/95">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-slate-500 md:flex-row">
        <div>© {new Date().getFullYear()} Частный юрист</div>
        <div className="flex gap-4">
          <a href="#services" className="hover:text-slate-300">
            Услуги
          </a>
          <a href="#trust" className="hover:text-slate-300">
            Почему доверяют
          </a>
          <a href="#contact" className="hover:text-slate-300">
            Обратная связь
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
