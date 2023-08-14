import ConnectedSite from "../../display/ConnectedSite/ConnectedSite";
import Actionable from "module/common/component/feedback/Actionable/Actionable";
import { ConnectedSiteProps } from "../../display/ConnectedSite/ConnectedSite.types";
import { useTranslate } from "module/common/hook/useTranslate";

export type ActionableConnectedSiteProps = Pick<ConnectedSiteProps, "site">;

const ActionableConnectedSite = ({ site }: ActionableConnectedSiteProps) => {
    const translate = useTranslate();
    const [openDialog, setOpenDialog] = useState(false);

    // TODO: Implement handleAction with disconnecting site feature (next PR)
    const handleAction = () => undefined;

    return (
        <Actionable onAction={handleAction} actionText={translate("disconnect")} actionProps={{ size: "sm", variant: "outlined" }} gap={12}>
            <ConnectedSite site={site} />
            {openDialog && (
                <Dialog
                    content={
                        <Typography variant="body2Strong" textAlign="center" style={{ marginBottom: 24 }}>
                            Are your sure you want to remove access keys from Other site?
                        </Typography>
                    }
                    buttons={[
                        {
                            type: "destructive",
                            text: translate("disconnect"),
                            onPress: () => setOpenDialog(false),
                        },
                        {
                            variant: "text",
                            text: translate("cancel"),
                            onPress: () => setOpenDialog(false),
                        },
                    ]}
                />
            )}
        </Actionable>
    );
};

export default ActionableConnectedSite;
