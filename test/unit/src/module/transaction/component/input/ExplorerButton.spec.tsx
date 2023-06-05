import ExplorerButton from "module/transaction/component/input/ExplorerButton/ExplorerButton";
import { MOCKED_ADDRESS } from "test-mocks";
import { fireEvent, render, screen, translate } from "test-utils";
import { Linking } from "react-native";
import { config } from "config";

describe("Explorer button test", () => {
    test("Renders correctly without icon and default label", () => {
        render(<ExplorerButton type="tx" address={MOCKED_ADDRESS} />);
        expect(screen.getByRole("button", { name: translate("seeInExplorer") })).toBeDefined();
    });

    test("Renders correctly with custom label and icon", () => {
        const label = "label";
        render(<ExplorerButton type="tx" address={MOCKED_ADDRESS} showIcon label={label} />);
        expect(screen.getByRole("button", { name: label })).toBeDefined();
        expect(screen.getByTestId("ExternalLinkIcon")).toBeDefined();
    });

    test("Opens explorer link correctly", () => {
        const mockedLinking = jest.fn();
        const txHash = "OxTx";
        jest.spyOn(Linking, "openURL").mockImplementation(mockedLinking);
        render(<ExplorerButton type="tx" address={txHash} />);
        const btn = screen.getByRole("button", { name: translate("seeInExplorer") });
        expect(btn).toBeDefined();
        fireEvent.press(btn);
        expect(mockedLinking).toHaveBeenCalledWith(config.testnetExplorerLink + "/transactions/" + txHash);
    });
});
