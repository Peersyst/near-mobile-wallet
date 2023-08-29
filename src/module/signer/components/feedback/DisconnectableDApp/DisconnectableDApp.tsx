import { useTranslate } from "module/common/hook/useTranslate";
import DApp from "../../display/DApp/DApp";
import { DisconnectableDAppProps } from "./DisconnectableDApp.types";
import useCancelableDialog from "module/common/hook/useCancelableDialog";
import { Alert } from "react-native";
import { DisconnectableDAppRoot } from "./DisconnectableDApp.styles";
import useIsDAppConnected from "module/signer/queries/useIsDAppConnected";

const DisconnectableDApp = ({ dapp }: DisconnectableDAppProps): JSX.Element => {
    const translate = useTranslate();

    // TODO: When smart contracts loaded, check if dApp is connected
    const { data: connected, isLoading } = useIsDAppConnected(dapp.contractId);

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
        <DisconnectableDAppRoot onSwipedRightAction={handleSwipeAction} swipedRightAction={translate("disconnect")} enabled={connected}>
            <DApp dapp={dapp} connected={connected} loading={isLoading} />
        </DisconnectableDAppRoot>
    );
};

export default DisconnectableDApp;
