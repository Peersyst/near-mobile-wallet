import { useTheme } from "@peersyst/react-native-styled";
import { ReactElement } from "react";
import { ToastType } from "../Toast.types";
import { ActivityIndicator } from "react-native";

export function useGetIcon(type: ToastType | undefined): ReactElement | undefined {
    const {
        icons: { info: Info, warning: Warning, error: Error, success: Success },
    } = useTheme();

    if (!type) return undefined;

    switch (type) {
        case "info":
            return <Info />;
        case "warning":
            return <Warning />;
        case "error":
            return <Error />;
        case "success":
            return <Success />;
        case "loading":
            return <ActivityIndicator />;
    }
}
