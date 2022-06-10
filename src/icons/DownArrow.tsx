export const DownArrow = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-arrow-down-circle ${className}`}
      width="44"
      height="44"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#d4d4d4"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="12" cy="12" r="9" />
      <line x1="8" y1="12" x2="12" y2="16" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="16" y1="12" x2="12" y2="16" />
    </svg>
  );
};
