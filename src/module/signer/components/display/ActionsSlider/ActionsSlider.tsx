import { PagerView } from "@peersyst/react-native-components";
import { Action } from "../SignRequestDetails/actions.types";
import { ActionDetails } from "../SignRequestDetails/actions";
import { DAppMetadataDto } from "module/api/service";

export interface ActionsSliderProps {
    actions: Action[];
    receiverId?: string;
    metadata?: DAppMetadataDto;
}

const ActionsSlider = ({ actions, ...rest }: ActionsSliderProps) => {
    return (
        <PagerView gap={0} showPageIndicator={actions.length > 1} style={{ flex: 1 }}>
            {actions.map(({ type, params }, index) => {
                const ActionComponent = ActionDetails[type];
                return <ActionComponent key={index} params={params} {...rest} />;
            })}
        </PagerView>
    );
};

export default ActionsSlider;
