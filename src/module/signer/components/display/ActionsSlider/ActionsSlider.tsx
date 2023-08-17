import { PagerView } from "@peersyst/react-native-components";
import { Action } from "../SignRequestDetails/actions.types";
import { ActionDetails } from "../SignRequestDetails/actions";

export interface ActionsSliderProps {
    actions: Action[];
}

const ActionsSlider = ({ actions }: ActionsSliderProps) => {
    return (
        <PagerView gap={0} showPageIndicator={actions.length > 1} style={{ flex: 1 }}>
            {actions.map(({ type, params }, index) => {
                const ActionComponent = ActionDetails[type];
                return <ActionComponent key={index} params={params} />;
            })}
        </PagerView>
    );
};

export default ActionsSlider;
