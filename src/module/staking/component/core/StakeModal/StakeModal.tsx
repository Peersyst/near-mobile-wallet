import { TabPanel, Tabs } from "@peersyst/react-native-components";
import { ReactElement, useState } from "react";
import { useResetRecoilState } from "recoil";
import { CardNavigatorModalProps } from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { StakeModalRoot } from "./StakeModal.styles";
import stakeState from "module/staking/state/StakeState";
import { UnstakeModalScreens } from "module/staking/component/core/UnstakeModal/UnstakeModal";
import { WithdrawModalScreens } from "../WithdrawModal/WithdrawModal.types";
import { AddStakeScreens } from "../AddStakeModal/AddStakeModal.types";

export interface ModalTabs {
    title: string;
    tabIndex: AddStakeScreens | UnstakeModalScreens | WithdrawModalScreens;
    tabContent: ReactElement;
}

export interface StakeModalProps extends Omit<CardNavigatorModalProps, "navbar" | "children"> {
    tabs: ModalTabs[];
    onBack?: () => void;
}

const StakeModal = ({ onExited, tabs, onBack, ...rest }: StakeModalProps) => {
    const [activeIndex, setActiveIndex] = useState(tabs[0].tabIndex);
    const resetStakeState = useResetRecoilState(stakeState);

    const handleExited = () => {
        onExited?.();
        resetStakeState();
    };

    const handleOnBack = () => {
        setActiveIndex((oldIndex) => oldIndex - 1);
        onBack?.();
    };

    return (
        <StakeModalRoot
            navbar={{
                back: activeIndex !== tabs.length - 1,
                title: tabs[activeIndex].title.toUpperCase(),
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
