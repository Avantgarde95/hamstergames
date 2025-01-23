interface CounterProps {
  value: number;
}

const Counter = ({ value }: CounterProps) => (
  <div className="flex h-6 w-9 flex-row items-center justify-center bg-black font-mono text-lg leading-none text-[#E63225]">
    {`${value % 1000}`.padStart(3, "0")}
  </div>
);

export default Counter;
