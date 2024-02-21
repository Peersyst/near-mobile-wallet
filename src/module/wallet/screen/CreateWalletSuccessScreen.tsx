import { useEffect } from "react";
import { useResetRecoilState } from "recoil";
import { defaultSettingsState } from "module/settings/state/SettingsState";
import createWalletState from "module/wallet/state/CreateWalletState";
import useImportWallets from "../hook/useImportWallets";
import { InteractionManager } from "react-native";
import { Col, Spinner } from "@peersyst/react-native-components";
import ControllerFactory from "refactor/ui/adapter/ControllerFactory";
import useCreateWallet from "../hook/useCreateWallet";

const CreateWalletSuccessScreen = (): JSX.Element => {
    const resetCreateWalletState = useResetRecoilState(createWalletState);
    const importWallets = useImportWallets();
    const {
        state: { mnemonic, pin },
    } = useCreateWallet();

    useEffect(() => {
        const setStorage = async () => {
            await importWallets(defaultSettingsState.network);
            if (mnemonic && pin) {
                // <<< refactor
                await ControllerFactory.authController.signUp(mnemonic, pin);
                // refactor >>>
            }
            //After all clean createWalletState
            resetCreateWalletState();
        };
        setTimeout(() => {
            InteractionManager.runAfterInteractions(() => {
                setStorage();
            });
        }, 500);
    }, []);

    return (
        <Col flex={1} alignItems="center" justifyContent="center" gap="5%">
            <Spinner size="large" color="white" />
        </Col>
    );
};

export default CreateWalletSuccessScreen;
