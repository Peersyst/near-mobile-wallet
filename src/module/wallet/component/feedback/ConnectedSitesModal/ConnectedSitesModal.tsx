import { Col, createModal } from "@peersyst/react-native-components";
import CardSelectModal from "module/common/component/feedback/CardSelectModal/CardSelectModal";
import { useTranslate } from "module/common/hook/useTranslate";
import { ConnectedSite as ConnectedSiteType } from "../../display/ConnectedSite/ConnectedSite.types";
import ConnectedSitesList from "../ConnectedSitesList/ConnectedSitesList";
import { View } from "react-native";

const ConnectedSitesModal = createModal((props): JSX.Element => {
    const translate = useTranslate();

    const mockData: ConnectedSiteType[] = [
        { name: "social.near", publicKey: "verylongaccesskey1234" },
        { name: "social.near", publicKey: "verylongaccesskey1234" },
        { name: "social.near", publicKey: "verylongaccesskey1234" },
        { name: "social.near", publicKey: "verylongaccesskey1234" },
        { name: "social.near", publicKey: "verylongaccesskey1234" },
        { name: "social.near", publicKey: "verylongaccesskey1234" },
        { name: "social.near", publicKey: "verylongaccesskey1234" },
    ];

    return (
        <CardSelectModal title={translate("connectedSites")} dismissal="hide" {...props} style={{ height: "60%" }}>
            <View style={{ flex: 1 }}>
                <Col style={{ position: "absolute", height: "100%", width: "100%" }}>
                    <ConnectedSitesList sites={mockData} />
                </Col>
            </View>
        </CardSelectModal>
    );
});

export default ConnectedSitesModal;
