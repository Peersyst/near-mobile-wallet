import { SvgIcon, SvgIconProps } from "@peersyst/react-native-components";
import { Path } from "react-native-svg";

export function GridIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "GridIcon" }}
        >
            <Path d="M3.5 5C3.5 3.89543 4.39543 3 5.5 3H9.5C10.6046 3 11.5 3.89543 11.5 5V9C11.5 10.1046 10.6046 11 9.5 11H5.5C4.39543 11 3.5 10.1046 3.5 9V5ZM9.5 5H5.5V9H9.5V5ZM13.5 5C13.5 3.89543 14.3954 3 15.5 3H19.5C20.6046 3 21.5 3.89543 21.5 5V9C21.5 10.1046 20.6046 11 19.5 11H15.5C14.3954 11 13.5 10.1046 13.5 9V5ZM19.5 5H15.5V9H19.5V5ZM3.5 15C3.5 13.8954 4.39543 13 5.5 13H9.5C10.6046 13 11.5 13.8954 11.5 15V19C11.5 20.1046 10.6046 21 9.5 21H5.5C4.39543 21 3.5 20.1046 3.5 19V15ZM9.5 15H5.5V19H9.5V15ZM13.5 15C13.5 13.8954 14.3954 13 15.5 13H19.5C20.6046 13 21.5 13.8954 21.5 15V19C21.5 20.1046 20.6046 21 19.5 21H15.5C14.3954 21 13.5 20.1046 13.5 19V15ZM19.5 15H15.5V19H19.5V15Z" />
        </SvgIcon>
    );
}
