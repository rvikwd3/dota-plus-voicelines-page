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
      textGradient = `from-bronze-top to-bronze-bottom`;
      break;
    case PlusTier.silver:
      textGradient = `from-silver-top to-silver-bottom`;
      break;
    case PlusTier.gold:
      textGradient = `from-gold-top to-gold-bottom`;
      break;
    case PlusTier.platinum:
      textGradient = `from-platinum-top to-platinum-bottom`;
      break;
    case PlusTier.master:
      textGradient = `from-master-top to-master-bottom`;
      break;
    case PlusTier.grandmaster:
      textGradient = `from-grandmaster-top to-grandmaster-bottom`;
      break;
    case PlusTier.bonus:
      textGradient = `from-bonus-top to-bonus-bottom`;
      break;
    case PlusTier.bag:
      textGradient = `from-bag-top to-bag-bottom`;
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