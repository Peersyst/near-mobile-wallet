import Balance from "module/wallet/component/display/Balance/Balance";
import { ACTION_LABEL } from "module/wallet/component/display/Balance/constants/actionLabels";
import { BALANCE_THRESHOLDS } from "module/wallet/component/display/Balance/constants/balanceThresholds";
import { CURRENCY_UNIT } from "module/wallet/component/display/Balance/constants/currencies";
import { render } from "test-utils";

describe("Text for the Balance component", () => {
    describe("Renders actions and units correctly", () => {
        test("Renders correctly", () => {
            const screen = render(<Balance balance={"100"} variant={"body2Strong"} />);
            expect(screen.getByText("100")).toBeDefined();
        });
        test("Renders correctly near", () => {
            const screen = render(<Balance balance={"100"} variant={"body2Strong"} units="token" />);
            expect(screen.getByText("100 NEAR")).toBeDefined();
        });
        test("Renders correctly eur", () => {
            const screen = render(<Balance balance={"100"} variant={"body2Strong"} units="eur" />);
            expect(screen.getByText("100 " + CURRENCY_UNIT["eur"])).toBeDefined();
        });
        test("Renders correctly dollar", () => {
            const screen = render(<Balance balance={"100"} variant={"body2Strong"} units="usd" action="add" />);
            expect(screen.getByText(ACTION_LABEL["add"] + "100 " + CURRENCY_UNIT["usd"])).toBeDefined();
        });
        test("Renders correctly round", () => {
            const screen = render(<Balance action="round" balance={"100"} variant={"body2Strong"} units="usd" />);
            expect(screen.getByText(ACTION_LABEL["round"] + "100 " + CURRENCY_UNIT["usd"])).toBeDefined();
        });
        test("Renders correctly less", () => {
            const screen = render(<Balance action="less" balance={"100"} variant={"body2Strong"} units="usd" />);
            expect(screen.getByText(ACTION_LABEL["less"] + "100 " + CURRENCY_UNIT["usd"])).toBeDefined();
        });

        test("Renders correctly with a negative value", () => {
            const screen = render(<Balance balance={"-100"} variant={"body2Strong"} units="usd" />);
            expect(screen.getByText("-100 " + CURRENCY_UNIT["usd"])).toBeDefined();
        });
        test("Renders correctly when loading", () => {
            const screen = render(<Balance balance={"100"} variant={"body2Strong"} isLoading />);
            expect(screen.getByTestId("ActivityIndicator")).toBeDefined();
        });
    });

    describe("Renders correctly in the desired decimal format", () => {
        test("Renders a large number omiting decimals", () => {
            const screen = render(<Balance balance={"235324532453425.20"} variant={"body2Strong"} />);
            expect(screen.getByText("235,324,532,453,425")).toBeDefined();
        });

        test("Renders a large number omiting decimals", () => {
            const screen = render(<Balance balance={BALANCE_THRESHOLDS[0].value} variant={"body2Strong"} />);
            expect(screen.getByText("100,000")).toBeDefined();
        });

        test("Renders a large number omiting decimals", () => {
            const screen = render(<Balance balance={BALANCE_THRESHOLDS[0].value - 1} variant={"body2Strong"} />);
            expect(screen.getByText("99,999")).toBeDefined();
        });

        test("Renders a large number omiting decimals", () => {
            const screen = render(<Balance balance={10000} variant={"body2Strong"} />);
            expect(screen.getByText("10,000")).toBeDefined();
        });

        test("Renders a large number omiting decimals", () => {
            const screen = render(<Balance balance={BALANCE_THRESHOLDS[0].value - 1.45} variant={"body2Strong"} />);
            screen.debug();
            expect(screen.getByText("99,998.55")).toBeDefined();
        });

        test("Renders correctly with 2 decimals max", () => {
            const screen = render(<Balance balance={"100.2"} variant={"body2Strong"} />);
            expect(screen.getByText("100.2")).toBeDefined();
        });

        test("Renders correctly with 2 decimals max", () => {
            const screen = render(<Balance balance={"100.22"} variant={"body2Strong"} />);
            expect(screen.getByText("100.22")).toBeDefined();
        });

        test("Renders correctly with 2 decimals max", () => {
            const screen = render(<Balance balance={"100.223"} variant={"body2Strong"} />);
            expect(screen.getByText("100.22")).toBeDefined();
        });

        test("Renders correctly with 2 decimals max rounds up", () => {
            const screen = render(<Balance balance={"100.227"} variant={"body2Strong"} />);
            expect(screen.getByText("100.23")).toBeDefined();
        });

        test("Renders correctly with 2 decimals max rounds up", () => {
            const screen = render(<Balance balance={"100.227"} variant={"body2Strong"} />);
            expect(screen.getByText("100.23")).toBeDefined();
        });

        test("Renders correctly zero", () => {
            const screen = render(<Balance balance={"0.0000"} variant={"body2Strong"} />);
            expect(screen.getByText("0")).toBeDefined();
        });

        test("Renders correctly zero", () => {
            const screen = render(<Balance balance={"0.0000"} variant={"body2Strong"} />);
            expect(screen.getByText("0")).toBeDefined();
        });

        test("Allows to customize custom decimals", () => {
            const screen = render(
                <Balance balance={"100.2"} options={{ minimumFractionDigits: 4, maximumFractionDigits: 4 }} variant={"body2Strong"} />,
            );
            expect(screen.getByText("100.2000")).toBeDefined();
        });
    });
});
