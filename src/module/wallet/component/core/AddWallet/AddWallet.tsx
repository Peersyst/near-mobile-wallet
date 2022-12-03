import { Col, Typography } from "@peersyst/react-native-components";
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
            <Col gap="2%">
                <Typography variant="body3Strong" textAlign="center">
                    {translate(hasWallet ? "how_to_add_an_account" : "welcome_to_near_mobile")}
                </Typography>
                <Typography variant="body3Regular" textAlign="center">
                    {translate("add_a_wallet_txt")}
                </Typography>
            </Col>
        </Col>
    );
};

export default AddWallet;
