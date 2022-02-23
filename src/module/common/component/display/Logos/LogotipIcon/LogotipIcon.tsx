import Svg, { SvgProps, Path, Color } from "react-native-svg";
import { StyleProp, StyleSheet, TextStyle } from "react-native";

export type LogotipIconProps = Omit<SvgProps, "children" | "xmlns" | "fill" | "stroke" | "style"> & {
    style?: StyleProp<TextStyle>;
};

export const LogotipIcon = ({ style, width: widthProps, height: heightProps, color: ColorProp, ...rest }: LogotipIconProps) => {
    let color, width, height;
    if (style) {
        const flattenedStyle = StyleSheet.flatten(style);
        if (flattenedStyle.color) color = flattenedStyle.color;
        if (flattenedStyle.width) width = flattenedStyle.width;
        if (flattenedStyle.height) height = flattenedStyle.height;
    }
    return (
        <Svg
            // eslint-disable-next-line
            //@ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            width={widthProps || width}
            height={heightProps || height}
            fill="none"
            viewBox="0 0 134 21"
            {...rest}
            {...{ testID: "LogotipIcon" }}
        >
            <Path
                d="M9.736 2.256a6.426 6.426 0 0 0-5.158 2.2 8.949 8.949 0 0 0-1.875 6.003 9.084 9.084 0 0 0 1.821 6.07 6.443 6.443 0 0 0 5.186 2.134 17.295 17.295 0 0 0 4.881-.807v2.225c-.805.301-1.64.518-2.489.647-.912.124-1.832.182-2.753.174a8.766 8.766 0 0 1-6.918-2.732C.812 16.348.003 13.77.003 10.432c-.042-1.9.355-3.784 1.161-5.506.73-1.529 1.91-2.8 3.379-3.644A10.272 10.272 0 0 1 9.764.003c1.94-.044 3.865.367 5.618 1.2l-1.03 2.166a11.12 11.12 0 0 0-4.616-1.113M35.313 20.624h-3.018l-7.216-9.705-2.072 1.821v7.884h-2.559V.292h2.559V10.32l1.752-1.928 7.245-8.1h2.989l-8.051 8.861 8.371 11.471ZM39.396 20.624V.232h16.005a6.8 6.8 0 0 1 2.964.637 5.439 5.439 0 0 1 2.134 1.764c.537.763.817 1.676.8 2.608a5.29 5.29 0 0 1-.487 2.43 3.933 3.933 0 0 1-1.3 1.5 6.025 6.025 0 0 1-1.793.815v.12a6.199 6.199 0 0 1 2.045.814 4.16 4.16 0 0 1 1.468 1.616 5.7 5.7 0 0 1 .548 2.668 4.922 4.922 0 0 1-.83 2.845 5.61 5.61 0 0 1-2.237 1.9 7.08 7.08 0 0 1-3.127.682l-16.19-.007Zm7.025-12.449h6.017c.315.01.626-.068.9-.223.25-.151.451-.373.578-.637.149-.325.22-.68.208-1.037a1.473 1.473 0 0 0-.489-1.112 1.69 1.69 0 0 0-1.2-.46h-6.014v3.47Zm0 7.706h6.491a1.681 1.681 0 0 0 1.245-.474 1.934 1.934 0 0 0 .474-1.423 1.565 1.565 0 0 0-.83-1.393 1.786 1.786 0 0 0-.859-.208h-6.521v3.498ZM76.711 20.98a16.47 16.47 0 0 1-6.387-1.082 8.028 8.028 0 0 1-3.868-3.216 9.882 9.882 0 0 1-1.3-5.246V.238h7.025v11c-.07 1.26.344 2.5 1.156 3.467a4.29 4.29 0 0 0 3.349 1.275 4.34 4.34 0 0 0 3.364-1.284 4.926 4.926 0 0 0 1.171-3.467V.24h7.024v11.2a9.886 9.886 0 0 1-1.3 5.245 8.03 8.03 0 0 1-3.868 3.216 16.383 16.383 0 0 1-6.357 1.082M92.627 20.624V.232h7.022v14.94h12.1v5.453H92.627ZM114.501 20.624V.232h7.024v14.94h12.093v5.453h-19.117Z"
                fill={(color as Color) || ColorProp}
            />
        </Svg>
    );
};
