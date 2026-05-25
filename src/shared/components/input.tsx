import { type PropsWithChildren } from "react";
import type { InputProps } from "../types/types";

const Input: React.FC<PropsWithChildren<InputProps>> = ({
  label,
  id,
  name,
  value,
  type,
  onChange,
  onClick,
  placeholder,
  children,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm/6 font-medium text-gray-900">
        {label || ""}
      </label>
      <div className="mt-2">
        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
          <input
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            type={type}
            onChange={onChange}
            onClick={onClick}
            className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Input;
