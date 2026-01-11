export default function QuoteSection() {
  return (
    <section className="px-6 pt-10 pb-6 sm:px-10 sm:pt-12 sm:pb-8 lg:px-16 lg:pt-14 lg:pb-10">
      <div className="mx-auto max-w-6xl">
        <blockquote className="relative rounded-[24px] border border-white/10 bg-white/[0.02] p-8 sm:p-10">
          <p className="font-serif text-[22px] leading-snug text-white/90 sm:text-[26px]">
            Qui prior est tempore,
            <br />
            potior est iure
          </p>

          <p className="mt-3 text-sm tracking-wide text-white/50">
            Кто раньше — тот сильнее в праве
          </p>
        </blockquote>
      </div>
    </section>
  );
}
