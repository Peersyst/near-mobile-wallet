import { UseRecommendedDAppsMock } from "mocks/common/signer/queries/useRecommendedDApps.mock";
import RecommendedDApps from "module/signer/containers/RecommendedDApps/RecommendedDApps";
import { render, screen, translate } from "test-utils";

describe("RecommendedDApps", () => {
    test("Renders correctly", () => {
        new UseRecommendedDAppsMock();

        render(<RecommendedDApps />);

        expect(screen.getAllByText("name")).toHaveLength(1);
        expect(screen.getAllByText("description")).toHaveLength(1);
        expect(screen.getAllByText("#dex")).toHaveLength(1);

        expect(screen.getByPlaceholderText(translate("search"))).toBeDefined();
        expect(screen.getByText(translate("all"))).toBeDefined();
    });
});
