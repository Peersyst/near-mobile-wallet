import AnimatedActionable from "module/common/component/feedback/AnimatedActionable/AnimatedActionable";
import { useTranslate } from "module/common/hook/useTranslate";
import DApp from "../../display/DApp/DApp";
import { DisconnectableDAppProps } from "./DisconnectableDApp.types";
import useCancelableDialog from "module/common/hook/useCancelableDialog";
import useDisconnectableDAppProps from "./hooks/useDisconnectableDAppStyles";
import { Alert } from "react-native";

const DisconnectableDApp = ({ dapp }: DisconnectableDAppProps): JSX.Element => {
    const translate = useTranslate();
    const { actionableProps, swipeActionProps } = useDisconnectableDAppProps();

    // TODO: When smart contracts loaded, check if dApp is connected
    const dAppConnected = true;

    const { showCancelableDialog } = useCancelableDialog();

    const handleSwipeAction = () => {
        showCancelableDialog({
            title: translate("disconnect"),
            buttons: [
                {
                    action: () => Alert.alert("Should remove access keys from dApp's contract"),
                    text: translate("disconnect"),
                    type: "destructive",
                },
            ],
        });
    };

    return (
        <AnimatedActionable
            onSwipedAction={handleSwipeAction}
            swipedAction={translate("disconnect")}
            swipedActionProps={swipeActionProps}
            enabled={dAppConnected}
            {...actionableProps}
        >
            <DApp dapp={dapp} connected={dAppConnected} />
        </AnimatedActionable>
    );
};

export default DisconnectableDApp;
