import { createModal, ExposedBackdropProps } from "@peersyst/react-native-components";
import SelectValidatorScreen from "module/staking/screen/SelectValidatorScreen/SelectValidatorScreen";
import StakeModal, { ModalTabs } from "module/staking/component/core/BaseStakeModal/BaseStakeModal";
import { useTranslate } from "module/common/hook/useTranslate";

export enum UnstakeModalScreens {
    SELECT_VALIDATOR,
}

const UnstakeModal = createModal(({ ...rest }: ExposedBackdropProps): JSX.Element => {
    const translate = useTranslate();

    const unstakeModalSteps: ModalTabs[] = [
        {
            title: translate("select_validator"),
            tabIndex: UnstakeModalScreens.SELECT_VALIDATOR,
            tabContent: <SelectValidatorScreen />,
        },
    ];

    return <StakeModal tabs={unstakeModalSteps} {...rest} />;
});

export default UnstakeModal;
