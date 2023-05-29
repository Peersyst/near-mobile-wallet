import { act, render, translate } from "test-utils";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import LoadingModal from "module/common/component/feedback/LoadingModal/LoadingModal";

const SuccessLoadingModal = (): JSX.Element => {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setSuccess(true);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <LoadingModal loading={loading} success={success} error={false}>
            <Text>Hello</Text>
        </LoadingModal>
    );
};

const ErrorLoadingModal = (): JSX.Element => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setError(true);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <LoadingModal loading={loading} success={false} error={error}>
            <Text>Hello</Text>
        </LoadingModal>
    );
};

describe("LoadingModal tests", () => {
    test("Renders correctly on success", () => {
        jest.useFakeTimers();
        const screen = render(<SuccessLoadingModal />);

        expect(screen.getByTestId("Logo")).toBeDefined();
        expect(screen.getByText(translate("processing"))).toBeDefined();
        act(() => jest.runAllTimers());
        expect(screen.getByTestId("CircleCheckIcon")).toBeDefined();
        act(() => jest.runAllTimers());
        expect(screen.getByText("Hello")).toBeDefined();
        jest.useRealTimers();
    });

    test("Renders correctly on error", () => {
        jest.useFakeTimers();
        const screen = render(<ErrorLoadingModal />);

        expect(screen.getByTestId("Logo")).toBeDefined();
        act(() => jest.runAllTimers());
        expect(screen.queryByTestId("CircleCheckIcon")).toBeNull();
        expect(screen.getByTestId("Logo")).toBeDefined();
        act(() => jest.runAllTimers());
        //Modal has been closed
        expect(screen.queryByText("Hello")).toBeNull();
        jest.useRealTimers();
    });
});
