import { BaseStakeModalRoot } from "module/staking/component/core/BaseStakeModal/BaseStakeModal.styles";
import { AddStakeScreens } from "module/staking/component/core/AddStakeModal/AddStakeModal";
import { UnstakeModalScreens } from "module/staking/component/core/UnstakeModal/UnstakeModal";
import { ReactElement, useState } from "react";
import { useTranslate } from "module/common/hook/useTranslate";
import { useResetRecoilState } from "recoil";
import stakeState from "module/staking/state/StakeState";
import { CardNavigatorModalProps } from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { TabPanel, Tabs } from "@peersyst/react-native-components";
import { TransaltionResourceType } from "locale";

export interface ModalSteps {
    title: TransaltionResourceType;
    tabId: AddStakeScreens | UnstakeModalScreens;
    tabContent: ReactElement;
}

interface BaseStakeModalProps extends Omit<CardNavigatorModalProps, "children"> {
    modalSteps: ModalSteps[];
    onExited?: () => void;
}

const BaseStakeModal = ({ modalSteps, onExited, ...rest }: BaseStakeModalProps): JSX.Element => {
    const [activeIndex, setActiveIndex] = useState(modalSteps[0].tabId);
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
                title: translate(modalSteps[Number(activeIndex)].title)!,
                onBack: activeIndex > 0 ? () => setActiveIndex((oldIndex) => oldIndex - 1) : undefined,
                steps: {
                    length: modalSteps.length,
                    index: activeIndex,
                },
            }}
            onExited={handleExited}
            {...rest}
        >
            <Tabs index={activeIndex} onIndexChange={setActiveIndex}>
                {modalSteps.map(({ tabId, tabContent }) => (
                    <TabPanel key={tabId} index={tabId}>
                        {tabContent}
                    </TabPanel>
                ))}
            </Tabs>
        </BaseStakeModalRoot>
    );
};

export default BaseStakeModal;
