import { AddIcon, AddText, AddWalletCardRoot, ContentRoot } from "./AddWalletCard.style";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useTheme } from "@peersyst/react-native-styled";
import { useTranslate } from "module/common/hook/useTranslate";

const AddWalletCard = (): JSX.Element => {
    const translate = useTranslate();
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
                <AddText variant="h4Regular">{translate("add_a_wallet")}</AddText>
            </ContentRoot>
        </AddWalletCardRoot>
    );
};

export default AddWalletCard;
