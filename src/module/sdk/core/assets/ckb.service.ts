import { TransactionSkeleton } from "@ckb-lumos/helpers";
import { common } from "@ckb-lumos/common-scripts";
import { ConnectionService } from "../connection.service";
import { TransactionService, FeeRate } from "../transaction.service";
import { Cell } from "@ckb-lumos/lumos";

export interface CKBBalance {
    totalBalance: number;
    occupiedBalance: number;
    freeBalance: number;
}

export class CKBService {
    private readonly connection: ConnectionService;
    private readonly transactionService: TransactionService;
    private readonly transferCellSize = BigInt(61 * 10 ** 8);
    private readonly transferData = "0x";

    constructor(connectionService: ConnectionService, transactionService: TransactionService) {
        this.connection = connectionService;
        this.transactionService = transactionService;
    }

    async transfer(from: string, to: string, amount: bigint, privateKey: string, feeRate: FeeRate = FeeRate.NORMAL): Promise<string> {
        if (amount < this.transferCellSize) {
            throw new Error("Minimum transfer (cell) value is 61 CKB");
        }

        let txSkeleton = TransactionSkeleton({ cellProvider: this.connection.getEmptyCellProvider() });
        txSkeleton = await common.transfer(txSkeleton, [from], to, amount, null, null, this.connection.getConfigAsObject());
        txSkeleton = await common.payFeeByFeeRate(txSkeleton, [from], feeRate, null, this.connection.getConfigAsObject());

        return this.transactionService.signTransaction(txSkeleton, [privateKey]);
    }

    async transferFromCells(
        cells: Cell[],
        fromAddresses: string[],
        to: string,
        amount: bigint,
        privateKeys: string[],
        feeRate: FeeRate = FeeRate.NORMAL,
    ): Promise<string> {
        if (amount < this.transferCellSize) {
            throw new Error("Minimum transfer (cell) value is 61 CKB");
        }

        let txSkeleton = TransactionSkeleton({ cellProvider: this.connection.getEmptyCellProvider() });

        // Add output
        const toScript = this.connection.getLockFromAddress(to);
        txSkeleton = txSkeleton.update("outputs", (outputs) => {
            return outputs.push({
                cell_output: {
                    capacity: "0x" + amount.toString(16),
                    lock: toScript,
                },
                data: this.transferData,
            });
        });

        // Inject capacity
        txSkeleton = this.transactionService.addSecp256CellDep(txSkeleton);
        txSkeleton = this.transactionService.injectCapacity(txSkeleton, amount, cells);

        // Pay fee
        txSkeleton = await common.payFeeByFeeRate(txSkeleton, fromAddresses, feeRate, null, this.connection.getConfigAsObject());

        // Get signing private keys
        const signingPrivKeys = this.transactionService.extractPrivateKeys(txSkeleton, fromAddresses, privateKeys);

        return this.transactionService.signTransaction(txSkeleton, signingPrivKeys);
    }

    async getBalance(address: string): Promise<CKBBalance> {
        const collector = this.connection.getIndexer().collector({
            lock: this.connection.getLockFromAddress(address),
        });

        const cells: Cell[] = [];
        for await (const cell of collector.collect()) {
            cells.push(cell);
        }

        return this.getBalanceFromCells(cells);
    }

    getBalanceFromCells(cells: Cell[]): CKBBalance {
        let totalBalanceBI = BigInt(0);
        let occupiedBalanceBI = BigInt(0);

        for (const cell of cells) {
            totalBalanceBI += BigInt(cell.cell_output.capacity);
            if (cell.cell_output.type) {
                occupiedBalanceBI += BigInt(cell.cell_output.capacity);
            }
        }
        const freeBalance = Number(totalBalanceBI - occupiedBalanceBI) / 10 ** 8;
        const totalBalance = Number(totalBalanceBI) / 10 ** 8;
        const occupiedBalance = Number(occupiedBalanceBI) / 10 ** 8;

        return { totalBalance, occupiedBalance, freeBalance };
    }
}
