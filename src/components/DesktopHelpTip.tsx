import { PlayAudioIcon } from "../icons";

interface Props extends React.ComponentPropsWithoutRef<'div'> {
  icon: React.ReactNode;
  tipTitle: string;
  tipText: React.ReactNode;
  tipImgUrl: string;
};

const DesktopHelpTip = ({className}: Props) => {
  return (
    <div className={`flex flex-col gap-y-4 ${className}`}>
      <div className="flex flex-row gap-x-4">
        <PlayAudioIcon className="w-8 h-8 stroke-neutral-200" />
        <span className="text-lg text-neutral-200">Listen</span>
      </div>
      <span className="text-lg text-neutral-200">Play a voiceline by clicking anywhere along the voiceline</span>
    </div>
  )
}

export default DesktopHelpTip;