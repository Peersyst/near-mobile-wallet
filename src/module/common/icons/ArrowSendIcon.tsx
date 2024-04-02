import { SvgIcon, SvgIconProps } from "@peersyst/react-native-components";
import { Path } from "react-native-svg";

export function ArrowSendIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "ArrowSendIcon" }}
        >
            <Path d="M8.25 7C8.25 6.44772 8.69772 6 9.25 6L17.25 6C17.8023 6 18.25 6.44772 18.25 7V15C18.25 15.5523 17.8023 16 17.25 16C16.6977 16 16.25 15.5523 16.25 15V9.41421L7.95711 17.7071C7.56658 18.0976 6.93342 18.0976 6.54289 17.7071C6.15237 17.3166 6.15237 16.6834 6.54289 16.2929L14.8358 8L9.25 8C8.69772 8 8.25 7.55228 8.25 7Z" />
        </SvgIcon>
    );
}
