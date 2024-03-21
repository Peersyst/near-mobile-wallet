import { Row } from "@peersyst/react-native-components";
import { Token } from "near-peersyst-sdk";
import TokenIcon from "../TokenIcon/TokenIcon";
import Typography, { TypographyProps } from "module/common/component/display/Typography/Typography";
import { DimensionValue, ViewStyle } from "react-native";

export interface TokenNameWithIconProps {
    token: Token;
    gap?: DimensionValue | undefined;
    typographyProps?: TypographyProps;
    style?: ViewStyle;
}

const TokenNameWithIcon = ({ token, gap, typographyProps, style }: TokenNameWithIconProps): JSX.Element => {
    const { name } = token.metadata;

    return (
        <Row alignItems="center" gap={gap} style={style}>
            <TokenIcon token={token} />
            <Typography variant={typographyProps?.variant || "body3Strong"} style={{ flex: 0.6 }} {...typographyProps}>
                {name}
            </Typography>
        </Row>
    );
};

export default TokenNameWithIcon;
