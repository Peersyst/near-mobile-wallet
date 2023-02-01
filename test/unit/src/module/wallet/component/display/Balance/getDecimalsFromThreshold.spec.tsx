import { BalanceThreshold } from "module/wallet/component/display/Balance/Balance.types";
import { getDecimalsFromThreshold } from "module/wallet/component/display/Balance/utils/getDecimalsFromThreshol";

const THRESHOLDS: BalanceThreshold[] = [
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

describe("Gives the correct decimals for each threshold", () => {
    describe("0 decimals - From 100000 up to the moon", () => {
        test("Gives 0 decimals with a very large number", () => {
            expect(getDecimalsFromThreshold("100000000000000234234234234234234234234234", THRESHOLDS)).toBe(THRESHOLDS[0].decimals);
            expect(getDecimalsFromThreshold("1000000023234234.23423423423", THRESHOLDS)).toBe(THRESHOLDS[0].decimals);
        });
        test("Gives 0 decimals with some numbers that belong to the threshold", () => {
            expect(getDecimalsFromThreshold("1000000000234", THRESHOLDS)).toBe(THRESHOLDS[0].decimals);
            expect(getDecimalsFromThreshold((THRESHOLDS[0].value * 2).toString(), THRESHOLDS)).toBe(THRESHOLDS[0].decimals);
            expect(getDecimalsFromThreshold((THRESHOLDS[0].value + 100).toString(), THRESHOLDS)).toBe(THRESHOLDS[0].decimals);
            expect(getDecimalsFromThreshold((THRESHOLDS[0].value + 1).toString(), THRESHOLDS)).toBe(THRESHOLDS[0].decimals);
            expect(getDecimalsFromThreshold((THRESHOLDS[0].value + 2.12342134213412342314).toString(), THRESHOLDS)).toBe(
                THRESHOLDS[0].decimals,
            );
        });
        test("Gives 0 decimals with the large number of the threshold", () => {
            expect(getDecimalsFromThreshold(THRESHOLDS[0].value.toString(), THRESHOLDS)).toBe(THRESHOLDS[0].decimals);
        });
    });

    describe("2 decimals - from 100 up to below 100000 (99999.9999999999999...)", () => {
        test("Gives 2 decimals because of the change of the threshold", () => {
            expect(getDecimalsFromThreshold((THRESHOLDS[0].value - 1).toString(), THRESHOLDS)).toBe(THRESHOLDS[1].decimals);
        });
        test("Gives 2 decimals with some numbers that belong to the threshold", () => {
            expect(getDecimalsFromThreshold((THRESHOLDS[0].value - 100).toString(), THRESHOLDS)).toBe(THRESHOLDS[1].decimals);
            expect(getDecimalsFromThreshold("1200", THRESHOLDS)).toBe(THRESHOLDS[1].decimals);
            expect(getDecimalsFromThreshold("182.000213123123121", THRESHOLDS)).toBe(THRESHOLDS[1].decimals);
            expect(getDecimalsFromThreshold((THRESHOLDS[1].value + 1).toString(), THRESHOLDS)).toBe(THRESHOLDS[1].decimals);
            expect(getDecimalsFromThreshold("102.1231234213421342134213412342134231423142314323214123", THRESHOLDS)).toBe(
                THRESHOLDS[1].decimals,
            );
            expect(getDecimalsFromThreshold((THRESHOLDS[1].value + 0.00000000000001).toString(), THRESHOLDS)).toBe(THRESHOLDS[1].decimals);
        });
        test("Gives 2 decimals with the large number of the threshold", () => {
            expect(getDecimalsFromThreshold(THRESHOLDS[1].value.toString(), THRESHOLDS)).toBe(THRESHOLDS[1].decimals);
        });
    });
    describe("4 decimals - from 1 up to below 100 (99.9999999999999...)", () => {
        test("Gives 4 decimals because of the change of the threshold", () => {
            expect(getDecimalsFromThreshold((THRESHOLDS[1].value - 1).toString(), THRESHOLDS)).toBe(THRESHOLDS[2].decimals);
        });
        test("Gives 4 decimals with some numbers that belong to the threshold", () => {
            expect(getDecimalsFromThreshold((THRESHOLDS[1].value - 10).toString(), THRESHOLDS)).toBe(THRESHOLDS[2].decimals);
            expect(getDecimalsFromThreshold("12", THRESHOLDS)).toBe(THRESHOLDS[2].decimals);
            expect(getDecimalsFromThreshold("66.666666354325234", THRESHOLDS)).toBe(THRESHOLDS[2].decimals);
            expect(getDecimalsFromThreshold("18.000213123123121", THRESHOLDS)).toBe(THRESHOLDS[2].decimals);
            expect(getDecimalsFromThreshold((THRESHOLDS[2].value + 1).toString(), THRESHOLDS)).toBe(THRESHOLDS[2].decimals);
            expect(getDecimalsFromThreshold("2.1231234213421342134213412342134231423142314323214123", THRESHOLDS)).toBe(
                THRESHOLDS[2].decimals,
            );
            expect(getDecimalsFromThreshold((THRESHOLDS[2].value + 0.00000000000001).toString(), THRESHOLDS)).toBe(THRESHOLDS[2].decimals);
        });
        test("Gives 4 decimals with the large number of the threshold", () => {
            expect(getDecimalsFromThreshold(THRESHOLDS[2].value.toString(), THRESHOLDS)).toBe(THRESHOLDS[2].decimals);
        });
    });
    describe("6 decimals - from 0.00001 up to below 1 (0.9999999999999...)", () => {
        test("Gives 6 decimals because of the change of the threshold", () => {
            expect(getDecimalsFromThreshold((THRESHOLDS[2].value - 0.0000000000000001).toString(), THRESHOLDS)).toBe(
                THRESHOLDS[3].decimals,
            );
        });
        test("Gives 6 decimals with some numbers that belong to the threshold", () => {
            expect(getDecimalsFromThreshold((THRESHOLDS[2].value - 0.1).toString(), THRESHOLDS)).toBe(THRESHOLDS[3].decimals);
            expect(getDecimalsFromThreshold("0.1", THRESHOLDS)).toBe(THRESHOLDS[3].decimals);
            expect(getDecimalsFromThreshold((0.09818).toString(), THRESHOLDS)).toBe(THRESHOLDS[3].decimals);
            expect(getDecimalsFromThreshold("0.666666354325234", THRESHOLDS)).toBe(THRESHOLDS[3].decimals);
            expect(getDecimalsFromThreshold("0.000213123123121", THRESHOLDS)).toBe(THRESHOLDS[3].decimals);
            expect(getDecimalsFromThreshold("0.00001231234213421342134213412342134231423142314323214123", THRESHOLDS)).toBe(
                THRESHOLDS[3].decimals,
            );
            expect(getDecimalsFromThreshold((THRESHOLDS[3].value + 0.00000000000001).toString(), THRESHOLDS)).toBe(THRESHOLDS[3].decimals);
        });
        test("Gives 6 decimals with the large number of the threshold", () => {
            expect(getDecimalsFromThreshold(THRESHOLDS[3].value.toString(), THRESHOLDS)).toBe(THRESHOLDS[3].decimals);
        });
    });

    describe("-1 - below 0.00001 (0.00000999999...)", () => {
        test("Gives -1 decimals because of the change of the threshold", () => {
            expect(getDecimalsFromThreshold((THRESHOLDS[3].value - 0.0000000000000001).toString(), THRESHOLDS)).toBe(-1);
        });

        test("Gives -1 decimals with some numbers that belong to the threshold", () => {
            expect(getDecimalsFromThreshold("0.0000000000000000000000001".toString(), THRESHOLDS)).toBe(-1);
        });
    });
});
