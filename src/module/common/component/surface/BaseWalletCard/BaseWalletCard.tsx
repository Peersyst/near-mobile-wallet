import { BaseWalletCardRoot, ImportedWalletChip } from "module/common/component/surface/BaseWalletCard/BaseWalletCard.styles";
import Account from "module/wallet/component/display/Account/Account";
import { Wallet } from "module/wallet/state/WalletState";
import { ReactElement } from "react";
import { Col, Row } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";

interface BaseWalletCardProps {
    wallet: Wallet;
    children: { content: ReactElement; footer?: ReactElement };
    gap?: number;
}

const BaseWalletCard = ({ wallet: { account, imported }, children: { content, footer }, gap }: BaseWalletCardProps): JSX.Element => {
    const translate = useTranslate();
    return (
        <BaseWalletCardRoot>
            {imported && <ImportedWalletChip label={translate("imported").toUpperCase()} variant="glass" size="sm" />}
            <Col gap={gap} style={{ width: "100%" }}>
                <Col style={{ width: "100%" }} alignItems="center" gap={10} justifyContent="center">
                    <Account action="copy" address={account} variant="body2Strong" />
                    {content}
                </Col>
                <Row justifyContent="center">{footer}</Row>
            </Col>
        </BaseWalletCardRoot>
    );
};

export default BaseWalletCard;
