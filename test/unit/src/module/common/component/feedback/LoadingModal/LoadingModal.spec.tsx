import { act, render } from "test-utils";
import { useEffect, useState } from "react";
import LoadingModal from "module/transaction/component/feedback/LoadingModal/LoadingModal";
import { fireEvent } from "@testing-library/react-native";
import { translate } from "locale";

const SuccessLoadingModal = (): JSX.Element => {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setSuccess(true);
            setLoading(false);
        }, 1000);
    }, []);

    return <LoadingModal loading={loading} success={success} error={false} />;
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

    return <LoadingModal loading={loading} success={false} error={error} />;
};

describe("LoadingModal tests", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("Renders correctly on success", () => {
        const screen = render(<SuccessLoadingModal />);

        expect(screen.getByTestId("LogoIcon")).toBeDefined();
        act(() => jest.runAllTimers());
        expect(screen.getByTestId("SuccessIcon")).toBeDefined();
        fireEvent.press(screen.getByText(translate("go_back")));
        act(() => jest.runAllTimers());
    });

    test("Renders correctly on error", () => {
        const screen = render(<ErrorLoadingModal />);

        expect(screen.getByTestId("LogoIcon")).toBeDefined();
        act(() => jest.runAllTimers());
        expect(screen.queryByTestId("SuccessIcon")).toBeNull();
        expect(screen.getByTestId("LogoIcon")).toBeDefined();
        act(() => jest.runAllTimers());
    });
});
