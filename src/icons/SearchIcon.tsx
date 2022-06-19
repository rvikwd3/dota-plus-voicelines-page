type Props = {
  id?: string;
  className?: string;
};

export const SearchIcon = ({ id, className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-search ${className}`}
      width="32"
      height="32"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#ffffff"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <circle cx="10" cy="10" r="7" />
      <line x1="21" y1="21" x2="15" y2="15" />
    </svg>
  );
};
