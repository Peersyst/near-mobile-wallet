import { Row } from "@peersyst/react-native-components";
import { WalletCardTitle, CopyIcon, EditIcon } from "../WalletCard.styles";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import { useTranslate } from "module/common/hook/useTranslate";

interface AccountCardHeaderProps {
    index: number;
    name: string;
}

const WalletCardHeader = ({ index, name }: AccountCardHeaderProps): JSX.Element => {
    const network = useSelectedNetwork();
    const serviceInstance = serviceInstancesMap.get(index)?.[network];
    const translate = useTranslate();
    return (
        <Row justifyContent="space-between" alignItems="center">
            <EditIcon index={index} />
            <WalletCardTitle variant="h3">{name}</WalletCardTitle>
            <CopyIcon text={serviceInstance?.getAddress() || ""} toastMessage={translate("address_copied")} />
        </Row>
    );
};

export default WalletCardHeader;
