import { ActionIconRoot, TxIcon } from "./ActionIcon.styles";
import { ActionIconProps } from "./ActionIcon.types";
import { ACTION_ICONS } from "./actionIcons";

const ActionIcon = ({ actionKind }: ActionIconProps): JSX.Element => {
    const { Icon, active } = ACTION_ICONS[actionKind] || {};
    return (
        <ActionIconRoot active={active} alignItems="center" justifyContent="center">
            <TxIcon as={Icon} active={active} />
        </ActionIconRoot>
    );
};

export default ActionIcon;
