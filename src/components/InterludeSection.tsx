import React from "react";

const InterludeSection: React.FC = () => {
  return (
    <section className="mt-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ЛЕВО — ФОТО + ТЕКСТ */}
        <div
          className="relative aspect-square rounded-2xl overflow-hidden flex items-end"
          style={{
            backgroundImage: "url(/compr1.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* мягкое затемнение */}
          <div className="flex items-center h-full pl-12" />

          {/* текст */}
          <div className="relative h-full w-full flex items-center">
       <p className="
  max-w-sm
  font-serif
  text-[30px]
  leading-[1.3]
  tracking-[-0.01em]
  text-[#F1EFE8]
">
  Работа юриста начинается<br />
  задолго до суда.
</p>

        </div>

        </div>

        {/* ПРАВО — ЧИСТОЕ ФОТО */}
        <div
          className="relative aspect-square rounded-2xl overflow-hidden"
          style={{
            backgroundImage: "url(/compr2.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

      </div>
    </section>
  );
};

export default InterludeSection;
