import React from "react";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#EDEAE2]">
      <main className="px-6 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between gap-4">
            <h1 className="font-serif text-3xl sm:text-4xl">Обо мне</h1>
            <Link
              to="/"
              className="rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2 text-sm text-white/85 hover:bg-white/[0.06]"
            >
              ← На главную
            </Link>
          </div>

          <p className="mt-4 text-white/70">
            Здесь будет подробная информация и документы (через модальное окно).
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;
