import { SvgIcon, SvgIconProps } from "@peersyst/react-native-components";
import { Path } from "react-native-svg";

export function ScanIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "ScanIcon" }}
        >
            <Path d="M2.61382 8.17155C2.41108 8.16749 2.21823 8.08316 2.0776 7.93707C1.93696 7.79098 1.86003 7.59506 1.86368 7.39231V2.5814C1.85175 1.90995 2.10653 1.26116 2.57219 0.777262C3.03785 0.293368 3.67637 0.0138546 4.34779 0L9.3751 0C9.57785 0.00406128 9.7707 0.0883903 9.91133 0.234481C10.052 0.380571 10.1289 0.576489 10.1252 0.779238C10.1289 0.981988 10.052 1.17791 9.91133 1.324C9.7707 1.47009 9.57785 1.55442 9.3751 1.55848H4.34779C4.21597 1.56072 4.08589 1.589 3.96504 1.6417C3.84419 1.69439 3.73495 1.77046 3.6436 1.86552C3.55225 1.96059 3.4806 2.07278 3.43277 2.19563C3.38493 2.31849 3.36186 2.44959 3.36488 2.5814V7.39231C3.36853 7.59506 3.2916 7.79098 3.15096 7.93707C3.01032 8.08316 2.81748 8.16749 2.61473 8.17155" />
            <Path d="M21.3876 8.17155C21.5903 8.16749 21.7832 8.08316 21.9238 7.93707C22.0645 7.79098 22.1414 7.59506 22.1377 7.39231V2.5814C22.1497 1.90995 21.8949 1.26116 21.4292 0.777262C20.9636 0.293368 20.325 0.0138546 19.6536 0L14.6272 0C14.4245 0.00406128 14.2316 0.0883903 14.091 0.234481C13.9504 0.380571 13.8734 0.576489 13.8771 0.779238C13.8734 0.981988 13.9504 1.17791 14.091 1.324C14.2316 1.47009 14.4245 1.55442 14.6272 1.55848H19.6536C19.7855 1.5606 19.9157 1.5888 20.0367 1.64144C20.1576 1.69408 20.267 1.77013 20.3584 1.86521C20.4498 1.96028 20.5216 2.07251 20.5695 2.19543C20.6174 2.31834 20.6405 2.44952 20.6374 2.5814V7.39231C20.6338 7.59506 20.7107 7.79098 20.8514 7.93707C20.992 8.08316 21.1848 8.16749 21.3876 8.17155" />
            <Path d="M21.3869 12.1021C21.5897 12.1061 21.7825 12.1904 21.9232 12.3365C22.0638 12.4826 22.1407 12.6785 22.1371 12.8813V17.6931C22.149 18.3646 21.8942 19.0133 21.4286 19.4972C20.9629 19.9811 20.3244 20.2607 19.653 20.2745H14.6266C14.4244 20.2676 14.2328 20.1824 14.0922 20.037C13.9516 19.8915 13.873 19.6971 13.873 19.4948C13.873 19.2925 13.9516 19.0981 14.0922 18.9527C14.2328 18.8072 14.4244 18.722 14.6266 18.7151H19.653C19.7848 18.713 19.9149 18.6848 20.0358 18.6322C20.1567 18.5797 20.266 18.5037 20.3574 18.4087C20.4489 18.3137 20.5206 18.2016 20.5686 18.0788C20.6165 17.956 20.6397 17.8249 20.6368 17.6931V12.8813C20.6331 12.6785 20.7101 12.4826 20.8507 12.3365C20.9913 12.1904 21.1842 12.1061 21.3869 12.1021" />
            <Path d="M2.61382 12.1021C2.41108 12.1061 2.21823 12.1904 2.0776 12.3365C1.93696 12.4826 1.86003 12.6785 1.86368 12.8813V17.6931C1.85175 18.3646 2.10653 19.0133 2.57219 19.4972C3.03785 19.9811 3.67637 20.2607 4.34779 20.2745H9.3751C9.57728 20.2676 9.76888 20.1824 9.90946 20.037C10.05 19.8915 10.1286 19.6971 10.1286 19.4948C10.1286 19.2925 10.05 19.0981 9.90946 18.9527C9.76888 18.8072 9.57728 18.722 9.3751 18.7151H4.34779C4.21605 18.7129 4.08604 18.6846 3.96525 18.632C3.84446 18.5794 3.73526 18.5034 3.64393 18.4084C3.55259 18.3134 3.48092 18.2013 3.43303 18.0786C3.38514 17.9558 3.36198 17.8248 3.36488 17.6931V12.8813C3.36853 12.6785 3.2916 12.4826 3.15096 12.3365C3.01032 12.1904 2.81748 12.1061 2.61473 12.1021" />
            <Path d="M23.2312 10.9066H0.769691C0.565556 10.9066 0.369782 10.8255 0.225437 10.6811C0.0810922 10.5368 0 10.341 0 10.1369C0 9.93274 0.0810922 9.73697 0.225437 9.59262C0.369782 9.44828 0.565556 9.36719 0.769691 9.36719H23.2285C23.4326 9.36719 23.6284 9.44828 23.7727 9.59262C23.9171 9.73697 23.9982 9.93274 23.9982 10.1369C23.9982 10.341 23.9171 10.5368 23.7727 10.6811C23.6284 10.8255 23.4326 10.9066 23.2285 10.9066" />
        </SvgIcon>
    );
}
