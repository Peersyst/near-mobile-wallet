import { NearIcon } from "icons";
import { CardIconRoot, InnerCardIcon } from "./CardIcon.styles";

export interface CardIconProps {
    Icon: typeof NearIcon;
    active: boolean;
    darkInactive?: boolean;
}

export interface CardIconCompponentProps {
    active?: boolean;
}

const CardIcon = ({ active, Icon, darkInactive }: CardIconProps): JSX.Element => {
    return (
        <CardIconRoot active={active} alignItems="center" justifyContent="center">
            <InnerCardIcon as={Icon} active={active} darkInactive={darkInactive} />
        </CardIconRoot>
    );
};

export default CardIcon;
