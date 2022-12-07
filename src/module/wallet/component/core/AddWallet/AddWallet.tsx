import { Col, Typography, useModal } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import CreateWalletModal from "module/wallet/component/core/CreateWalletModal/CreateWalletModal";
import Divider from "module/common/component/display/Divider/Divider";
import ImportWalletModal from "../ImportWalletModal/ImportWalletModal";
import { useTranslate } from "module/common/hook/useTranslate";

const AddWallet = (): JSX.Element => {
    const translate = useTranslate();

    const { showModal } = useModal();

    return (
        <Col flex={1} gap="14%" style={{ paddingHorizontal: "5%" }}>
            <Col gap="4%">
                <Button fullWidth variant="outlined" onPress={() => showModal(CreateWalletModal)}>
                    {translate("create_a_wallet")}
                </Button>
                <Divider width="full-width">
                    <Typography variant="body3Regular" light textTransform="uppercase">
                        {translate("or")}
                    </Typography>
                </Divider>
                <Button fullWidth variant="outlined" onPress={() => showModal(ImportWalletModal)}>
                    {translate("import_a_wallet")}
                </Button>
            </Col>
        </Col>
    );
};

export default AddWallet;
