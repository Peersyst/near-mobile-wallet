import { Col, ExposedBackdropProps, createModal } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import ActionableConnectedSitesList from "../ConnectedSitesList/ConnectedSitesList";
import useGetConnectedSites from "module/signer/queries/useGetConnectedSites";
import CardNavigatorModal from "module/common/component/navigation/CardNavigatorModal/CardNavigatorModal";
import { useControlled } from "@peersyst/react-hooks";

const ConnectedSitesModal = createModal(({ defaultOpen, open: openProp, onClose, ...props }: ExposedBackdropProps): JSX.Element => {
    const translate = useTranslate();
    const [open, setOpen] = useControlled(defaultOpen, openProp, onClose);

    const { sites, isLoading, refetch } = useGetConnectedSites();

    return (
        <CardNavigatorModal
            open={open}
            navbar={{ title: translate("connectedSites").toUpperCase(), back: true, onBack: () => setOpen(false) }}
            style={{ height: "60%" }}
            {...props}
        >
            <Col flex={1}>
                <Col style={{ position: "absolute", height: "100%", width: "100%" }}>
                    <ActionableConnectedSitesList sites={sites} loading={isLoading} onRefresh={refetch} />
                </Col>
            </Col>
        </CardNavigatorModal>
    );
});

export default ConnectedSitesModal;
