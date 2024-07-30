import { useParams } from "react-router-dom";
import Flashcard from "../components/Flashcard";
import { mockData } from "./MyStudyContent";
import { ProgressBarWithinCards } from "../components/ProgressBarWithinCards";

function StudyContent() {
  const { id } = useParams();
  console.log(id);

  return (
    <div className="flex flex-col w-full items-center bg-gradient-to-br from-slate-100 to-slate-200 h-full">
      <h1 className="text-2xl font-bold pt-3 text-black">
        {mockData[id - 1].title}
      </h1>
      <div className="p-3 w-full">
        <ProgressBarWithinCards items={mockData} currentIndex={id - 1} />
        <Flashcard
          question="What is React?"
          answer="React is a JavaScript library for building user interfaces."
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <p>
          <span>1</span> de <span>10</span>
        </p>
        <p className="text-xs">O que você achou dessa pergunta?</p>
        <div>
          <button className="bg-slate-50 rounded-full p-2 shadow-sm">👍</button>
          <button className="bg-slate-50 rounded-full p-2 shadow-sm">👎</button>
        </div>
      </div>
    </div>
  );
}

export default StudyContent;
