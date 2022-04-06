import { createBackdrop, ExposedBackdropProps, TabPanel, Tabs } from "react-native-components";
import { translate } from "locale";
import { useState } from "react";
import GlassNavigatorModal from "module/common/component/navigation/GlassNavigatorModal/GlassNavigatorModal";
import useGetFee from "module/transaction/query/useGetFee";
import { useRecoilValue, useResetRecoilState } from "recoil";
import settingsState from "module/settings/state/SettingsState";
import sendState from "module/transaction/state/SendState";
import DepositConfirmationScreen from "module/dao/screen/DepositConfirmationScreen/DepositConfirmationScreen";
import WithdrawSelectAccountScreen from "module/dao/screen/WithdrawSelectAccountScreen/WithdrawSelectAccountScreen";

export enum WithdrawScreens {
    SELECT_ACCOUNT,
    CONFIRMATION,
    __LENGTH
}

const WithdrawModal = createBackdrop(({ onExited, ...rest }: ExposedBackdropProps) => {
    const [activeIndex, setActiveIndex] = useState(WithdrawScreens.SELECT_ACCOUNT);
    const { fee } = useRecoilValue(settingsState);
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
                    <WithdrawSelectAccountScreen />
                </TabPanel>
                <TabPanel index={WithdrawScreens.CONFIRMATION}>
                    <DepositConfirmationScreen />
                </TabPanel>
            </Tabs>
        </GlassNavigatorModal>
    );
});

export default WithdrawModal