import { render } from "test-utils";
import AdviseCardGroup from "module/common/component/display/AdviseCardGroup/AdviseCardGroup";
import { act, fireEvent } from "@testing-library/react-native";
import { translate } from "locale";

describe("AdviseCardGroup tests", () => {
    test("Renders correctly", () => {
        jest.useFakeTimers();
        const advises = ["advise 1", "advise 2", "advise 3"];

        const screen = render(<AdviseCardGroup advises={advises.map((advise) => ({ text: advise }))} />);

        expect(screen.getByText(translate("advise") + " 1")).toBeDefined();
        expect(screen.getByText("1/3")).toBeDefined();
        expect(screen.getByText(advises[0])).toBeDefined();
        expect(screen.getByText("... 10s")).toBeDefined();
        act(() => jest.runAllTimers());
        fireEvent.press(screen.getByText(translate("next")));
        expect(screen.getByText(translate("advise") + " 2")).toBeDefined();
        expect(screen.getByText("2/3")).toBeDefined();
        expect(screen.getByText(advises[1])).toBeDefined();
        act(() => jest.runAllTimers());
        fireEvent.press(screen.getByText(translate("next")));
        expect(screen.getByText(translate("advise") + " 3")).toBeDefined();
        expect(screen.getByText("3/3")).toBeDefined();
        expect(screen.getByText(advises[2])).toBeDefined();
        jest.useRealTimers();
    });
});
