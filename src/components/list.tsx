const List = ({ times, date }: { times: number; date: string }) => {
  return (
    <div>
      <div className="text-lg text-center tracking-wider flex items-center gap-4">
        <div className="text-slate-700 text-lg">{date}</div>
        <span>
          <span className="text-2xl">{times * 25}</span> min
        </span>
      </div>
    </div>
  );
};

export default List;
