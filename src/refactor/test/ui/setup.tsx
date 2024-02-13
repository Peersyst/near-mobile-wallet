import "@testing-library/jest-native";

import "refactor/common/polyfills";

import "react-native-gesture-handler/jestSetup";

import "@testing-library/jest-native/extend-expect";

import "./mocks/adapter/ControllerFactory.mock";
// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

/*
 * Suppress `TypeError: Cannot read properties of undefined (reading 'ignoreLogs')` error
 * @see https://stackoverflow.com/a/77069329
 */
jest.mock("react-native/Libraries/LogBox/LogBox", () => ({
    __esModule: true,
    default: {
        ignoreLogs: jest.fn(),
        ignoreAllLogs: jest.fn(),
    },
}));

jest.mock("@react-navigation/native", () => ({
    __esModule: true,
    ...jest.requireActual("@react-navigation/native"),
    StackActions: {
        replace: jest.fn(),
        push: jest.fn(),
        pop: jest.fn(),
        popToTop: jest.fn(),
    },
}));

jest.mock("expo-localization", () => ({
    ...jest.requireActual("expo-localization"),
    digitGroupingSeparator: ",",
    decimalSeparator: ".",
}));

import { BackdropProps } from "@peersyst/react-native-components";

jest.mock("@peersyst/react-native-components", () => {
    const MockBackdrop = ({ children, onOpen, onClose, onExited, onEntered }: BackdropProps) => {
        const handleClose = () => {
            onClose?.();
            onExited?.();
        };
        onOpen?.();
        onEntered?.();

        return <>{typeof children === "function" ? children(true, jest.fn(handleClose)) : children}</>;
    };
    return {
        __esModule: true,
        Backdrop: MockBackdrop,
        ...jest.requireActual("@peersyst/react-native-components"),
    };
});

jest.mock("react-i18next", () => {
    return {
        __esModule: true,
        ...jest.requireActual("react-i18next"),
    };
});

// react-native-reanimated mock
(global as any).ReanimatedDataMock = {
    now: () => 0,
};
