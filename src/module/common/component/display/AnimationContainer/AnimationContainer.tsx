import { Image, ViewStyle } from "react-native";
import { ReactNode } from "react";
import { AnimationContainerRoot } from "./AnimationContainer.styles";
import { animation as webp_animation } from "images";

export interface AmimationContainerProps {
    animation?: boolean;
    style?: ViewStyle;
    children?: ReactNode;
}

const AnimationContainer = ({ animation = true, style, children }: AmimationContainerProps): JSX.Element => {
    return (
        <AnimationContainerRoot style={style}>
            {animation && (
                <Image
                    source={webp_animation}
                    resizeMode="contain"
                    style={{ height: "200%", width: "200%", position: "absolute", zIndex: -1 }}
                />
            )}
            {children}
        </AnimationContainerRoot>
    );
};

export default AnimationContainer;
