import { Col } from "@peersyst/react-native-components";
import { BaseWalletCardRoot } from "module/common/component/surface/BaseWalletCard/BaseWalletCard.styles";
import { ReactElement } from "react";
import Typography from "../../display/Typography/Typography";

interface BaseWalletCardProps {
    name: string;
    children: {
        Balance: ReactElement;
        Buttons: ReactElement;
    };
}

const BaseWalletCard = ({ name, children: { Balance, Buttons } }: BaseWalletCardProps) => {
    return (
        <BaseWalletCardRoot>
            <Col flex={1} gap={20} alignItems="center">
                <Typography color={(palette) => palette.white} variant="body2Strong">
                    {name}
                </Typography>
                {Balance}
                {Buttons}
            </Col>
        </BaseWalletCardRoot>
    );
};

export default BaseWalletCard;
