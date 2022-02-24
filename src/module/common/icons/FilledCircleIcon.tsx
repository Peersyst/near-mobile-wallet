import { SvgIcon, SvgIconProps } from "react-native-components";
import { Path } from "react-native-svg";

export function FilledCircleIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "FilledCircleIcon" }}
        >
            <Path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" />
        </SvgIcon>
    );
}
