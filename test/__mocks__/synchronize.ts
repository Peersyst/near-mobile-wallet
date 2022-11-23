import { Transaction } from "near-peersyst-sdk";

const synchronizeMock = {
    addressMap: new Map<string, string>(),
    firstIndexWithoutTxs: 0,
    lastHashBlock: "0x123",
    accountCellsMap: new Map<number, any[]>(),
    accountTransactionMap: new Map<number, Transaction[]>(),
};

export default synchronizeMock;
