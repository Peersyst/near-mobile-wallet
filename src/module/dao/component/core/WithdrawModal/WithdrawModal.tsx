import { createBackdrop, ExposedBackdropProps, TabPanel, Tabs } from "react-native-components";
import { translate } from "locale";
import { useState } from "react";
import GlassNavigatorModal from "module/common/component/navigation/GlassNavigatorModal/GlassNavigatorModal";
import useGetFee from "module/transaction/query/useGetFee";
import { useRecoilValue, useResetRecoilState } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import sendState from "module/transaction/state/SendState";
import SelectAccountAndDepositScreen from "module/dao/screen/SelectAccountAndDepositScreen/SelectAccountAndDepositScreen";
import WithdrawConfirmationScreen from "module/dao/screen/WithdrawConfirmationScreen/WithdrawConfirmationScreen";

export enum WithdrawScreens {
    SELECT_ACCOUNT,
    CONFIRMATION,
    __LENGTH,
}

export interface WithdrawForm {
    receiver: number;
    deposit: number;
}

export interface WithdrawSummary extends WithdrawForm {
    feeRate?: string;
}

const WithdrawModal = createBackdrop(({ onExited, ...rest }: ExposedBackdropProps) => {
    const [activeIndex, setActiveIndex] = useState(WithdrawScreens.SELECT_ACCOUNT);
    const { fee } = useRecoilValue(settingsState);
    const [withdrawInfo, setWithdrawInfo] = useState<WithdrawSummary>({ receiver: 0, deposit: 0 });
    const resetSendState = useResetRecoilState(sendState);

    const handleExited = () => {
        onExited?.();
        resetSendState();
    };
    useGetFee(fee);

    return (
        <GlassNavigatorModal
            breadcrumbs={{ length: WithdrawScreens.__LENGTH, index: activeIndex }}
            navbar={{
                back: true,
                title: translate("withdraw"),
                onBack: activeIndex > 0 ? () => setActiveIndex((oldIndex) => oldIndex - 1) : undefined,
            }}
            onExited={handleExited}
            {...rest}
        >
            <Tabs index={activeIndex} onIndexChange={setActiveIndex}>
                <TabPanel index={WithdrawScreens.SELECT_ACCOUNT}>
                    <SelectAccountAndDepositScreen setWithdrawInfo={setWithdrawInfo} />
                </TabPanel>
                <TabPanel index={WithdrawScreens.CONFIRMATION}>
                    <WithdrawConfirmationScreen withdrawInfo={withdrawInfo} />
                </TabPanel>
            </Tabs>
        </GlassNavigatorModal>
    );
});

export default WithdrawModal;
