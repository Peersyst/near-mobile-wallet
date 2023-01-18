import CardIcon from "module/common/component/display/CardIcon/CardIcon";
import { ActionIconProps } from "./ActionIcon.types";
import { ACTION_ICONS } from "./actionIcons";

const ActionIcon = ({ type }: ActionIconProps): JSX.Element => {
    const { Icon, active } = ACTION_ICONS[type] || {};
    return <CardIcon Icon={Icon} active={active} />;
};

export default ActionIcon;
