import { Col, createModal } from "@peersyst/react-native-components";
import CardSelectModal from "module/common/component/feedback/CardSelectModal/CardSelectModal";
import { useTranslate } from "module/common/hook/useTranslate";
import ActionableConnectedSitesList from "../ConnectedSitesList/ConnectedSitesList";
import useGetConnectedSites from "module/wallet/query/useGetConnectedSites";

const ConnectedSitesModal = createModal((props): JSX.Element => {
    const translate = useTranslate();

    const { sites, isLoading, refetch } = useGetConnectedSites();

    return (
        <CardSelectModal title={translate("connectedSites").toUpperCase()} dismissal="hide" {...props} style={{ height: "60%" }}>
            <Col flex={1}>
                <Col style={{ position: "absolute", height: "100%", width: "100%" }}>
                    <ActionableConnectedSitesList sites={sites} loading={isLoading} onRefresh={refetch} />
                </Col>
            </Col>
        </CardSelectModal>
    );
});

export default ConnectedSitesModal;
