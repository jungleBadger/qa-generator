export const mockData = [
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
      <div className="px-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm pb-3">
          Aqui você pode acompanhar o progresso dos seus estudos e visualizar os
          estudos que você já criou.
        </p>
      </div>
      <div className="flex gap-2 px-4 justify-center">
        <div className="p-4 rounded-lg bg-blue-500 text-blue-900 font-semibold bg-opacity-20">
          10 cartões estudados
        </div>
        <div className="p-4 rounded-lg bg-purple-500 text-purple-800 font-semibold bg-opacity-20">
          30 cartões criados
        </div>
      </div>
      <div className="px-4 pt-4 pb-0">
        <h1 className="text-lg font-bold">Continue estudando</h1>
        {mockData.map((study) => (
          <a href={`/estudo/${study.id}`} key={study.id}>
            <div className="bg-white p-4 my-2 rounded-lg shadow-md">
              <div className="flex justify-between w-full">
                <h2 className="text-xl pb-1 font-bold">{study.title}</h2>
                {/* <span className="text-xs rounded-full px-2 py-0 flex items-center bg-slate-600 bg-opacity-25">
                  {study.id} cards
                </span> */}
              </div>
              <p className="text-sm">{study.description}</p>
              <div className="flex justify-start gap-3 items-center">
                <div className="w-3/4 bg-gray-200 h-2 rounded-lg">
                  <div
                    className="h-full bg-blue-500 rounded-lg"
                    style={{ width: `${study.progress * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm">
                  {Math.round(study.progress * 100)}%
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default MyStudyContent;
