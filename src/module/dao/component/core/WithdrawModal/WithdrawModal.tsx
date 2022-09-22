import { createBackdrop, ExposedBackdropProps, TabPanel, Tabs } from "@peersyst/react-native-components";
import { translate } from "locale";
import { useState } from "react";
import MainNavigatorModal from "module/common/component/navigation/MainNavigatorModal/MainNavigatorModal";
import SelectAccountAndDepositScreen from "module/dao/screen/SelectAccountAndDepositScreen/SelectAccountAndDepositScreen";
import WithdrawConfirmationScreen from "module/dao/screen/WithdrawConfirmationScreen/WithdrawConfirmationScreen";
import { FeeRate } from "ckb-peersyst-sdk";

export enum WithdrawScreens {
    SELECT_ACCOUNT,
    CONFIRMATION,
    __LENGTH,
}

export interface WithdrawForm {
    receiverIndex: number;
    depositIndex: number;
}

export interface WithdrawSummary extends WithdrawForm {
    feeRate?: FeeRate;
}

const WithdrawModal = createBackdrop((props: ExposedBackdropProps) => {
    const [activeIndex, setActiveIndex] = useState(WithdrawScreens.SELECT_ACCOUNT);
    const [withdrawInfo, setWithdrawInfo] = useState<WithdrawSummary>({ receiverIndex: 0, depositIndex: 0 });

    return (
        <MainNavigatorModal
            breadcrumbs={{ length: WithdrawScreens.__LENGTH, index: activeIndex }}
            navbar={{
                back: true,
                title: translate("withdraw"),
                onBack: activeIndex > 0 ? () => setActiveIndex((oldIndex) => oldIndex - 1) : undefined,
            }}
            {...props}
        >
            <Tabs index={activeIndex} onIndexChange={setActiveIndex}>
                <TabPanel index={WithdrawScreens.SELECT_ACCOUNT}>
                    <SelectAccountAndDepositScreen setWithdrawInfo={setWithdrawInfo} />
                </TabPanel>
                <TabPanel index={WithdrawScreens.CONFIRMATION}>
                    <WithdrawConfirmationScreen withdrawInfo={withdrawInfo} />
                </TabPanel>
            </Tabs>
        </MainNavigatorModal>
    );
});

export default WithdrawModal;
