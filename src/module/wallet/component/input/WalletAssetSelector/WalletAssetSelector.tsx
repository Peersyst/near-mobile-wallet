import { Col, Row } from "@peersyst/react-native-components";
import Container from "module/common/component/display/Container/Container";
import Typography from "module/common/component/display/Typography/Typography";
import Fee from "module/transaction/component/display/Fee/Fee";
import { TouchableWithoutFeedback } from "react-native";
import { ChevronDownIcon } from "./WalletAssetSelector.styles";
import { WalletAssetSelectorModal } from "./WalletAssetSelectorModal";

const WalletAssetSelector = () => {
    return (
        <WalletAssetSelectorModal>
            {({ showModal }) => (
                <TouchableWithoutFeedback onPress={showModal}>
                    <Container>
                        <Col alignItems="center" flex={1} gap="2%">
                            <Row alignItems="center" gap={5} justifyContent="center">
                                <Typography variant="body2Strong">{"Seleccionar el token"}</Typography>
                                <ChevronDownIcon />
                            </Row>
                            <Fee tag="body2" />
                        </Col>
                    </Container>
                </TouchableWithoutFeedback>
            )}
        </WalletAssetSelectorModal>
    );
};

export default WalletAssetSelector;
