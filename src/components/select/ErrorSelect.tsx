import { useEffect, useState } from "react";

interface ErrorSelectProps {
  value: number | null;
  onChange: (val: number | null) => void;
}

const ErrorSelect: React.FC<ErrorSelectProps> = ({ value, onChange }) => {
  const [selected, setSelected] = useState<number | null>(value ?? null);

  // Sync from parent value to local state
  useEffect(() => {
    setSelected(value ?? null);
  }, [value]);

  // Emit on change
  useEffect(() => {
    onChange(selected);
  }, [selected]);

  const clear = () => {
    setSelected(null);
  };

  return (
    <div className="space-y-2 max-w-xs">
      <label className="block text-sm font-medium text-gray-700">
        Berapa kali error API yang diinginkan?
      </label>

      <div className="relative">
        <select
          value={selected ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            setSelected(val ? parseInt(val) : null);
          }}
          className="block w-full appearance-none border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="" disabled>
            Pilih jumlah error
          </option>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        {selected !== null && (
          <button
            type="button"
            onClick={clear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorSelect;
