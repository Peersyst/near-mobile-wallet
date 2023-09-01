import { DAppMock } from "mocks/common/signer/DApp.mock";
import DisconnectableDAppList from "module/signer/components/display/DisconnectableDAppList/DisconnectableDAppList";
import { render, screen, translate } from "test-utils";

describe("DisconnectableDAppList", () => {
    test("Renders correctly dApps", () => {
        const dapps = [new DAppMock(), new DAppMock()];

        render(<DisconnectableDAppList dapps={dapps} />);

        expect(screen.getAllByText("name")).toHaveLength(2);
        expect(screen.getAllByText("description")).toHaveLength(2);
        expect(screen.getAllByText("#dex")).toHaveLength(2);
    });

    test("Renders correctly without dapps", () => {
        render(<DisconnectableDAppList dapps={[]} />);

        expect(screen.getByText(translate("noDApps"))).toBeDefined();
        expect(screen.getByText(translate("noDAppsDescription"))).toBeDefined();
    });
});
