export const ProgressBarWithinCards = ({
  items,
  currentIndex,
}: {
  items: any[];
  currentIndex: number;
}) => {
  return (
    <div className="flex space-x-2 py-2">
      {items.map((item, index) => (
        <div
          key={index}
          className={`w-full h-1 rounded-full ${index <= currentIndex ? "bg-blue-500" : "bg-gray-300"}`}
        ></div>
      ))}
    </div>
  );
};
