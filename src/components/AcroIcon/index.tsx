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
  IconCode
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
  code: IconCode
}

type IconName = keyof typeof iconsMap;

interface AcroIconProps {
  name: string;
  spin?: boolean;
}

const AcroIcon: React.FC<AcroIconProps> = ({ name, spin = false }) => {
  const Icon = iconsMap[name as IconName]
  if (!Icon) {
    console.warn(`Icon with name "${name}" does not exist in iconsMap.`);
    return null
  }
  return <Icon spin={spin} />
}

export default AcroIcon;
