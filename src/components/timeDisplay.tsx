import { Time } from "./focusTimer";
const TimeDisplay = ({
  time,
  delimiter,
}: {
  time: Time;
  delimiter: string;
}) => {
  const newTime = Array.isArray(time) ? time : Object.values(time);

  return (
    <div className="text-8xl py-4 tracking-wider flex justify-center">
      {newTime.map((n, i, array) => (
        <span key={i} className="flex items-center">
          <span>{String(n).padStart(2, "0")}</span>
          {i !== array.length - 1 && (
            <span className="inline-block pb-4">{delimiter}</span>
          )}
        </span>
      ))}
    </div>
  );
};

export default TimeDisplay;
