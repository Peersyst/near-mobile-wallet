import { BalanceThreshold } from "module/wallet/component/display/Balance/Balance.types";
import { getDecimalsFromThreshold } from "module/wallet/component/display/Balance/utils/getDecimalsFromThreshold";

describe("Gives the correct decimals for each threshold", () => {
    const BALANCE_THRESHOLDS: BalanceThreshold[] = [
        {
            value: 100000,
            decimals: 0,
        },
        {
            value: 100,
            decimals: 2,
        },
        {
            value: 1,
            decimals: 4,
        },
        {
            value: 0.00001,
            decimals: 6,
        },
    ];
    describe("0 decimals - From 100000 up to the moon", () => {
        test("Gives 0 decimals with a very large number", () => {
            expect(getDecimalsFromThreshold("100000000000000234234234234234234234234234", BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[0].decimals,
            );
            expect(getDecimalsFromThreshold("1000000023234234.23423423423", BALANCE_THRESHOLDS)).toBe(BALANCE_THRESHOLDS[0].decimals);
        });
        test("Gives 0 decimals with some numbers that belong to the threshold", () => {
            expect(getDecimalsFromThreshold("1000000000234", BALANCE_THRESHOLDS)).toBe(BALANCE_THRESHOLDS[0].decimals);
            expect(getDecimalsFromThreshold((BALANCE_THRESHOLDS[0].value * 2).toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[0].decimals,
            );
            expect(getDecimalsFromThreshold((BALANCE_THRESHOLDS[0].value + 100).toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[0].decimals,
            );
            expect(getDecimalsFromThreshold((BALANCE_THRESHOLDS[0].value + 1).toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[0].decimals,
            );
            //eslint-disable-next-line @typescript-eslint/no-loss-of-precision
            expect(getDecimalsFromThreshold((BALANCE_THRESHOLDS[0].value + 2.12342134213412342314).toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[0].decimals,
            );
        });
        test("Gives 0 decimals with the large number of the threshold", () => {
            expect(getDecimalsFromThreshold(BALANCE_THRESHOLDS[0].value.toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[0].decimals,
            );
        });
    });

    describe("2 decimals - from 100 up to below 100000 (99999.9999999999999...)", () => {
        test("Gives 2 decimals because of the change of the threshold", () => {
            expect(getDecimalsFromThreshold((BALANCE_THRESHOLDS[0].value - 1).toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[1].decimals,
            );
        });
        test("Gives 2 decimals with some numbers that belong to the threshold", () => {
            expect(getDecimalsFromThreshold((BALANCE_THRESHOLDS[0].value - 100).toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[1].decimals,
            );
            expect(getDecimalsFromThreshold("1200", BALANCE_THRESHOLDS)).toBe(BALANCE_THRESHOLDS[1].decimals);
            expect(getDecimalsFromThreshold("182.000213123123121", BALANCE_THRESHOLDS)).toBe(BALANCE_THRESHOLDS[1].decimals);
            expect(getDecimalsFromThreshold((BALANCE_THRESHOLDS[1].value + 1).toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[1].decimals,
            );
            expect(getDecimalsFromThreshold("102.1231234213421342134213412342134231423142314323214123", BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[1].decimals,
            );
            expect(getDecimalsFromThreshold((BALANCE_THRESHOLDS[1].value + 0.00000000000001).toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[1].decimals,
            );
        });
        test("Gives 2 decimals with the large number of the threshold", () => {
            expect(getDecimalsFromThreshold(BALANCE_THRESHOLDS[1].value.toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[1].decimals,
            );
        });
    });
    describe("4 decimals - from 1 up to below 100 (99.9999999999999...)", () => {
        test("Gives 4 decimals because of the change of the threshold", () => {
            expect(getDecimalsFromThreshold((BALANCE_THRESHOLDS[1].value - 1).toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[2].decimals,
            );
        });
        test("Gives 4 decimals with some numbers that belong to the threshold", () => {
            expect(getDecimalsFromThreshold((BALANCE_THRESHOLDS[1].value - 10).toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[2].decimals,
            );
            expect(getDecimalsFromThreshold("12", BALANCE_THRESHOLDS)).toBe(BALANCE_THRESHOLDS[2].decimals);
            expect(getDecimalsFromThreshold("66.666666354325234", BALANCE_THRESHOLDS)).toBe(BALANCE_THRESHOLDS[2].decimals);
            expect(getDecimalsFromThreshold("18.000213123123121", BALANCE_THRESHOLDS)).toBe(BALANCE_THRESHOLDS[2].decimals);
            expect(getDecimalsFromThreshold((BALANCE_THRESHOLDS[2].value + 1).toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[2].decimals,
            );
            expect(getDecimalsFromThreshold("2.1231234213421342134213412342134231423142314323214123", BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[2].decimals,
            );
            expect(getDecimalsFromThreshold((BALANCE_THRESHOLDS[2].value + 0.00000000000001).toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[2].decimals,
            );
        });
        test("Gives 4 decimals with the large number of the threshold", () => {
            expect(getDecimalsFromThreshold(BALANCE_THRESHOLDS[2].value.toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[2].decimals,
            );
        });
    });
    describe("6 decimals - from 0.00001 up to below 1 (0.9999999999999...)", () => {
        test("Gives 6 decimals because of the change of the threshold", () => {
            expect(getDecimalsFromThreshold((BALANCE_THRESHOLDS[2].value - 0.0000000000000001).toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[3].decimals,
            );
        });
        test("Gives 6 decimals with some numbers that belong to the threshold", () => {
            expect(getDecimalsFromThreshold((BALANCE_THRESHOLDS[2].value - 0.1).toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[3].decimals,
            );
            expect(getDecimalsFromThreshold("0.1", BALANCE_THRESHOLDS)).toBe(BALANCE_THRESHOLDS[3].decimals);
            expect(getDecimalsFromThreshold((0.09818).toString(), BALANCE_THRESHOLDS)).toBe(BALANCE_THRESHOLDS[3].decimals);
            expect(getDecimalsFromThreshold("0.666666354325234", BALANCE_THRESHOLDS)).toBe(BALANCE_THRESHOLDS[3].decimals);
            expect(getDecimalsFromThreshold("0.000213123123121", BALANCE_THRESHOLDS)).toBe(BALANCE_THRESHOLDS[3].decimals);
            expect(getDecimalsFromThreshold("0.00001231234213421342134213412342134231423142314323214123", BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[3].decimals,
            );
            expect(getDecimalsFromThreshold((BALANCE_THRESHOLDS[3].value + 0.00000000000001).toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[3].decimals,
            );
        });
        test("Gives 6 decimals with the large number of the threshold", () => {
            expect(getDecimalsFromThreshold(BALANCE_THRESHOLDS[3].value.toString(), BALANCE_THRESHOLDS)).toBe(
                BALANCE_THRESHOLDS[3].decimals,
            );
        });
    });

    describe("-1 - below 0.00001 (0.00000999999...)", () => {
        test("Gives -1 decimals because of the change of the threshold", () => {
            expect(getDecimalsFromThreshold((BALANCE_THRESHOLDS[3].value - 0.0000000000000001).toString(), BALANCE_THRESHOLDS)).toBe(-1);
        });

        test("Gives -1 decimals with some numbers that belong to the threshold", () => {
            expect(getDecimalsFromThreshold("0.0000000000000000000000001".toString(), BALANCE_THRESHOLDS)).toBe(-1);
        });
    });
});
