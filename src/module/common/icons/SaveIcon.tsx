import { SvgIcon, SvgIconProps } from "@peersyst/react-native-components";
import { ClipPath, Defs, G, Path, Rect } from "react-native-svg";

export function SaveIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "SaveIcon" }}
        >
            <G clipPath="url(#clip0_0_3)">
                <Path d="M0 2.66667C0 1.19391 1.19391 0 2.66667 0H8H16H18.1144C18.8216 0 19.4999 0.280952 20 0.781049L23.6095 4.39052C23.8595 4.64058 24 4.97973 24 5.33333V21.3333C24 22.8061 22.8061 24 21.3333 24H16H8H2.66667C1.19391 24 0 22.8061 0 21.3333V2.66667ZM8 21.3333H16V13.3333H8V21.3333ZM18.6667 21.3333H21.3333V5.8856L18.6667 3.21895V5.33333C18.6667 6.80609 17.4728 8 16 8H8C6.52724 8 5.33333 6.80609 5.33333 5.33333V2.66667H2.66667V21.3333H5.33333V13.3333C5.33333 11.8606 6.52724 10.6667 8 10.6667H16C17.4728 10.6667 18.6667 11.8606 18.6667 13.3333V21.3333ZM8 2.66667V5.33333H16V2.66667H8Z" />
            </G>
            <Defs>
                <ClipPath id="clip0_0_3">
                    <Rect width="24" height="24" />
                </ClipPath>
            </Defs>
        </SvgIcon>
    );
}
