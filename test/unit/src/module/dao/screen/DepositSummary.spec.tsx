import { formatHash } from "@peersyst/react-utils";
import DepositSummary from "module/dao/screen/DepositConfirmationScreen/DepositSummary";
import { render, SuccessApiCall, waitFor, translate } from "test-utils";
import { MockedDAOBalance } from "mocks/DAO";
import * as UseGetDaoInfo from "module/dao/query/useGetDaoInfo";
import daoInfo from "mocks/daoInfo";
import { config } from "config";
import { UseGetServiceInstanceMock, UseWalletStateMock } from "test-mocks";

describe("Test for the DepositSummary", () => {
    const { serviceInstance } = new UseGetServiceInstanceMock();
    new UseWalletStateMock();

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly", async () => {
        jest.spyOn(serviceInstance, "getDAOBalance").mockReturnValue(SuccessApiCall(MockedDAOBalance));

        jest.spyOn(UseGetDaoInfo, "default").mockReturnValue({ data: daoInfo, isLoading: false } as any);
        const screen = render(<DepositSummary senderAddress={"0xMockedAddress"} amount={1000} fee={"0.001"} senderName={"Peersyst"} />);
        expect(screen.getByText(`1,000 ${config.tokenName}`)).toBeDefined();
        expect(screen.getByText(translate("transaction_fee_label") + ":")).toBeDefined();
        expect(screen.getByText(`0.001 ${config.tokenName}`)).toBeDefined();
        //Sender
        expect(screen.getByText(translate("from")));
        expect(screen.getByText("Peersyst" + " - " + formatHash("0xMockedAddress", "middle", 3))).toBeDefined();
        //APC
        expect(screen.getByText(translate("estimated_apc")));
        await waitFor(() => expect(screen.getByText(`${daoInfo.estimated_apc}%`)).toBeDefined());
        //Warning text
        expect(screen.getByText(translate("deposit_summary_warning")));
    });
});
