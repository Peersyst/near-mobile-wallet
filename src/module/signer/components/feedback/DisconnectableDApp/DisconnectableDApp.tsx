import { useTranslate } from "module/common/hook/useTranslate";
import DApp from "../../display/DApp/DApp";
import { DisconnectableDAppProps } from "./DisconnectableDApp.types";
import useCancelableDialog from "module/common/hook/useCancelableDialog";
import { DisconnectableDAppRoot } from "./DisconnectableDApp.styles";
import useIsDAppConnected from "module/signer/queries/useIsDAppConnected";
import useDisconnectSmartContract from "module/signer/queries/useDisconnectSmartContract";

const DisconnectableDApp = ({ dapp }: DisconnectableDAppProps): JSX.Element => {
    const translate = useTranslate();

    const { data: connected, isLoading } = useIsDAppConnected(dapp.contractId);

    const { showCancelableDialog, hideCancelableDialog: hideDialog } = useCancelableDialog();
    const { mutate: disconnectSmartContract, isLoading: isDeleting } = useDisconnectSmartContract({ onSuccess: hideDialog });

    const handleDisconnect = () => {
        disconnectSmartContract(dapp.contractId);
    };

    const handleSwipeAction = () => {
        showCancelableDialog({
            title: translate("disconnect"),
            content: translate("confirmDisconnect"),
            buttons: [
                {
                    action: handleDisconnect,
                    text: translate("disconnect"),
                    type: "destructive",
                    disabled: isDeleting,
                    loading: isDeleting,
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
