import settingsState, { NetworkType } from "module/settings/state/SettingsState";
import { useRecoilValue } from "recoil";
import { SelectOption, useConfig } from "@peersyst/react-native-components";
import useTranslate from "module/common/hook/useTranslate";
import SettingsSelect from "../../input/SettingsSelect/SettingsSelect";
import { Chains } from "near-peersyst-sdk";
import useChangeNetworkModal from "../../../../wallet/hook/useChangeNetwork";
import LoadingModal from "module/common/component/feedback/LoadingModal/LoadingModal";
import { useState } from "react";
import useWalletState from "module/wallet/hook/useWalletState";
import { useControlled } from "@peersyst/react-hooks";
import { SelectNetworkProps } from "./SelectNetwork.types";

const SelectNetwork = ({ onClose, open, disabled, ...rest }: SelectNetworkProps): JSX.Element => {
    const translate = useTranslate();
    const {
        state: { loading },
    } = useWalletState();
    const { reset, isSuccess, changeNetwork } = useChangeNetworkModal();
    const [openLoading, setOpenLoading] = useState(false);
    const [openSelect, setOpenSelect] = useControlled(false, open, onClose);

    let hasSelected = false;

    const networkOptions: SelectOption<NetworkType>[] = [
        {
            label: translate("network_name", { name: "Mainnet" }),
            value: Chains.MAINNET,
        },
        {
            label: translate("network_name", { name: "Testnet" }),
            value: Chains.TESTNET,
        },
    ];
    const settings = useRecoilValue(settingsState);

    const enableChangeNetwork = useConfig("enableChangeNetwork");

    const handleSelectNetwork = (network: NetworkType) => {
        changeNetwork(network);
        hasSelected = true;
    };

    const handleCloseSelect = () => {
        setOpenSelect(false);
        setTimeout(() => {
            if (hasSelected) setOpenLoading(true);
        }, 400);
    };

    const handleLoadingModalClose = () => {
        setOpenLoading(false);
        reset();
        hasSelected = false;
    };

    return (
        <>
            <SettingsSelect
                disabled={!enableChangeNetwork || loading || disabled}
                options={networkOptions}
                value={settings.network}
                label={translate("select_your_network")}
                onChange={handleSelectNetwork}
                onClose={handleCloseSelect}
                onOpen={() => setOpenSelect(true)}
                open={openSelect}
                {...rest}
            />
            <LoadingModal
                processingMessage={translate("recovering_accounts")}
                loading={openLoading}
                success={isSuccess}
                successMessage={translate("network_changed")}
                onClose={handleLoadingModalClose}
            />
        </>
    );
};

export default SelectNetwork;
