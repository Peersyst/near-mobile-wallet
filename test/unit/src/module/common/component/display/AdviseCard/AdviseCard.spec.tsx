import { render } from "test-utils";
import AdviseCard from "module/common/component/display/AdviseCard/AdviseCard";
import { act, fireEvent } from "@testing-library/react-native";
import { translate } from "locale";

describe("AdviseCard tests", () => {
    test("Renders correctly", async () => {
        jest.useFakeTimers();
        const handleNext = jest.fn();
        const handleBack = jest.fn();
        const screen = render(<AdviseCard number={1} totalAdvises={3} text="Advise text" onNext={handleNext} onBack={handleBack} />);

        expect(screen.getByText("Advise 1")).toBeDefined();
        expect(screen.getByText("1/3")).toBeDefined();
        expect(screen.getByText("Advise text")).toBeDefined();
        expect(screen.getByText("... 5s")).toBeDefined();

        const backButton = screen.getByTestId("BackIcon");
        fireEvent.press(backButton);
        expect(handleBack).toHaveBeenCalled();

        act(() => jest.runAllTimers());
        const nextButton = screen.getByText(translate("next"));
        fireEvent.press(nextButton);
        expect(handleNext).toHaveBeenCalled();
        jest.useRealTimers();
    });
});
