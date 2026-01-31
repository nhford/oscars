interface YearToggleProps {
  year: string;
  setYear: (year: string) => void;
  options: string[];
}

export default function YearToggle({
  year,
  setYear,
  options = ["2023", "2024", "2025", "All-Time"],
}: YearToggleProps) {
  {
    return (
      <div className="text-center p-1">
        {options.map((yr) => (
          <button
            key={yr}
            onClick={() => setYear(yr)}
            className={`prev-button px-4 py-2 rounded transition ${
              year === yr
                ? "bg-gray-900 text-white font-bold"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }
                            `}
          >
            {yr}
          </button>
        ))}
      </div>
    );
  }
}
