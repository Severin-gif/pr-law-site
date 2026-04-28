const NotFound = () => {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-20 text-center sm:px-8">
      <p className="text-sm uppercase tracking-[0.18em] text-white/60">Ошибка 404</p>
      <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Страница не найдена</h1>
      <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
        Похоже, страница была удалена или указан неверный адрес. Проверьте ссылку или вернитесь на
        главную страницу сайта.
      </p>
      <a
        href="/"
        className="mt-8 inline-flex rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/10"
      >
        На главную
      </a>
    </section>
  );
};

export default NotFound;
