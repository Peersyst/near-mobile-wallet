import { render, translate } from "test-utils";
import TransactionCard from "module/transaction/component/display/TransactionCard/TransactionCard";
import { transaction } from "mocks/transaction";
import * as Recoil from "recoil";
import * as useGetTokenPrice from "module/token/query/useGetTokenPrice";
import { TX_LABEL } from "module/transaction/component/display/TransactionLabel/utils/TX_LABEL";

describe("TransactionCard tests", () => {
    beforeAll(() => {
        jest.spyOn(Recoil, "useRecoilValue").mockReturnValue({ fiat: "eur" });
        jest.spyOn(useGetTokenPrice, "useGetTokenPrice").mockReturnValue({ data: 10 } as any);
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test("Renders correctly with amount", async () => {
        const screen = render(<TransactionCard transaction={transaction} />);
        expect(screen.getByText("29/01/2022 - 00:00")).toBeDefined();
        expect(screen.getByText(translate(TX_LABEL[transaction.type]))).toBeDefined();
        expect(screen.getByTestId("ArrowUpCircleIcon")).toBeDefined();
    });
});
