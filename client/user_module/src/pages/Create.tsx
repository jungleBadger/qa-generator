import { useState } from "react";

function Create() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log(`Input value: ${inputValue}`);
    setInputValue("");
  };
  return (
    <div className="px-4">
      <h1 className="text-2xl font-bold">Criar estudos</h1>
      <p className="mt-4">
        Envie ou cole o texto que você deseja estudar. Nosso sistema irá
        transformar o conteúdo em perguntas e respostas para facilitar seu
        aprendizado.
      </p>
      <div className="flex flex-col items-center py-4">
        <textarea
          className="w-full p-2 mb-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Cole o texto que deseja estudar sobre aqui..."
          rows={10}
        />
        <button
          className="mt-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Criar perguntas
        </button>
      </div>
    </div>
  );
}

export default Create;
