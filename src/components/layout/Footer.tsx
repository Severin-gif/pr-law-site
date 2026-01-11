import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-black/95">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
        
        <div>
          © {new Date().getFullYear()} Частный юрист
        </div>

        <div className="flex flex-wrap gap-4">
          <Link to="/privacy" className="hover:text-slate-300">
            Политика конфиденциальности
          </Link>
          <Link to="/terms" className="hover:text-slate-300">
            Правила пользования сайтом
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
