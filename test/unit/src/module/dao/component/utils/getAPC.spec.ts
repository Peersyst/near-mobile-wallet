import { DAOBalance } from "ckb-peersyst-sdk";
import { getAPC } from "module/dao/utils/getAPC";

describe("getAPC tests", () => {
    test("No apc", () => {
        const daoBalance: DAOBalance = {
            daoDeposit: 0,
            daoCompensation: 0,
        };
        expect(getAPC(daoBalance)).toEqual(0);
    });
    test("Get the correct APC", () => {
        const daoBalance: DAOBalance = {
            daoDeposit: 100,
            daoCompensation: 30,
        };
        expect(getAPC(daoBalance)).toEqual(30);
    });
});
