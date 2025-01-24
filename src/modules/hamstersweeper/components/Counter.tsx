interface CounterProps {
  value: number;
}

const Counter = ({ value }: CounterProps) => (
  <div className="flex h-7 w-11 flex-row items-center justify-center bg-slate-800 font-mono text-lg leading-none text-[#E63225]">
    {`${value % 1000}`.padStart(3, "0")}
  </div>
);

export default Counter;
