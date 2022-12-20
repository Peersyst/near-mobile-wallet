import { ActionIconRoot, TxIcon } from "./ActionIcon.styles";
import { ActionIconProps } from "./ActionIcon.types";
import { ACTION_ICONS } from "./actionIcons";

const ActionIcon = ({ type }: ActionIconProps): JSX.Element => {
    const { Icon, active } = ACTION_ICONS[type] || {};
    return (
        <ActionIconRoot active={active} alignItems="center" justifyContent="center">
            <TxIcon as={Icon} active={active} />
        </ActionIconRoot>
    );
};

export default ActionIcon;
