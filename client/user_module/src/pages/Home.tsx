function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex justify-center w-full">
        <div className="w-2/3">
          <h1 className="text-3xl font-bold">Bem-vindo ao LearningFlash</h1>
          <p className="mt-4">
            Transforme textos em perguntas e respostas para facilitar seu
            aprendizado. Comece agora e melhore sua retenção de informações.
          </p>
        </div>
      </div>
      <a
        href="/criar"
        className="mt-4 w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Criar estudo
      </a>
    </div>
  );
}

export default Home;
