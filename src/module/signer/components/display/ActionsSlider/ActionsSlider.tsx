import { Action } from "../SignRequestDetails/actions.types";
import { ActionDetails } from "../SignRequestDetails/actions";
import { DAppMetadataDto } from "module/api/service";
import { ActionsSliderRoot } from "./ActionsSlider.styles";

export interface ActionsSliderProps {
    actions: Action[];
    signerId?: string;
    receiverId?: string;
    metadata?: DAppMetadataDto;
}

const ActionsSlider = ({ actions, ...rest }: ActionsSliderProps) => {
    return (
        <ActionsSliderRoot gap={0} showPageIndicator={actions.length > 1} style={{ flex: 1 }}>
            {actions.map(({ type, params }, index) => {
                const ActionComponent = ActionDetails[type];
                return <ActionComponent key={index} params={params} {...rest} />;
            })}
        </ActionsSliderRoot>
    );
};

export default ActionsSlider;
