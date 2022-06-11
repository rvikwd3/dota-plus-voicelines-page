import { useState } from "react";

export const InteractableCopyIcon = ({
  copyCallback,
  className,
  id,
}: {
  copyCallback: () => void;
  className: string;
  id: string;
}) => {
  const [copyState, setCopyState] = useState<string>("Copy Command");
  return (
    <a
      data-tooltip={copyState}  // Tooltip content
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        copyCallback();
        setCopyState("Copied!");
      }}
      id={id}
      className={`cursor-pointer mr-8 ${className}`}
      onMouseLeave={(e) => {
        e.preventDefault();
        setTimeout(() => {    // Allow tooltip to fade out before changing tooltip content
          setCopyState("Copy Command");
        }, 100);
      }}
    >
      <svg
        className="drop-shadow-sm active:scale-75 transition duration-100"
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#d4d4d4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
      </svg>
    </a>
  );
};