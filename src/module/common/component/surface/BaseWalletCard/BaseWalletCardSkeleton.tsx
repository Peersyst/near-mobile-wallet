import { BaseWalletCardRoot } from "module/common/component/surface/BaseWalletCard/BaseWalletCard.styles";
import { ReactElement } from "react";
import { Col, Row, Skeleton, Typography } from "@peersyst/react-native-components";

interface BaseWalletCardSkeletonProps {
    children?: { content?: ReactElement; footer?: ReactElement };
    gap?: number;
}

const BaseWalletCardSkeleton = ({ children: { content, footer } = {}, gap }: BaseWalletCardSkeletonProps): JSX.Element => {
    return (
        <BaseWalletCardRoot gap={gap}>
            <Col style={{ width: "100%" }} alignItems="center" gap={10} justifyContent="center">
                <Skeleton width="100%">
                    <Typography variant="body2Strong">·</Typography>
                </Skeleton>
                {content}
            </Col>
            <Row justifyContent="center">{footer}</Row>
        </BaseWalletCardRoot>
    );
};

export default BaseWalletCardSkeleton;
