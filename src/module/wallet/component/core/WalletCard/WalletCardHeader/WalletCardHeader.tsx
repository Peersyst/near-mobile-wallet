import { Row } from "@peersyst/react-native-components";
import { WalletCardTitle, CopyIcon } from "../WalletCard.styles";
import { useTranslate } from "module/common/hook/useTranslate";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

interface AccountCardHeaderProps {
    index: number;
    name: string;
}

const WalletCardHeader = ({ index, name }: AccountCardHeaderProps): JSX.Element => {
    const { serviceInstance } = useServiceInstance(index);
    const translate = useTranslate();
    return (
        <Row justifyContent="space-between" alignItems="center">
            <WalletCardTitle variant="h4Regular">{name}</WalletCardTitle>
            <CopyIcon text={serviceInstance?.getAddress() || ""} toastMessage={translate("address_copied")} />
        </Row>
    );
};

export default WalletCardHeader;
