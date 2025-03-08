import { type Book } from "@/utils/types";

type BookStatisticsProps = {
  books: Book[];
};

function BookStatistics({ books }: BookStatisticsProps) {
  const stats = books.reduce(
    (acc, book) => {
      acc.total++;
      if (book.status === "Not Started") acc.notStarted++;
      if (book.status === "Reading") acc.reading++;
      if (book.status === "Finished") acc.finished++;
      return acc;
    },
    { total: 0, notStarted: 0, reading: 0, finished: 0 }
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 m-6">
      {[
        {
          label: "Total Books",
          count: stats.total,
          color: "from-purple-400 to-purple-600",
          textColor: "text-white",
        },
        {
          label: "Not Started",
          count: stats.notStarted,
          color: "from-red-400 to-red-600",
          textColor: "text-white",
        },
        {
          label: "Reading",
          count: stats.reading,
          color: "from-yellow-400 to-yellow-600",
          textColor: "text-gray-900",
        },
        {
          label: "Finished",
          count: stats.finished,
          color: "from-green-400 to-green-600",
          textColor: "text-white",
        },
      ].map(({ label, count, color, textColor }) => (
        <div
          key={label}
          className={`bg-gradient-to-r ${color} ${textColor} p-4 rounded-xl shadow-lg transform transition duration-300 hover:scale-105`}
        >
          <h3 className="font-semibold text-lg tracking-wide">{label}</h3>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      ))}
    </div>
  );
}

export default BookStatistics;
