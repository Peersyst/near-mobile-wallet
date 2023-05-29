import { Col, ColProps, Label } from "@peersyst/react-native-components";
import ExplorerButton from "../../input/ExplorerButton/ExplorerButton";
import BlockchainAddress from "module/common/component/display/BlockchainAddress/BlockchainAddress";
import ShareButton from "module/common/component/input/ShareButton/ShareButton";

export interface SendTxHashContentProps {
    txHash: string;
    style?: ColProps["style"];
}

const SendTxHashContent = ({ style, txHash }: SendTxHashContentProps) => {
    return (
        <Col style={style} gap={40}>
            <Label label={"Transaction"} variant="body2Strong" alignment={"center"} color="white">
                <BlockchainAddress
                    variant="body3Regular"
                    action="copy"
                    textAlign="center"
                    type="tx"
                    address={txHash}
                    color="white"
                    style={{ width: "80%" }}
                />
            </Label>
            <Col gap={12}>
                <ShareButton variant="tertiary" fullWidth shareContent={{ message: txHash }} />
                <ExplorerButton type="tx" address={txHash} variant="tertiary" fullWidth />
            </Col>
        </Col>
    );
};

export default SendTxHashContent;
