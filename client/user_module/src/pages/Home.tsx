function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex justify-center w-full pt-8">
        <div className="px-14">
          <h1 className="text-3xl font-bold">Bem-vindo ao LearningFlash</h1>
          <p className="mt-4">
            Transforme textos em perguntas e respostas para facilitar seu
            aprendizado. Comece agora e melhore sua retenção de informações.
          </p>
        </div>
      </div>
      <a
        href="/criar"
        className="mt-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded"
      >
        Começar a estudar
      </a>
    </div>
  );
}

export default Home;
