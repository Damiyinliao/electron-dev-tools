import {
  IconHome,
  IconCalendar,
  IconMessage,
  IconSettings,
  IconUser,
  IconTag,
  IconFile,
  IconFolder,
  IconFileImage,
  IconCodeBlock,
  IconCode,
  IconCopy
} from '@arco-design/web-react/icon'

const iconsMap = {
  home: IconHome,
  calendar: IconCalendar,
  message: IconMessage,
  settings: IconSettings,
  user: IconUser,
  tag: IconTag,
  file: IconFile,
  folder: IconFolder,
  fileImage: IconFileImage,
  codeBlock: IconCodeBlock,
  code: IconCode,
  copy: IconCopy
}

type IconName = keyof typeof iconsMap;

interface AcroIconProps {
  name: string;
  spin?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const AcroIcon: React.FC<AcroIconProps> = ({ name, spin = false, className, style, onClick }) => {
  const Icon = iconsMap[name as IconName]
  if (!Icon) {
    console.warn(`Icon with name "${name}" does not exist in iconsMap.`);
    return null
  }
  return <Icon spin={spin} className={className} style={style} onClick={onClick} />
}

export default AcroIcon;
