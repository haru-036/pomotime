const StartStopButton = ({
  onClick,
  disabled,
  children,
  start,
}: {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
  start: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${start ? "bg-slate-700 text-white" : "bg-slate-200"} 
            rounded-md w-36 h-16 disabled:opacity-40 flex justify-center items-center gap-2 text-xl`}
    >
      {children}
    </button>
  );
};

export default StartStopButton;
