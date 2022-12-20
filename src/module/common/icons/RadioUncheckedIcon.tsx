import { SvgIcon, SvgIconProps } from "@peersyst/react-native-components";
import { Path } from "react-native-svg";

export function RadioUncheckedIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "RadioUncheckedIcon" }}
        >
            <Path
                d="M11.240 0.023 C 11.163 0.032,10.902 0.059,10.660 0.083 C 8.655 0.283,6.508 1.126,4.864 2.359 C 1.664 4.759,-0.112 8.429,0.014 12.380 C 0.186 17.781,3.898 22.355,9.165 23.656 C 12.254 24.420,15.649 23.876,18.340 22.186 C 21.026 20.500,22.905 17.899,23.657 14.831 C 23.915 13.779,23.975 13.243,23.975 12.000 C 23.975 10.757,23.915 10.221,23.657 9.169 C 22.468 4.316,18.472 0.747,13.500 0.096 C 13.074 0.040,11.524 -0.010,11.240 0.023 M13.423 1.096 C 15.365 1.360,17.045 2.049,18.640 3.235 C 19.246 3.686,20.314 4.754,20.765 5.360 C 21.974 6.985,22.655 8.674,22.927 10.720 C 22.992 11.211,22.992 12.789,22.927 13.280 C 22.751 14.605,22.431 15.684,21.880 16.820 C 21.329 17.955,20.715 18.807,19.761 19.762 C 18.808 20.717,17.910 21.362,16.780 21.903 C 13.030 23.699,8.714 23.272,5.367 20.774 C 4.759 20.319,3.690 19.251,3.231 18.637 C 2.217 17.283,1.536 15.766,1.224 14.170 C 1.058 13.323,1.023 12.943,1.023 12.000 C 1.023 11.057,1.058 10.677,1.224 9.830 C 1.536 8.234,2.217 6.717,3.231 5.363 C 3.685 4.756,4.756 3.685,5.363 3.231 C 6.958 2.037,8.840 1.283,10.720 1.083 C 10.951 1.059,11.203 1.032,11.280 1.023 C 11.574 0.990,13.000 1.038,13.423 1.096 "
                stroke="none"
                fillRule="evenodd"
            ></Path>
        </SvgIcon>
    );
}