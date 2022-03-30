import { translate } from "locale";
import { Row } from "react-native-components";
import { FavouriteIcon, WalletCardTitle, CopyIcon } from "../WalletCard.styles";
import useWallet from "module/wallet/hook/useWallet";

interface AccountCardHeaderProps {
    index: number;
    name: string;
}

const WalletCardHeader = ({ index, name }: AccountCardHeaderProps): JSX.Element => {
    const { serviceInstance } = useWallet(index);

    return (
        <Row justifyContent="space-between" alignItems="center">
            <FavouriteIcon />
            <WalletCardTitle variant="h3">{name}</WalletCardTitle>
            <CopyIcon text={serviceInstance?.getAddress() || ""} toastMessage={translate("address_copied")} />
        </Row>
    );
};

export default WalletCardHeader;
