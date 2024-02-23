import { Col, Row, Skeleton } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import { ValidatorRoot } from "module/staking/component/display/ValidatorInformation/ValidatorInformation.styles";
import CardIcon from "module/common/component/display/CardIcon/CardIcon";
import { UserCheckIcon } from "icons";
import ValidatorStakingBalanceSkeleton from "./ValidatorStakingBalance/ValidatorStakingBalanceSkeleton";

const ValidatorInformationSkeleton = (): JSX.Element => {
    return (
        <ValidatorRoot justifyContent="space-between">
            <Row flex={1} alignItems="center" gap={10}>
                <Skeleton shape="circular">
                    <CardIcon active={false} Icon={UserCheckIcon} />
                </Skeleton>
                <Col gap={2}>
                    <Skeleton width={150}>
                        <Typography variant="body3Strong">·</Typography>
                    </Skeleton>
                    <Row>
                        <Skeleton width={100}>
                            <Typography variant="body4Strong">·</Typography>
                        </Skeleton>
                    </Row>
                </Col>
            </Row>
            <ValidatorStakingBalanceSkeleton />
        </ValidatorRoot>
    );
};

export default ValidatorInformationSkeleton;
