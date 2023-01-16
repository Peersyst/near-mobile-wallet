import { ReactElement } from "react";
import { AlertType, useTheme } from "@peersyst/react-components-core";
import { ActivityIndicator } from "react-native";

export default function useGetAlertIcon(type: AlertType | undefined): ReactElement | undefined {
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
