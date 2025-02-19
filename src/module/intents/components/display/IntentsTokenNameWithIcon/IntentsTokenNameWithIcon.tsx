import { Col, Row } from "@peersyst/react-native-components";
import Typography from "module/common/component/display/Typography/Typography";
import { IntentsTokenNameWithIconProps } from "./IntentsTokenNameWithIcon.types";
import { Image } from "react-native";
import Chip from "module/common/component/display/Chip/Chip";

const IntentsTokenNameWithIcon = ({
    token,
    gap = 12,
    typographyProps = {},
    typographyStyle,
    nameChipGap,
    style,
    variant,
}: IntentsTokenNameWithIconProps): JSX.Element => {
    return (
        <Row alignItems="center" gap={gap} style={style}>
            <Image src={token.icon} source={{ uri: token.icon }} style={{ width: 44, height: 44, borderRadius: 20000 }} />
            <Col justifyContent="center" gap={nameChipGap} flex={1}>
                <Typography variant={variant} numberOfLines={1} style={typographyStyle} {...typographyProps}>
                    {token.name}
                </Typography>
                <Col alignItems="flex-start">
                    <Chip variant="gradient" size="xs" label={"Intents"} />
                </Col>
            </Col>
        </Row>
    );
};

export default IntentsTokenNameWithIcon;
