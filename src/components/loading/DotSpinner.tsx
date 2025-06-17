export default function DotSpinner() {
  return (
    <div className="flex space-x-2 items-center justify-center">
      <span className="block h-3 w-3 bg-[#61DBFB] rounded-full animate-pulse delay-75"></span>
      <span className="block h-3 w-3 bg-[#61DBFB] rounded-full animate-pulse delay-150"></span>
      <span className="block h-3 w-3 bg-[#61DBFB] rounded-full animate-pulse delay-250"></span>
    </div>
  );
}
