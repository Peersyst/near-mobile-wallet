import ConnectedSite from "../../display/ConnectedSite/ConnectedSite";
import Actionable from "module/common/component/feedback/Actionable/Actionable";
import { ConnectedSiteProps } from "../../display/ConnectedSite/ConnectedSite.types";
import { useTranslate } from "module/common/hook/useTranslate";
import { Alert } from "react-native";

export type ActionableConnectedSiteProps = Pick<ConnectedSiteProps, "site">;

const ActionableConnectedSite = ({ site }: ActionableConnectedSiteProps) => {
    const translate = useTranslate();

    // TODO: Implement handleAction with disconnecting site feature (next PR)
    const handleAction = () => Alert.alert("ActionableConnectedSite", "handleAction");

    return (
        <Actionable onAction={handleAction} actionText={translate("disconnect")} actionProps={{ size: "sm", variant: "outlined" }} gap={12}>
            <ConnectedSite site={site} />
        </Actionable>
    );
};

export default ActionableConnectedSite;
