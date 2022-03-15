import { SvgIcon, SvgIconProps } from "react-native-components";
import { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export function FilledCopyIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "FilledCopyIcon" }}
        >
            <G clipPath="url(#clip0_127_6)">
                <Path d="M18.8122 1.69338H7.49144C7.01751 1.6947 6.54848 1.78941 6.11117 1.97208C5.67385 2.15476 5.27683 2.42183 4.94278 2.75802C4.60874 3.09421 4.34422 3.49294 4.16435 3.93142C3.98448 4.36989 3.89279 4.83951 3.8945 5.31345V20.7007C3.32511 20.4193 2.84588 19.9841 2.51106 19.4443C2.17625 18.9046 1.99921 18.2819 2.00001 17.6468V5.02786C1.99787 3.69757 2.52387 2.42082 3.46245 1.47809C4.40104 0.535352 5.67545 0.00372909 7.00575 0L15.886 0C16.4794 0.000482057 17.0623 0.157238 17.576 0.454501C18.0897 0.751763 18.516 1.17905 18.8122 1.69338" />
                <Path d="M22.1115 6.35424V20.5992C22.1137 21.4991 21.7583 22.363 21.1235 23.001C20.4888 23.6389 19.6267 23.9986 18.7268 24.001H8.65796C7.75927 23.9947 6.89946 23.6337 6.26557 22.9966C5.63169 22.3595 5.27504 21.4979 5.2732 20.5992V5.95C5.27215 5.55732 5.34846 5.16828 5.49779 4.8051C5.64711 4.44192 5.86653 4.11171 6.14349 3.83335C6.42046 3.55498 6.74955 3.3339 7.11198 3.18275C7.4744 3.03159 7.86305 2.95332 8.25573 2.95239H18.7278C18.7559 2.95239 18.7841 2.95239 18.8122 2.95239C19.6972 2.97627 20.5378 3.34524 21.1545 3.98049C21.7711 4.61574 22.1149 5.46692 22.1125 6.35223" />
            </G>
            <Defs>
                <ClipPath id="clip0_127_6">
                    <Rect width="20.1115" height="24" transform="translate(2)" />
                </ClipPath>
            </Defs>
        </SvgIcon>
    );
}
