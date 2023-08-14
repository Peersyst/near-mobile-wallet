import ConnectedSite from "../../display/ConnectedSite/ConnectedSite";
import Actionable from "module/common/component/feedback/Actionable/Actionable";
import { ConnectedSiteProps } from "../../display/ConnectedSite/ConnectedSite.types";
import { useTranslate } from "module/common/hook/useTranslate";
import useCancelableDialog from "module/common/hook/useCancelableDialog";

export type ActionableConnectedSiteProps = Pick<ConnectedSiteProps, "site">;

const ActionableConnectedSite = ({ site }: ActionableConnectedSiteProps) => {
    const translate = useTranslate();

    const { showCancelableDialog } = useCancelableDialog();

    const handleAction = () => showCancelableDialog({ title: translate("disconnect"), buttons: [] });

    return (
        <Actionable onAction={handleAction} actionText={translate("disconnect")} actionProps={{ size: "sm", variant: "outlined" }} gap={12}>
            <ConnectedSite site={site} />
        </Actionable>
    );
};

export default ActionableConnectedSite;
