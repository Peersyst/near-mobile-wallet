import { SvgIcon, SvgIconProps } from "@peersyst/react-native-components";
import { Path } from "react-native-svg";

export function InfoIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "InfoIcon" }}
        >
            <Path d="M11.9995 24.0001C9.62633 23.9999 7.30646 23.296 5.33328 21.9775C3.36009 20.6589 1.82221 18.7848 0.914105 16.5922C0.00599489 14.3996 -0.231563 11.9869 0.231471 9.65933C0.694504 7.33173 1.83733 5.19369 3.51545 3.51557C5.19357 1.83746 7.3316 0.694626 9.65921 0.231593C11.9868 -0.231441 14.3995 0.00611686 16.5921 0.914227C18.7847 1.82234 20.6587 3.36022 21.9773 5.3334C23.2959 7.30658 23.9998 9.62645 24 11.9997C23.9965 15.1813 22.7311 18.2317 20.4813 20.4814C18.2315 22.7312 15.1812 23.9966 11.9995 24.0001V24.0001ZM11.9995 1.99464C10.0205 1.99464 8.08596 2.5815 6.44048 3.681C4.79499 4.7805 3.51251 6.34326 2.75522 8.17165C1.99792 10 1.79982 12.0119 2.18597 13.9529C2.57212 15.8939 3.52518 17.6768 4.92462 19.0761C6.32405 20.4754 8.10702 21.4283 10.048 21.8143C11.989 22.2003 14.0009 22.002 15.8292 21.2445C17.6576 20.4871 19.2202 19.2045 20.3196 17.5589C21.4189 15.9133 22.0056 13.9787 22.0055 11.9997C22.0024 9.34686 20.9473 6.80357 19.0715 4.92775C17.1956 3.05193 14.6524 1.99678 11.9995 1.99377" />
            <Path d="M11.9996 7.58579C11.6039 7.58579 11.2171 7.46845 10.8881 7.24861C10.559 7.02878 10.3026 6.71632 10.1512 6.35075C9.99977 5.98518 9.96015 5.58291 10.0373 5.19482C10.1145 4.80673 10.3051 4.45025 10.5849 4.17045C10.8647 3.89066 11.2212 3.70011 11.6093 3.62292C11.9973 3.54572 12.3996 3.58534 12.7652 3.73677C13.1308 3.88819 13.4432 4.14462 13.663 4.47362C13.8829 4.80263 14.0002 5.18944 14.0002 5.58513C13.9986 6.11524 13.7873 6.62318 13.4125 6.99802C13.0376 7.37287 12.5297 7.58417 11.9996 7.58579" />
            <Path d="M11.9996 20.4166C11.4698 20.4138 10.9625 20.2022 10.5879 19.8276C10.2133 19.453 10.0017 18.9457 9.9989 18.4159V10.6896C9.9989 10.4269 10.0507 10.1667 10.1512 9.924C10.2517 9.68127 10.3991 9.46072 10.5849 9.27494C10.7707 9.08916 10.9912 8.9418 11.2339 8.84126C11.4767 8.74071 11.7368 8.68896 11.9996 8.68896C12.2623 8.68896 12.5224 8.74071 12.7652 8.84126C13.0079 8.9418 13.2285 9.08916 13.4142 9.27494C13.6 9.46072 13.7474 9.68127 13.8479 9.924C13.9485 10.1667 14.0002 10.4269 14.0002 10.6896V18.4159C13.9975 18.9457 13.7858 19.453 13.4112 19.8276C13.0366 20.2022 12.5293 20.4138 11.9996 20.4166Z" />
        </SvgIcon>
    );
}