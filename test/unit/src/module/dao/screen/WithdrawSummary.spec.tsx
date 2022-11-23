import { formatAddress } from "@peersyst/react-utils";
import { translate } from "locale";
import WithdrawSummary from "module/dao/screen/WithdrawConfirmationScreen/WithdrawSummary";
import { render } from "test-utils";
import { FeeRate } from "ckb-peersyst-sdk";
import { convertShannonsToCKB } from "module/wallet/utils/convertShannonsToCKB";

describe("Test for the withdraw summary", () => {
    test("Renders correctly", () => {
        const screen = render(
            <WithdrawSummary
                receiverName={"Peersyst"}
                receiverAddress={"0xMockedAddress"}
                depositAPC={2}
                amount={100}
                fee={convertShannonsToCKB(FeeRate.NORMAL).toString()}
                compensation={120}
            />,
        );
        expect(screen.getByText(translate("destination_wallet") + ":")).toBeDefined();
        expect(screen.getByText("Peersyst" + " - " + formatAddress("0xMockedAddress", "middle", 3))).toBeDefined();
        expect(screen.getByText(translate("deposit_apc") + ":")).toBeDefined();
        expect(screen.getByText("2%")).toBeDefined();
    });
});