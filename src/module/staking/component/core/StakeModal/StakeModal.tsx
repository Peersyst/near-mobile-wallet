import { TabPanel, Tabs } from "@peersyst/react-native-components";
import { ReactElement, useState } from "react";
import { useResetRecoilState } from "recoil";
import { CardNavigatorModalProps } from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { StakeModalRoot } from "./StakeModal.styles";
import stakeState from "module/staking/state/StakeState";
import { AddStakeScreens } from "../AddStakeModal/AddStakeModal";

export interface ModalTabs {
    title: string;
    tabIndex: AddStakeScreens;
    tabContent: ReactElement;
}

export interface StakeModalProps extends Omit<CardNavigatorModalProps, "navbar" | "children"> {
    tabs: ModalTabs[];
    onBack?: () => void;
}

const StakeModal = ({ onExited, tabs, onBack, ...rest }: StakeModalProps) => {
    const [activeIndex, setActiveIndex] = useState(tabs[0].tabIndex);
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
                    length: tabs.length,
                    index: activeIndex,
                },
            }}
            onExited={handleExited}
            {...rest}
        >
            <Tabs gap={0} index={activeIndex} onIndexChange={setActiveIndex} style={{ flex: 1 }}>
                {tabs.map(({ tabIndex, tabContent }) => (
                    <TabPanel key={tabIndex} index={tabIndex}>
                        {tabContent}
                    </TabPanel>
                ))}
            </Tabs>
        </StakeModalRoot>
    );
};

export default StakeModal;
