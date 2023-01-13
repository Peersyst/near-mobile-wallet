import NftAmountTextField from "module/transaction/component/input/AssetAmountTextField/NftAmountTextField/NftAmountTextField";
import { render, screen, translate } from "test-utils";

describe("NftAmountTextField Test", () => {
    test("Renders correctly", () => {
        render(<NftAmountTextField placeholder="Enter amount" />);
        const input = screen.getByPlaceholderText("Enter amount");
        expect(input).toBeDefined();
        expect(input.props.value).toBe("1");
        expect(input.props.editable).toBe(false);
        expect(translate("send_only_one_nft")).toBeDefined();
    });
});
