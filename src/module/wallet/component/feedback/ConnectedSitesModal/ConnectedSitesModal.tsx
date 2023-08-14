import { Col, createModal } from "@peersyst/react-native-components";
import CardSelectModal from "module/common/component/feedback/CardSelectModal/CardSelectModal";
import { useTranslate } from "module/common/hook/useTranslate";
import ActionableConnectedSitesList from "../ConnectedSitesList/ConnectedSitesList";
import { View } from "react-native";
import useGetAccountAccessKeys from "module/wallet/query/useGetAccountAccessKeys";

const ConnectedSitesModal = createModal((props): JSX.Element => {
    const translate = useTranslate();

    const { data: sites, isLoading, refetch } = useGetAccountAccessKeys();

    return (
        <CardSelectModal title={translate("connectedSites")} dismissal="hide" {...props} style={{ height: "60%" }}>
            <View style={{ flex: 1 }}>
                <Col style={{ position: "absolute", height: "100%", width: "100%" }}>
                    <ActionableConnectedSitesList sites={sites} loading={isLoading} onRefresh={refetch} />
                </Col>
            </View>
        </CardSelectModal>
    );
});

export default ConnectedSitesModal;
