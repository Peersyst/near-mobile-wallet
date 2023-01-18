import { BaseStakeModalRoot } from "module/staking/component/core/BaseStakeModal/BaseStakeModal.styles";
import { AddStakeScreens } from "module/staking/component/core/AddStakeModal/AddStakeModal";
import { UnstakeModalScreens } from "module/staking/component/core/UnstakeModal/UnstakeModal";
import { ReactElement, useState } from "react";
import { useTranslate } from "module/common/hook/useTranslate";
import { useResetRecoilState } from "recoil";
import stakeState from "module/staking/state/StakeState";
import { CardNavigatorModalProps } from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { TabPanel, Tabs } from "@peersyst/react-native-components";

export interface ModalTabs {
    title: string;
    tabIndex: AddStakeScreens | UnstakeModalScreens;
    tabContent: ReactElement;
}

interface BaseStakeModalProps extends Omit<CardNavigatorModalProps, "children"> {
    tabs: ModalTabs[];
    onExited?: () => void;
}

const StakeModal = ({ tabs, onExited, ...rest }: BaseStakeModalProps): JSX.Element => {
    const [activeIndex, setActiveIndex] = useState(tabs[0].tabIndex);
    const translate = useTranslate();

    const resetStakeState = useResetRecoilState(stakeState);

    const handleExited = () => {
        onExited?.();
        resetStakeState();
    };

    return (
        <BaseStakeModalRoot
            navbar={{
                back: true,
                title: translate(tabs[Number(activeIndex)].title)!,
                onBack: activeIndex > 0 ? () => setActiveIndex((oldIndex) => oldIndex - 1) : undefined,
                steps: {
                    length: tabs.length,
                    index: activeIndex,
                },
            }}
            onExited={handleExited}
            {...rest}
        >
            <Tabs index={activeIndex} onIndexChange={setActiveIndex}>
                {tabs.map(({ tabIndex, tabContent }) => (
                    <TabPanel key={tabIndex} index={tabIndex}>
                        {tabContent}
                    </TabPanel>
                ))}
            </Tabs>
        </BaseStakeModalRoot>
    );
};

export default StakeModal;
