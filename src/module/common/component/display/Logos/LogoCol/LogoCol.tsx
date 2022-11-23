import { SvgIconProps } from "@peersyst/react-native-components";
import { LogoColIcon, LogoColRoot } from "./LogoCol.styles";
import AnimationContainer from "module/common/component/display/AnimationContainer/AnimationContainer";

export type LogoColProps = Omit<SvgIconProps, "children"> & { animation?: boolean };
export type LogoColRootProps = Pick<LogoColProps, "size">;

const LogoCol = ({ size, animation, ...rest }: LogoColProps): JSX.Element => {
    return (
        <LogoColRoot size={size}>
            <AnimationContainer animation={animation}>
                <LogoColIcon size="100%" {...rest} />
            </AnimationContainer>
        </LogoColRoot>
    );
};

export default LogoCol;
