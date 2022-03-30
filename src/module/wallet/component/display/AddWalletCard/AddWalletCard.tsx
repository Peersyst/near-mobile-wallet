import { translate } from "locale";
import { AddIcon, AddText, AddWalletCardRoot, ContentRoot } from "./AddWalletCard.style";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useTheme } from "@peersyst/react-native-styled";

const AddWalletCard = (): JSX.Element => {
    const {
        state: { colorIndex },
    } = useCreateWallet();
    const {
        palette: { wallet: walletColors },
    } = useTheme();
    return (
        <AddWalletCardRoot style={colorIndex !== undefined ? { backgroundColor: walletColors[colorIndex] } : undefined}>
            <ContentRoot>
                <AddIcon />
                <AddText variant="h3">{translate("add_a_wallet")}</AddText>
            </ContentRoot>
        </AddWalletCardRoot>
    );
};

export default AddWalletCard;
