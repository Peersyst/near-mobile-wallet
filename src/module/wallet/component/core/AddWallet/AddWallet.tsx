import { Col } from "@peersyst/react-native-components";
import Advise from "module/common/component/display/Advise/Advise";
import { useTranslate } from "module/common/hook/useTranslate";
import useWalletState from "module/wallet/hook/useWalletState";
import { DialogIcon } from "./DialogIcon/DialogIcon";

const AddWallet = (): JSX.Element => {
    const translate = useTranslate();
    const {
        state: { hasWallet },
    } = useWalletState();
    return (
        <Col flex={1} alignItems="center" style={{ padding: "10%" }} gap="7%">
            <DialogIcon />
            <Advise
                gap={"2%"}
                title={translate(hasWallet ? "how_to_add_an_account" : "welcome_to_near_mobile")}
                text={translate("add_a_wallet_txt")}
            />
        </Col>
    );
};

export default AddWallet;
