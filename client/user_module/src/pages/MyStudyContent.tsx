const mockData = [
  {
    id: 1,
    title: "React Mock",
    description: "React is a JavaScript library for building user interfaces.",
    progress: 0.5,
  },
  {
    id: 2,
    title: "Node.js Mock",
    description:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    progress: 0.3,
  },
  {
    id: 3,
    title: "Express Mock",
    description:
      "Express is a minimal and flexible Node.js web application framework.",
    progress: 0.7,
  },
];

function MyStudyContent() {
  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-bold">Meus estudos</h1>
        <p>
          Aqui você pode acompanhar o progresso dos seus estudos e visualizar os
          estudos que você já criou.
        </p>
      </div>

      {mockData.map((study) => (
        <div key={study.id} className="bg-white p-4 m-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">{study.title}</h2>
          <p>{study.description}</p>
          <div className="flex justify-between items-center">
            <div className="w-3/4 bg-gray-200 h-4 rounded-lg">
              <div
                className="h-full bg-blue-500 rounded-lg"
                style={{ width: `${study.progress * 100}%` }}
              ></div>
            </div>
            <span>{Math.round(study.progress * 100)}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyStudyContent;
