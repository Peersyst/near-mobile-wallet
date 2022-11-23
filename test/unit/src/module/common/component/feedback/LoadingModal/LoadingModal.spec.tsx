import { act, render, translate } from "test-utils";
import { useEffect, useState } from "react";
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
    test("Renders correctly on success", () => {
        jest.useFakeTimers();
        const screen = render(<SuccessLoadingModal />);

        expect(screen.getByTestId("LinearBgLogo")).toBeDefined();
        expect(screen.getByText(translate("processing"))).toBeDefined();
        act(() => jest.runAllTimers());
        expect(screen.getByTestId("CircleCheckIcon")).toBeDefined();
        act(() => jest.runAllTimers());
        jest.useRealTimers();
    });

    test("Renders correctly on error", () => {
        jest.useFakeTimers();
        const screen = render(<ErrorLoadingModal />);

        expect(screen.getByTestId("LinearBgLogo")).toBeDefined();
        act(() => jest.runAllTimers());
        expect(screen.queryByTestId("CircleCheckIcon")).toBeNull();
        expect(screen.getByTestId("LinearBgLogo")).toBeDefined();
        act(() => jest.runAllTimers());
        jest.useRealTimers();
    });
});
