import { SvgIcon, SvgIconProps } from "@peersyst/react-native-components";
import { G, Path } from "react-native-svg";

export function ChevronRightIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "ChevronRightIcon" }}
        >
            <G>
                <Path d="M8.0853 23.4702L18.3073 13.2456C18.6454 12.9063 18.8352 12.4468 18.8352 11.9678C18.8352 11.4888 18.6454 11.0294 18.3073 10.6901L8.0853 0.46811C7.74081 0.156293 7.28959 -0.0111057 6.82508 0.000572382C6.36057 0.0122505 5.91834 0.202111 5.58995 0.530845C5.26156 0.859578 5.07216 1.30201 5.06096 1.76653C5.04977 2.23105 5.21764 2.68209 5.52981 3.02626L14.474 11.9705L5.52981 20.912C5.19058 21.2513 5 21.7114 5 22.1911C5 22.6709 5.19058 23.131 5.52981 23.4702C5.86904 23.8094 6.32914 24 6.80889 24C7.28863 24 7.74873 23.8094 8.08796 23.4702" />
            </G>
        </SvgIcon>
    );
}
