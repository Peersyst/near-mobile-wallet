import Svg, { Path, Defs, LinearGradient, Stop, SvgProps } from "react-native-svg";

export function BaseDialogIcon(props: SvgProps): JSX.Element {
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <Path
                fill="url(#paint0_linear_14_8)"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.2853 21.6876C19.2284 20.6236 22.9332 16.2278 22.9332 10.9666C22.9332 4.90992 18.0233 0 11.9666 0C5.90992 0 1 4.90992 1 10.9666C1 16.2335 4.71286 20.6332 9.664 21.6911L11.9708 24L14.2853 21.6876Z"
            />
            <Defs>
                <LinearGradient id="paint0_linear_14_8" x1="1" y1="12.0001" x2="22.9332" y2="12.0001" gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#6B6EF9" />
                    <Stop offset="1" stopColor="#A463B0" />
                </LinearGradient>
            </Defs>
        </Svg>
    );
}
