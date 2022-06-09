import { PlusTier } from "../../../types";

const assertUnreachable = (x: never): never => {
  throw new Error("Unreachable assertion reached");
};

export const VoicelineText = ({
  text,
  plusTierName,
  className,
  id,
}: {
  text: string;
  plusTierName: PlusTier;
  className?: string;
  id?: string;
}) => {
  let textGradient = "";
  switch (plusTierName) {
    case PlusTier.bronze:
      textGradient = `to-bronze-to from-bronze-from `;
      break;
    case PlusTier.silver:
      textGradient = `to-silver-to from-silver-from `;
      break;
    case PlusTier.gold:
      textGradient = `to-gold-to from-gold-from `;
      break;
    case PlusTier.platinum:
      textGradient = `to-platinum-to from-platinum-from `;
      break;
    case PlusTier.master:
      textGradient = `to-master-to from-master-from `;
      break;
    case PlusTier.grandmaster:
      textGradient = `to-grandmaster-to from-grandmaster-from `;
      break;
    case PlusTier.bonus:
      textGradient = `to-bonus-to from-bonus-from `;
      break;
    case PlusTier.bag:
      textGradient = `to-bag-to from-bag-from `;
      break;
    default:
      assertUnreachable(plusTierName);
  }
  return (
    <div id={`${id}`} className={`${className} drop-shadow-sm `}>
      <span
        className={`cursor-auto inline break-word md:text-lg font-bold justify-self-start leading-snug tracking-normal bg-clip-text text-transparent bg-gradient-to-b ${textGradient}`}
        onClick={(e) => e.stopPropagation()}
      >
        {text}
      </span>
    </div>
  );
};
