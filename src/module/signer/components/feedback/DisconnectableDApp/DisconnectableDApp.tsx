import { useTranslate } from "module/common/hook/useTranslate";
import DApp from "../../display/DApp/DApp";
import { DisconnectableDAppProps } from "./DisconnectableDApp.types";
import { DisconnectableDAppRoot } from "./DisconnectableDApp.styles";
import useIsDAppConnected from "module/signer/queries/useIsDAppConnected";
import useDisconnectSmartContract from "module/signer/queries/useDisconnectSmartContract";
import useDisconnectDAppDialog from "./hooks/useDisconnectDAppDialog";

const DisconnectableDApp = ({ dapp }: DisconnectableDAppProps): JSX.Element => {
    const translate = useTranslate();

    const { data: connected, isLoading } = useIsDAppConnected(dapp.contractId);
    const { mutate: disconnectSmartContract, isLoading: isDeleting } = useDisconnectSmartContract();

    const handleDisconnect = () => {
        disconnectSmartContract(dapp.contractId, { onSuccess: hideDialog });
    };

    const { showDialog, hideDialog, dialog } = useDisconnectDAppDialog({ onDisconnect: handleDisconnect, disconnecting: isDeleting });

    return (
        <DisconnectableDAppRoot onSwipedRightAction={showDialog} swipedRightAction={translate("disconnect")} enabled={connected}>
            <DApp dapp={dapp} connected={connected} loading={isLoading} />
            {dialog}
        </DisconnectableDAppRoot>
    );
};

export default DisconnectableDApp;
