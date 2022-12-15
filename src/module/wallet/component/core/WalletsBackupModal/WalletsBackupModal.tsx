import { createModal, TabPanel, Tabs } from "@peersyst/react-native-components";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import WalletsBackupAdvise from "module/wallet/component/core/WalletsBackupModal/WalletsBackupAdvise/WalletsBackupAdvise";
import { useState } from "react";
import WalletMnemonicBackup from "module/wallet/component/core/WalletsBackupModal/WalletMnemonicBackup/WalletMnemonicBackup";
import ConfirmPinModal from "module/settings/components/core/ConfirmPinModal/ConfirmPinModal";
import { useTranslate } from "module/common/hook/useTranslate";
import { WalletBackupModalRoot } from "./WalletsBackupModal.styles";

const WalletsBackupModal = createModal((props): JSX.Element => {
    const translate = useTranslate();
    const [open, setOpen] = useState(true);
    const [showPin, setShowPin] = useState(false);
    const [index, setIndex] = useState(0);
    const [selectedWalletIndex, setSelectedWalletIndex] = useState<number>();

    const handleBackupMethodChange = () => {
        setTimeout(() => setShowPin(true), 400);
    };

    const handleWalletSelection = (walletIndex: number | undefined): void => {
        setSelectedWalletIndex(walletIndex);
        setTimeout(() => setShowPin(true), 400);
    };

    const handlePinConfirmed = (): void => {
        setIndex(1);
        setShowPin(false);
    };

    const handlePinClose = (): void => {
        setSelectedWalletIndex(-1);
        setShowPin(false);
    };

    return (
        <WalletBackupModalRoot
            navbar={{ title: translate("back_up_your_wallets"), back: index === 0 }}
            open={open}
            onClose={() => setOpen(false)}
            {...props}
        >
            <Tabs index={index} onIndexChange={setIndex} style={{ height: "100%", backgroundColor: "red" }}>
                <TabPanel index={0}>
                    <WalletsBackupAdvise onSubmit={handleBackupMethodChange} />
                </TabPanel>
                <TabPanel index={1}>
                    <WalletMnemonicBackup walletIndex={selectedWalletIndex!} onClose={() => setOpen(false)} />
                </TabPanel>
                <ConfirmPinModal open={showPin} onPinConfirmed={handlePinConfirmed} onClose={handlePinClose} />
            </Tabs>
        </WalletBackupModalRoot>
    );
});

export default WalletsBackupModal;
