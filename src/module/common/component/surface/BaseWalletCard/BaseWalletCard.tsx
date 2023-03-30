import { BaseWalletCardRoot } from "module/common/component/surface/BaseWalletCard/BaseWalletCard.styles";
import Account from "module/wallet/component/display/Account/Account";
import { Wallet } from "module/wallet/state/WalletState";
import { ReactElement } from "react";
import { Col, Row } from "@peersyst/react-native-components";

interface BaseWalletCardProps {
    wallet: Wallet;
    children: { content: ReactElement; footer?: ReactElement };
    gap?: number;
}

const BaseWalletCard = ({ wallet: { account, imported }, children: { content, footer }, gap }: BaseWalletCardProps): JSX.Element => {
    return (
        <BaseWalletCardRoot gap={gap}>
            <Col style={{ width: "100%" }} alignItems="center" gap={10} justifyContent="center">
                <Account action="copy" imported={imported} address={account} variant="body2Strong" />
                {content}
            </Col>
            <Row justifyContent="center">{footer}</Row>
        </BaseWalletCardRoot>
    );
};

export default BaseWalletCard;
