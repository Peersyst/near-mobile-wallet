import ConnectedSite from "../../display/ConnectedSite/ConnectedSite";
import Actionable from "module/common/component/feedback/Actionable/Actionable";
import { ConnectedSiteProps } from "../../display/ConnectedSite/ConnectedSite.types";
import { useTranslate } from "module/common/hook/useTranslate";
import { useState } from "react";
import { Dialog, useToast } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import useDeleteKey from "module/wallet/query/useDeleteKey";

export type ActionableConnectedSiteProps = Pick<ConnectedSiteProps, "site">;

const ActionableConnectedSite = ({ site }: ActionableConnectedSiteProps) => {
    const translate = useTranslate();
    const [openDialog, setOpenDialog] = useState(false);

    const { showToast } = useToast();

    const handleAction = () => setOpenDialog(true);
    const closeDialog = () => setOpenDialog(false);

    const handleSuccess = () => {
        showToast(translate("disconnectSuccessfully"), { type: "success" });
        closeDialog();
    };

    const { mutate: deleteSite, isLoading } = useDeleteKey({ onSuccess: handleSuccess });

    return (
        <Actionable onAction={handleAction} actionText={translate("disconnect")} actionProps={{ size: "sm", variant: "outlined" }} gap={12}>
            <ConnectedSite site={site} />
            {openDialog && (
                <Dialog
                    content={
                        <Typography variant="body2Strong" textAlign="center" style={{ marginBottom: 24 }}>
                            {translate("deleteKeyConfirmation", { name: site.name })}
                        </Typography>
                    }
                    onExited={closeDialog}
                    buttons={[
                        {
                            type: "destructive",
                            text: translate("disconnect"),
                            action: () => deleteSite(site.publicKey),
                            loading: isLoading,
                        },
                        {
                            variant: "text",
                            text: translate("cancel"),
                        },
                    ]}
                />
            )}
        </Actionable>
    );
};

export default ActionableConnectedSite;
