import { Col, Typography } from "@peersyst/react-native-components";
import Container from "module/common/component/display/Container/Container";
import { Trans } from "react-i18next";
import { DApp } from "./SignMessageDetails.styles";
import { SignMessageDetailsProps } from "./SignMessageDetails.types";

const SignMessageDetails = ({ receiver, message }: SignMessageDetailsProps): JSX.Element => {
    return (
        <Col flex={1} alignItems="center" gap={24}>
            <Typography variant="body2Regular" textAlign="center">
                <Trans
                    i18nKey="signDAppMessage"
                    values={{ receiver }}
                    components={{
                        dapp: <DApp variant="body2Strong" />,
                    }}
                />
            </Typography>
            <Container>
                <Typography variant="body2Strong">{message}</Typography>
            </Container>
        </Col>
    );
};

export default SignMessageDetails;
