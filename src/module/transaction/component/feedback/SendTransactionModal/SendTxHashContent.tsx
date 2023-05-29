import { Col, ColProps, Label } from "@peersyst/react-native-components";
import ExplorerButton from "../../input/ExplorerButton/ExplorerButton";
import BlockchainAddress from "module/common/component/display/BlockchainAddress/BlockchainAddress";
import ShareButton from "module/common/component/input/ShareButton/ShareButton";
import { useTranslate } from "module/common/hook/useTranslate";
import ShareTxHashButton from "../../input/ShareTxHashButton/ShareTxHashButton";

export interface SendTxHashContentProps {
    txHash: string;
    style?: ColProps["style"];
}

const SendTxHashContent = ({ style, txHash }: SendTxHashContentProps) => {
    const translate = useTranslate();

    return (
        <Col style={style} gap={40}>
            <Label label={translate("transaction")} variant="body2Strong" alignment={"center"} color="white">
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
                <ShareTxHashButton variant="tertiary" fullWidth txHash={txHash} showIcon />
                <ExplorerButton type="tx" address={txHash} variant="tertiary" fullWidth showIcon />
            </Col>
        </Col>
    );
};

export default SendTxHashContent;
