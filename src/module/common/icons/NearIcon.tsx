import { SvgIcon, SvgIconProps } from "@peersyst/react-native-components";
import { Path } from "react-native-svg";

export function NearIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "NearIcon" }}
        >
            <Path d="M17.5261 3.91404L13.7418 9.50002C13.6804 9.58065 13.6521 9.68138 13.6624 9.78195C13.6727 9.88253 13.7209 9.97548 13.7974 10.0421C13.8738 10.1088 13.9728 10.1442 14.0744 10.1412C14.176 10.1382 14.2727 10.097 14.345 10.026L18.069 6.82603C18.0905 6.80645 18.1173 6.79356 18.146 6.78897C18.1748 6.78439 18.2043 6.7883 18.2308 6.80022C18.2574 6.81215 18.2798 6.83157 18.2954 6.85606C18.3109 6.88056 18.3189 6.90906 18.3184 6.93803V16.996C18.3181 17.0265 18.3084 17.0563 18.2907 17.0812C18.2729 17.1061 18.2479 17.1251 18.2191 17.1355C18.1902 17.1459 18.1589 17.1474 18.1292 17.1396C18.0995 17.1318 18.0729 17.1152 18.0529 17.092L6.79241 3.69204C6.61265 3.47691 6.38775 3.3035 6.13348 3.18396C5.87921 3.06442 5.60174 3.00165 5.3205 3.00004H4.92839C4.41696 3.00004 3.92647 3.20211 3.56484 3.56181C3.2032 3.9215 3.00003 4.40935 3.00003 4.91803V19.082C3.00003 19.5907 3.2032 20.0785 3.56484 20.4382C3.92647 20.7979 4.41696 21 4.92839 21V21C5.25793 21 5.58195 20.9159 5.86955 20.7559C6.15715 20.5959 6.39872 20.3653 6.57122 20.086L10.3556 14.5C10.4169 14.4194 10.4452 14.3187 10.4349 14.2181C10.4246 14.1175 10.3764 14.0246 10.2999 13.9579C10.2235 13.8913 10.1245 13.8559 10.0229 13.8589C9.92135 13.8619 9.82466 13.903 9.75232 13.974L6.02831 17.174C6.00684 17.1936 5.98006 17.2065 5.95129 17.2111C5.92253 17.2156 5.89304 17.2117 5.86649 17.1998C5.83994 17.1879 5.8175 17.1685 5.80194 17.144C5.78638 17.1195 5.77839 17.091 5.77897 17.062V7.01403C5.77927 6.98349 5.78894 6.95377 5.80667 6.92885C5.82441 6.90392 5.84938 6.88498 5.87823 6.87454C5.90709 6.8641 5.93845 6.86268 5.96815 6.87045C5.99784 6.87822 6.02444 6.89482 6.04439 6.91803L17.3049 20.318C17.486 20.5312 17.7118 20.7025 17.9664 20.8199C18.2209 20.9374 18.4982 20.9982 18.7788 20.998H19.181C19.4342 20.998 19.685 20.9484 19.9189 20.852C20.1529 20.7556 20.3655 20.6143 20.5446 20.4362C20.7236 20.2581 20.8657 20.0467 20.9626 19.814C21.0595 19.5813 21.1094 19.3319 21.1094 19.08V4.91803C21.1094 4.66515 21.0591 4.41475 20.9614 4.18127C20.8638 3.94778 20.7206 3.73581 20.5403 3.55755C20.3599 3.37929 20.1459 3.23826 19.9106 3.14258C19.6752 3.0469 19.4232 2.99846 19.1689 3.00004V3.00004C18.8394 3.00008 18.5154 3.08411 18.2278 3.24412C17.9402 3.40412 17.6986 3.63477 17.5261 3.91404Z" />
        </SvgIcon>
    );
}