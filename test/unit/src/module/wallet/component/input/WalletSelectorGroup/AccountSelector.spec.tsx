import { Button, SelectorGroup } from "@peersyst/react-native-components";
import { config } from "config";
import AccountSelector from "module/wallet/component/input/WalletSelectorGroup/AccountSelector";
import { UseServiceInstanceMock, AccountBalanceMock } from "test-mocks";
import { render, screen, waitFor } from "test-utils";

describe("AccountSelector", () => {
    test("renders correctly", async () => {
        const { serviceInstance } = new UseServiceInstanceMock();
        const accountBalance = new AccountBalanceMock({ available: "5" });
        jest.spyOn(serviceInstance, "getAccountBalance").mockResolvedValue(accountBalance);
        console.log(<AccountSelector index={0} account={"acc"} />);
        render(<AccountSelector index={0} account={"acc"} />);
        expect(screen.getByText("acc")).toBeDefined();
        await waitFor(() => expect(screen.getByText("5 " + config.tokenName)).toBeDefined());
    });
});
