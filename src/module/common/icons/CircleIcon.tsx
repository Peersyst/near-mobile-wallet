import React from "react";
import { SvgIcon, SvgIconProps } from "react-native-components";
import { Path } from "react-native-svg";

export function CircleIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "CircleIcon" }}
        >
            <Path
                d="M12 22.8C17.9647 22.8 22.8 17.9646 22.8 12C22.8 6.03528 17.9647 1.19995 12 1.19995C6.03534 1.19995 1.20001 6.03528 1.20001 12C1.20001 17.9646 6.03534 22.8 12 22.8Z"
                stroke="#858585"
                strokeWidth="2"
            />
        </SvgIcon>
    );
}
