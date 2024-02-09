import { createModal, TabPanel, Tabs } from "@peersyst/react-native-components";
import WalletsBackupAdvise from "module/wallet/component/core/WalletsBackupModal/WalletsBackupAdvise/WalletsBackupAdvise";
import { useState } from "react";
import WalletMnemonicBackup from "module/wallet/component/core/WalletsBackupModal/WalletMnemonicBackup/WalletMnemonicBackup";
import useTranslate from "module/common/hook/useTranslate";
import { WalletBackupModalRoot } from "./WalletsBackupModal.styles";
import { useRecoilValue } from "recoil";
import backupWalletState from "module/wallet/state/BackUpWalletState";
import WalletsBackupSelectAccount from "./WalletsBackupSelectAccount/WalletsBackupSelectAccount";
import WalletPrivateKeyBackup from "./WalletPrivateKeyBackup/WalletPrivateKeyBackup";

export enum WalletsBackupModalTabs {
    ADVISE,
    SELECT_WALLET,
    SHOW_MNEMONIC,
    SHOW_PRIVATE_KEY,
}

const WalletsBackupModal = createModal((props): JSX.Element => {
    const translate = useTranslate();
    const [open, setOpen] = useState(true);
    const [index, setIndex] = useState(0);
    const { method } = useRecoilValue(backupWalletState);

    const handleBackupMethodChange = () => {
        setIndex(method === "mnemonic" ? WalletsBackupModalTabs.SHOW_MNEMONIC : WalletsBackupModalTabs.SELECT_WALLET);
    };

    return (
        <WalletBackupModalRoot
            navbar={{ title: translate("back_up_your_accounts"), back: index < WalletsBackupModalTabs.SHOW_MNEMONIC }}
            open={open}
            onClose={() => setOpen(false)}
            {...props}
        >
            <Tabs index={index} onIndexChange={setIndex} style={{ height: "100%" }}>
                <TabPanel index={WalletsBackupModalTabs.ADVISE}>
                    <WalletsBackupAdvise onSubmit={handleBackupMethodChange} />
                </TabPanel>
                <TabPanel index={WalletsBackupModalTabs.SELECT_WALLET}>
                    <WalletsBackupSelectAccount onSubmit={() => setIndex(WalletsBackupModalTabs.SHOW_PRIVATE_KEY)} />
                </TabPanel>
                <TabPanel index={WalletsBackupModalTabs.SHOW_MNEMONIC}>
                    <WalletMnemonicBackup onClose={() => setOpen(false)} />
                </TabPanel>
                <TabPanel index={WalletsBackupModalTabs.SHOW_PRIVATE_KEY}>
                    <WalletPrivateKeyBackup onClose={() => setOpen(false)} />
                </TabPanel>
            </Tabs>
        </WalletBackupModalRoot>
    );
});

export default WalletsBackupModal;
