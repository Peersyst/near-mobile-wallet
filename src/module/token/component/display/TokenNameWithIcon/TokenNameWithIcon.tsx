import { Row } from "@peersyst/react-native-components";
import TokenIcon from "../TokenIcon/TokenIcon";
import Typography from "module/common/component/display/Typography/Typography";
import { TokenNameWithIconProps } from "./TokenNameWithIcon.types";

const TokenNameWithIcon = ({
    token,
    gap = 12,
    typographyProps = {},
    typographyStyle,
    style,
    variant,
}: TokenNameWithIconProps): JSX.Element => {
    const { name } = token.metadata;

    return (
        <Row alignItems="center" gap={gap} style={style}>
            <TokenIcon token={token} />
            <Typography variant={variant} numberOfLines={1} style={typographyStyle} {...typographyProps}>
                {name}
            </Typography>
        </Row>
    );
};

export default TokenNameWithIcon;
