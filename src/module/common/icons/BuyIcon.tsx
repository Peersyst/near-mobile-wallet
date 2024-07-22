import { SvgIcon, SvgIconProps } from "@peersyst/react-native-components";
import { Path } from "react-native-svg";

export function BuyIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "BuyIcon" }}
        >
            <Path d="M6.48877 16.1358L4.69642 4.00014H3.6C3.06981 4.00014 2.64 3.55242 2.64 3.00014C2.64 2.44785 3.06981 2.00014 3.6 2.00014H5.50531C5.59738 1.99855 5.68737 2.0108 5.77312 2.03526C5.90939 2.07396 6.03357 2.14314 6.13852 2.23533C6.25165 2.33451 6.34321 2.46104 6.40302 2.60712C6.43597 2.68733 6.45913 2.77295 6.47096 2.86233L6.7867 5.00014H14.16V7.00014H7.08208L8.26362 15.0001H17.2858L18.7258 10.0001H20.7302L18.9195 16.2875C18.7977 16.7105 18.4239 17.0001 18 17.0001H7.45515C7.36448 17.0017 7.27583 16.9899 7.19125 16.9662C7.04711 16.9261 6.91635 16.8518 6.8074 16.7523C6.70762 16.6614 6.62551 16.5487 6.56842 16.4199C6.52909 16.3314 6.5018 16.236 6.48877 16.1358Z" />
            <Path d="M10.32 20.0001C10.32 21.1047 9.46039 22.0001 8.4 22.0001C7.33961 22.0001 6.48 21.1047 6.48 20.0001C6.48 18.8956 7.33961 18.0001 8.4 18.0001C9.46039 18.0001 10.32 18.8956 10.32 20.0001Z" />
            <Path d="M18.96 20.0001C18.96 21.1047 18.1004 22.0001 17.04 22.0001C15.9796 22.0001 15.12 21.1047 15.12 20.0001C15.12 18.8956 15.9796 18.0001 17.04 18.0001C18.1004 18.0001 18.96 18.8956 18.96 20.0001Z" />
            <Path d="M18.96 2.00014C19.4902 2.00014 19.92 2.44785 19.92 3.00014V4.00014H20.88C21.4102 4.00014 21.84 4.44785 21.84 5.00014C21.84 5.55242 21.4102 6.00014 20.88 6.00014H19.92V7.00014C19.92 7.55242 19.4902 8.00014 18.96 8.00014C18.4298 8.00014 18 7.55242 18 7.00014V6.00014H17.04C16.5098 6.00014 16.08 5.55242 16.08 5.00014C16.08 4.44785 16.5098 4.00014 17.04 4.00014H18V3.00014C18 2.44785 18.4298 2.00014 18.96 2.00014Z" />
        </SvgIcon>
    );
}
