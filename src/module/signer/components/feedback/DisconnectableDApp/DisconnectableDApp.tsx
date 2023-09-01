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

    const { mutate: disconnectSmartContract, isLoading: isDeleting } = useDisconnectSmartContract();

    const { showCancelableDialog, hideCancelableDialog: hideDialog } = useCancelableDialog();

    const handleDisconnect = () => {
        disconnectSmartContract(dapp.contractId);
        hideDialog();
    };

    const handleSwipeAction = () => {
        showCancelableDialog({
            title: translate("disconnect"),
            buttons: [
                {
                    action: handleDisconnect,
                    text: translate("disconnect"),
                    type: "destructive",
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
