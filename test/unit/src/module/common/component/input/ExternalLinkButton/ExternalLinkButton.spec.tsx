import ExternalLinkButton from "module/common/component/input/ExternalLinkButton/ExternalLinkButton";
import { fireEvent, render, screen } from "test-utils";
import { Linking } from "react-native";

describe("ExternalLinkButton test", () => {
    const label = "Visit our website";
    const url = "https://peersyst.com";
    test("Renders correctly", () => {
        render(<ExternalLinkButton label={label} url={url} />);
        expect(screen.getByRole("button", { name: label })).toBeDefined();
    });

    test("Opens website correcly", () => {
        const mockedLinking = jest.fn();
        jest.spyOn(Linking, "openURL").mockImplementation(mockedLinking);
        render(<ExternalLinkButton label={label} url={url} />);
        const btn = screen.getByRole("button", { name: label });
        fireEvent.press(btn);
        expect(mockedLinking).toHaveBeenCalledWith(url);
    });
});
