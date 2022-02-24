import { DefaultTheme } from "./theme.types";
import shadows from "./shadows";
import { typography } from "./typography";
import { CrossIcon, ErrorIcon, HideIcon, InfoIcon, InvalidIcon, ShowIcon, SuccessIcon, WarningIcon } from "../assets/icons";

export const defaultTheme: DefaultTheme = {
    icons: {
        info: InfoIcon,
        error: ErrorIcon,
        success: SuccessIcon,
        warning: WarningIcon,
        invalid: InvalidIcon,
        valid: SuccessIcon,
        hide: HideIcon,
        show: ShowIcon,
        cross: CrossIcon,
    },
    typography,
    palette: {
        mode: "light",
        primary: "rgb(97, 219, 251)",
        disabled: "rgb(149,149,149)",
        background: "rgb(255, 255, 255)",
        backdrop: "rgba(0, 0, 0, 0.5)",
        text: "rgb(0, 0, 0)",
        status: {
            info: "rgb(2, 136, 209)",
            error: "rgb(211, 47, 47)",
            warning: "rgb(237, 108, 2)",
            success: "rgb(46, 125, 50)",
        },
    },
    shadows,
    borderRadius: 5,
    toolbarHeight: 56,
    /*skeletonAnimations: "wave",
    toastAnimation: "fadingSlide",
    toastPosition: "top-right",*/
    zIndex: {
        popover: 10,
        modal: 100,
        selectMenu: 5,
        toast: 9999,
    },
    translate: (w: string) => w,
};
