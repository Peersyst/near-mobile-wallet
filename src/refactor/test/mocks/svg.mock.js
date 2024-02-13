import { forwardRef } from "react";
import { View } from "react-native";

const SvgMock = forwardRef(function SvgMock(props, ref) {
    return <View ref={ref} {...props} />;
});

export const ReactComponent = SvgMock;
export default SvgMock;
