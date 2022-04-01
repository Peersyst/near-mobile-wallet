import { useEffect } from "react";
import { Col, Typography, useModal } from "react-native-components";
import Button from "module/common/component/input/Button/Button";
import CreateWalletModal from "module/wallet/component/core/CreateWalletModal/CreateWalletModal";
import ColorPicker from "../../input/ColorPicker/ColorPicker";
import { useTheme } from "@peersyst/react-native-styled";
import useCreateWallet from "module/wallet/hook/useCreateWallet";
import { useResetRecoilState } from "recoil";
import createWalletState from "module/wallet/state/CreateWalletState";
import Divider from "module/common/component/display/Divider/Divider";
import { translate } from "locale";

const AddWallet = (): JSX.Element => {
    const { palette } = useTheme();
    const {
        setColorIndex,
        state: { colorIndex },
    } = useCreateWallet();
    const resetCreateWallet = useResetRecoilState(createWalletState);
    const { showModal } = useModal();

    useEffect(() => {
        setColorIndex(Math.floor(Math.random() * -6 + 7));
        return () => {
            resetCreateWallet();
        };
    }, []);

    const handleColorPick = (pickedColor: string) => {
        setColorIndex(palette.wallet.findIndex((c) => c === pickedColor));
    };

    return (
        <Col flex={1} gap="18%" style={{ paddingHorizontal: "5%" }}>
            <ColorPicker value={colorIndex !== undefined ? palette.wallet[colorIndex] : undefined} onColorPicked={handleColorPick} />
            <Col gap="4%">
                <Button fullWidth variant="outlined" disabled={colorIndex === undefined} onPress={() => showModal(CreateWalletModal)}>
                    {translate("create_a_wallet")}
                </Button>
                <Divider width="full-width">
                    <Typography variant="body1" light textTransform="uppercase">
                        {translate("or")}
                    </Typography>
                </Divider>
                <Button fullWidth variant="outlined" disabled={colorIndex === undefined}>
                    {translate("import_a_wallet")}
                </Button>
            </Col>
        </Col>
    );
};

export default AddWallet;
