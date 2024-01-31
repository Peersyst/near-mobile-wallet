import CardIcon from "module/common/component/display/CardIcon/CardIcon";
import { ActionIconProps } from "./ActionIcon.types";
import { ACTION_ICONS } from "./actionIcons";
import { NearIcon } from "icons";

const ActionIcon = ({ type }: ActionIconProps): JSX.Element => {
    const { Icon, active } = ACTION_ICONS[type] || { Icon: NearIcon, active: false };
    return <CardIcon Icon={Icon} active={active} />;
};

export default ActionIcon;
