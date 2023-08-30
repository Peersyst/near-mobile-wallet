import { useTranslate } from "module/common/hook/useTranslate";
import DApp from "../../display/DApp/DApp";
import { DisconnectableDAppProps } from "./DisconnectableDApp.types";
import useCancelableDialog from "module/common/hook/useCancelableDialog";
import { Alert } from "react-native";
import { DisconnectableDAppRoot } from "./DisconnectableDApp.styles";

const DisconnectableDApp = ({ dapp }: DisconnectableDAppProps): JSX.Element => {
    const translate = useTranslate();

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
        <DisconnectableDAppRoot onSwipedRightAction={handleSwipeAction} swipedRightAction={translate("disconnect")} enabled={dAppConnected}>
            <DApp dapp={dapp} connected={dAppConnected} />
        </DisconnectableDAppRoot>
    );
};

export default DisconnectableDApp;
