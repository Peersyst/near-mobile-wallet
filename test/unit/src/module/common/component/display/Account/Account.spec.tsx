import Account from "module/wallet/component/display/Account/Account";
import { MOCKED_NAMED_ADDRESS } from "test-mocks";
import { render, screen, translate } from "test-utils";

describe("Test for the account acomponent", () => {
    test("Displays imported correctly", () => {
        render(<Account address={MOCKED_NAMED_ADDRESS} imported variant={"h1Strong"} />);
        expect(screen.getByText(translate("imported").toUpperCase())).toBeDefined();
        expect(screen.getByText(MOCKED_NAMED_ADDRESS)).toBeDefined();
    });

    test("Do not displays imported", () => {
        render(<Account address={MOCKED_NAMED_ADDRESS} imported={false} variant={"h1Strong"} />);
        expect(screen.queryByText(translate("imported").toUpperCase())).toBeNull();
        expect(screen.getByText(MOCKED_NAMED_ADDRESS)).toBeDefined();
    });
});
