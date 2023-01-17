import { TabPanel, Tabs } from "@peersyst/react-native-components";
import { useState } from "react";
import { useResetRecoilState } from "recoil";
import { CardNavigatorModalProps } from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { MainTabItemType } from "module/main/component/navigation/MainTabs/MainTabs.types";
import { StakeModalRoot } from "./StakeModal.styles";
import stakeState from "module/staking/state/StakeState";

export enum SendScreens {
    SET_AMOUNT,
}

export interface StakeModalProps extends Omit<CardNavigatorModalProps, "navbar" | "children"> {
    tabs: MainTabItemType[];
    onBack?: () => void;
}

const StakeModal = ({ onExited, tabs, onBack, ...rest }: StakeModalProps) => {
    const [activeIndex, setActiveIndex] = useState(SendScreens.SET_AMOUNT);
    const resetSendState = useResetRecoilState(stakeState);

    const handleExited = () => {
        onExited?.();
        resetSendState();
    };

    const handleOnBack = () => {
        setActiveIndex((oldIndex) => oldIndex - 1);
        onBack?.();
    };

    return (
        <StakeModalRoot
            navbar={{
                back: true,
                title: tabs[activeIndex].title,
                onBack: activeIndex > 0 ? handleOnBack : undefined,
                steps: {
                    length: 4,
                    index: activeIndex,
                },
            }}
            onExited={handleExited}
            {...rest}
        >
            <Tabs gap={0} index={activeIndex} onIndexChange={setActiveIndex} style={{ flex: 1 }}>
                <>
                    {tabs.map(({ item }, index) => {
                        return (
                            <TabPanel key={index} index={index}>
                                {item}
                            </TabPanel>
                        );
                    })}
                </>
            </Tabs>
        </StakeModalRoot>
    );
};

export default StakeModal;
