import { createBackdrop, ExposedBackdropProps, TabPanel, Tabs } from "react-native-components";
import { translate } from "locale";
import { useState } from "react";
import GlassNavigatorModal from "module/common/component/navigation/GlassNavigatorModal/GlassNavigatorModal";
import useGetFee from "module/transaction/query/useGetFee";
import { useRecoilValue } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import SelectAccountAndDepositScreen from "module/dao/screen/SelectAccountAndDepositScreen/SelectAccountAndDepositScreen";
import WithdrawConfirmationScreen from "module/dao/screen/WithdrawConfirmationScreen/WithdrawConfirmationScreen";

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
    feeRate?: string;
}

const WithdrawModal = createBackdrop((props: ExposedBackdropProps) => {
    const [activeIndex, setActiveIndex] = useState(WithdrawScreens.SELECT_ACCOUNT);
    const { fee } = useRecoilValue(settingsState);
    const [withdrawInfo, setWithdrawInfo] = useState<WithdrawSummary>({ receiverIndex: 0, depositIndex: 0 });
    useGetFee(fee);

    return (
        <GlassNavigatorModal
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
        </GlassNavigatorModal>
    );
});

export default WithdrawModal;
