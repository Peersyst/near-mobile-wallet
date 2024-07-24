import { createModal, ExposedBackdropProps, TabPanel, Tabs } from "@peersyst/react-native-components";
import WalletsBackupAdvise from "module/wallet/component/core/WalletsBackupModal/WalletsBackupAdvise/WalletsBackupAdvise";
import { useState } from "react";
import WalletMnemonicBackup from "module/wallet/component/core/WalletsBackupModal/WalletMnemonicBackup/WalletMnemonicBackup";
import useTranslate from "module/common/hook/useTranslate";
import { useRecoilValue } from "recoil";
import backupWalletState from "module/wallet/state/BackUpWalletState";
import WalletsBackupSelectAccount from "./WalletsBackupSelectAccount/WalletsBackupSelectAccount";
import WalletPrivateKeyBackup from "./WalletPrivateKeyBackup/WalletPrivateKeyBackup";
import { useControlled } from "@peersyst/react-hooks";
import WalletQuizBackup from "./WalletQuizBackup/WalletQuizBackup";
import { useWindowDimensions } from "react-native";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";

export enum WalletsBackupModalTabs {
    ADVISE,
    SELECT_WALLET,
    QUIZ,
    SHOW_MNEMONIC,
    SHOW_PRIVATE_KEY,
}

export type WalletsBackupModalProps = ExposedBackdropProps;

const WalletsBackupModal = createModal(
    ({ open: openProp, defaultOpen, onClose: onCloseProp, ...props }: WalletsBackupModalProps): JSX.Element => {
        const translate = useTranslate();
        const [open, setOpen] = useControlled(defaultOpen, openProp, onCloseProp);
        const [index, setIndex] = useState(0);
        const { method } = useRecoilValue(backupWalletState);
        const { height } = useWindowDimensions();

        const handleBackupAdvise = () => {
            setIndex(WalletsBackupModalTabs.QUIZ);
        };

        const handleQuizBackup = () => {
            setIndex(method === "mnemonic" ? WalletsBackupModalTabs.SHOW_MNEMONIC : WalletsBackupModalTabs.SELECT_WALLET);
        };

        return (
            <CardNavigatorModal
                navbar={{ title: translate("back_up_your_accounts"), back: index < WalletsBackupModalTabs.SHOW_MNEMONIC }}
                open={open}
                onClose={() => setOpen(false)}
                {...props}
            >
                <Tabs
                    index={index}
                    onIndexChange={setIndex}
                    style={{ minHeight: index === WalletsBackupModalTabs.QUIZ ? height * 0.3 : height * 0.7 }}
                >
                    <TabPanel index={WalletsBackupModalTabs.ADVISE}>
                        <WalletsBackupAdvise onSubmit={handleBackupAdvise} />
                    </TabPanel>
                    <TabPanel index={WalletsBackupModalTabs.SELECT_WALLET}>
                        <WalletsBackupSelectAccount onSubmit={() => setIndex(WalletsBackupModalTabs.SHOW_PRIVATE_KEY)} />
                    </TabPanel>
                    <TabPanel index={WalletsBackupModalTabs.QUIZ}>
                        <WalletQuizBackup onClose={() => setOpen(false)} onSubmit={handleQuizBackup} />
                    </TabPanel>
                    <TabPanel index={WalletsBackupModalTabs.SHOW_MNEMONIC}>
                        <WalletMnemonicBackup onClose={() => setOpen(false)} />
                    </TabPanel>
                    <TabPanel index={WalletsBackupModalTabs.SHOW_PRIVATE_KEY}>
                        <WalletPrivateKeyBackup onClose={() => setOpen(false)} />
                    </TabPanel>
                </Tabs>
            </CardNavigatorModal>
        );
    },
);

export default WalletsBackupModal;
