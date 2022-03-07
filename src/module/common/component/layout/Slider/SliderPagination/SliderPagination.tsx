import { useWindowDimensions } from "react-native";
import { Row } from "react-native-components";
import { AnimatedDot } from "../Slider.styles";
import { PaginatorProps } from "../Slider.types";

const Paginator = ({ scrollX, data, dotColor }: PaginatorProps) => {
    const { width } = useWindowDimensions();
    return (
        <Row justifyContent="center">
            {data.map((_, i) => {
                //Create an array as a reference to interpolate with
                //the correct value of the outputRange for each dot
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: "clamp",
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: "clamp",
                });

                return (
                    <AnimatedDot
                        color={dotColor}
                        style={[
                            {
                                width: dotWidth,
                                opacity,
                            },
                        ]}
                        key={i}
                    />
                );
            })}
        </Row>
    );
};

export default Paginator;
