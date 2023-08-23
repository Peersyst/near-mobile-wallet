import { Col, Row } from "@peersyst/react-native-components";
import { ActionDetailsProps } from "../SignRequestDetails.types";
import Typography from "module/common/component/display/Typography/Typography";
import { AddKeyActionParams } from "../actions.types";
import Balance from "module/wallet/component/display/Balance/Balance";
import { convertYoctoToNear } from "near-peersyst-sdk";
import Container from "module/common/component/display/Container/Container";
import { useTranslate } from "module/common/hook/useTranslate";
import { Trans } from "react-i18next";
import { DApp } from "../../SignMessageDetails/SignMessageDetails.styles";
import ActionDetailsScaffold from "module/signer/components/layout/ActionDetailsScaffold/ActionDetailsScaffold";

const AddKeyDetails = ({ params }: ActionDetailsProps): JSX.Element => {
    const {
        accessKey: { permission },
    } = params as AddKeyActionParams;

    const translate = useTranslate();

    const isFullAccess = permission === "FullAccess";

    const header = isFullAccess ? translate("addFullAccessKey") : translate("addAccessKey");
    const description = isFullAccess ? (
        translate("addFullAccessKeyDescription")
    ) : (
        <Trans
            i18nKey="addAccessKeyDescription"
            values={{ dapp: permission.receiverId }}
            components={{ dapp: <DApp variant="body2Strong" /> }}
        />
    );

    return (
        <ActionDetailsScaffold header={header} description={description}>
            {!isFullAccess && (
                <Container>
                    <Col gap={16}>
                        {permission.allowance && (
                            <Row justifyContent="space-between">
                                <Typography variant="body2Strong">{translate("allowedGas")}</Typography>
                                <Balance variant="body2Regular" balance={convertYoctoToNear(permission.allowance)} units="token" />
                            </Row>
                        )}
                        <Row justifyContent="space-between">
                            <Typography variant="body2Strong">{translate("methodNames")}</Typography>
                            <Typography variant="body2Regular">
                                {permission.methodNames && permission.methodNames?.length
                                    ? permission.methodNames.map((method) => `${method}`)
                                    : "All methods"}
                            </Typography>
                        </Row>
                    </Col>
                </Container>
            )}
        </ActionDetailsScaffold>
    );
};

export default AddKeyDetails;
