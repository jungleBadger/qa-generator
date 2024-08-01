import { useEffect, useState } from "react";

const Flashcard = ({
  question,
  answer
}: {
  question: string;
  answer: string;
}) => {
  const [flipped, setFlipped] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!flipped && progress < 100) {
      timer = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 100); // Update progress every 100ms
    } else if (progress >= 100) {
      handleFlip();
    }

    return () => clearInterval(timer);
  }, [flipped, progress]);

  const handleFlip = () => {
    setFlipped((prev) => !prev);
    setProgress(0); // Reset progress on flip
  };

  return (
    <div
      className={`relative w-full h-64 bg-white shadow-lg rounded-lg  cursor-pointer transform transition-transform duration-500 ${
        flipped ? "rotate-y-180" : ""
      }`}
      onClick={handleFlip}
    >
      <div
        className={`absolute w-full h-full flex items-center justify-center text-center p-4 text-lg font-semibold ${flipped ? "hidden" : ""}`}
      >
        {question}
      </div>
      <div
        className={`absolute w-full h-full flex items-center justify-center text-center p-4 text-lg font-semibold ${flipped ? "" : "hidden"}`}
      >
        {answer}
      </div>
      {!flipped && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-b-xl overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
