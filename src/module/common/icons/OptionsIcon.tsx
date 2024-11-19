import { SvgIcon, SvgIconProps } from "@peersyst/react-native-components";
import { Path } from "react-native-svg";

export function OptionsIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "OptionsIcon" }}
        >
            <Path
                d="M10 12.9687C10 14.0733 10.8954 14.9687 12 14.9687C13.1046 14.9687 14 14.0733 14 12.9688C14 11.8642 13.1046 10.9687 12 10.9687C10.8954 10.9687 10 11.8642 10 12.9687Z"
                fill="#A7A7A7"
            />
            <Path
                d="M10 6.96875C10 8.07332 10.8954 8.96875 12 8.96875C13.1046 8.96875 14 8.07332 14 6.96875C14 5.86418 13.1046 4.96875 12 4.96875C10.8954 4.96875 10 5.86418 10 6.96875Z"
                fill="#A7A7A7"
            />
            <Path
                d="M10 18.9687C10 20.0733 10.8954 20.9687 12 20.9687C13.1046 20.9687 14 20.0733 14 18.9688C14 17.8642 13.1046 16.9687 12 16.9687C10.8954 16.9687 10 17.8642 10 18.9687Z"
                fill="#A7A7A7"
            />
        </SvgIcon>
    );
}
