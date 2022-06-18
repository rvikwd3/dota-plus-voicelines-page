type Props = {
  id?: string;
  className?: string;
};

export const ChevronUpIcon = ({ id, className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-chevrons-up ${className}`}
      width="44"
      height="44"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#ffffff"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="7 11 12 6 17 11" />
      <polyline points="7 17 12 12 17 17" />
    </svg>
  );
};
