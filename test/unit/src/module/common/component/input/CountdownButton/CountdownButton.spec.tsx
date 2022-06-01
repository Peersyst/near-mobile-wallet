import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { render } from "test-utils";
import { act } from "@testing-library/react-native";

describe("CountdownButton tests", () => {
    test("Renders correctly", async () => {
        const handleCountdownEnd = jest.fn();
        jest.useFakeTimers();
        const screen = render(
            <CountdownButton seconds={2} onCountdownEnd={handleCountdownEnd}>
                Button content
            </CountdownButton>,
        );
        expect(screen.getByText("... 2s")).toBeDefined();
        act(() => jest.runOnlyPendingTimers());
        expect(screen.getByText("... 1s")).toBeDefined();
        act(() => jest.runOnlyPendingTimers());
        expect(screen.queryByText("... 1s")).toBeNull();
        expect(screen.getByText("Button content")).toBeDefined();
        expect(handleCountdownEnd).toHaveBeenCalled();
        jest.useRealTimers();
    });
});
