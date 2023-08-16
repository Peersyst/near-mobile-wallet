import { PagerView } from "@peersyst/react-native-components";
import { Action } from "../SignRequestDetails/actions.types";
import { ActionDetails } from "../SignRequestDetails/actions";

export interface ActionsSliderProps {
    actions: Action[];
}

const ActionsSlider = ({ actions }: ActionsSliderProps) => {
    const renderActionDetails = ({ type, params }: Action, index: number) => {
        const ActionComponent = ActionDetails[type];
        return <ActionComponent key={index} params={params} />;
    };

    return (
        <PagerView gap={0} showPageIndicator={actions.length > 1} style={{ flex: 1 }}>
            {actions.map((action, index) => renderActionDetails(action, index))}
        </PagerView>
    );
};

export default ActionsSlider;
