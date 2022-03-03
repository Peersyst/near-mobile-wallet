import CountdownButton from "module/common/component/input/CountdownButton/CountdownButton";
import { render } from "test-utils";
import { waitFor } from "@testing-library/react-native";

describe("CountdownButton tests", () => {
    test("Renders correctly", async () => {
        const screen = render(<CountdownButton seconds={2}>Button content</CountdownButton>);
        expect(screen.getByText("... 2s"));
        await waitFor(() => screen.getByText("... 1s"));
        await waitFor(() => expect(screen.getByText("Button content")));
    });
});
