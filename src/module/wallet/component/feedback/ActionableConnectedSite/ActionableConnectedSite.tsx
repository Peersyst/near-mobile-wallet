import ConnectedSite from "../../display/ConnectedSite/ConnectedSite";
import Actionable from "module/common/component/feedback/Actionable/Actionable";
import { ConnectedSiteProps } from "../../display/ConnectedSite/ConnectedSite.types";
import { useState } from "react";
import { ChevronRightIcon } from "icons";
import DisconnectSiteModal from "../DisconnectSiteModal/DisconnectSiteModal";

export type ActionableConnectedSiteProps = Pick<ConnectedSiteProps, "site">;

const ActionableConnectedSite = ({ site }: ActionableConnectedSiteProps) => {
    const [openDisconnectModal, setOpenDisconnectModal] = useState(false);

    const handleAction = () => setOpenDisconnectModal(true);
    const closeDisconnectModal = () => setOpenDisconnectModal(false);

    return (
        <Actionable action={<ChevronRightIcon />} onAction={handleAction} gap={12}>
            <ConnectedSite site={site} />
            <DisconnectSiteModal site={site} open={openDisconnectModal} onClose={closeDisconnectModal} />
        </Actionable>
    );
};

export default ActionableConnectedSite;
