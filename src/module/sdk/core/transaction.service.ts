import { ScriptConfig } from "@ckb-lumos/config-manager";
import { Cell, commons, hd, Script, utils } from "@ckb-lumos/lumos";
import { sealTransaction, TransactionSkeletonType } from "@ckb-lumos/helpers";
import { TransactionWithStatus, values, core, WitnessArgs } from "@ckb-lumos/base";
import { TransactionCollector as TxCollector } from "@ckb-lumos/ckb-indexer";
import { Reader, normalizers } from "@ckb-lumos/toolkit";
import { CKBIndexerQueryOptions } from "@ckb-lumos/ckb-indexer/src/type";
import { ConnectionService } from "./connection.service";
import { Logger } from "../utils/logger";
import { NftService } from "./assets/nft.service";

const { ScriptValue } = values;

export interface ScriptType {
    args: string;
    codeHash: string;
    hashType: string;
}

export interface DataRow {
    quantity: number;
    address: string;
    type?: ScriptType;
    data?: number;
}

export interface Transaction {
    status: TransactionStatus;
    transactionHash: string;
    inputs: DataRow[];
    outputs: DataRow[];
    type: TransactionType;
    scriptType?: ScriptType;
    amount: number;
    blockHash: string;
    blockNumber: number;
    timestamp: Date;
}

export enum TransactionStatus {
    PENDING = "pending",
    PROPOSED = "proposed",
    COMMITTED = "committed",
    REJECTED = "rejected",
}

export enum TransactionType {
    SEND_CKB = "send_ckb",
    RECEIVE_CKB = "receive_ckb",
    SEND_TOKEN = "send_token",
    RECEIVE_TOKEN = "receive_token",
    SEND_NFT = "send_nft",
    RECEIVE_NFT = "receive_nft",
    DEPOSIT_DAO = "deposit_dao",
    WITHDRAW_DAO = "withdraw_dao",
    UNLOCK_DAO = "unlock_dao",
    SMART_CONTRACT_SEND = "smart_contract_send",
    SMART_CONTRACT_RECEIVE = "smart_contract_receive",
}

export enum FeeRate {
    SLOW = 1000,
    NORMAL = 100000,
    FAST = 10000000,
}

export class TransactionService {
    private readonly connection: ConnectionService;
    private readonly nftService: NftService;
    private readonly TransactionCollector: any;
    private readonly logger = new Logger(TransactionService.name);
    private readonly transactionMap = new Map<string, Transaction>();
    private readonly secpSignaturePlaceholder =
        "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
    public readonly defaultFee = BigInt(100000);

    constructor(connectionService: ConnectionService, nftService: NftService) {
        this.connection = connectionService;
        this.nftService = nftService;
        this.TransactionCollector = TxCollector;
    }

    static addCellDep(txSkeleton: TransactionSkeletonType, scriptConfig: ScriptConfig): TransactionSkeletonType {
        return txSkeleton.update("cellDeps", (cellDeps) => {
            return cellDeps.push({
                out_point: {
                    tx_hash: scriptConfig.TX_HASH,
                    index: scriptConfig.INDEX,
                },
                dep_type: scriptConfig.DEP_TYPE,
            });
        });
    }

    static isScriptTypeScript(scriptType: ScriptType, scriptConfig: ScriptConfig): boolean {
        return scriptConfig.CODE_HASH === scriptType.codeHash && scriptConfig.HASH_TYPE === scriptType.hashType;
    }

    addSecp256CellDep(txSkeleton: TransactionSkeletonType): TransactionSkeletonType {
        return TransactionService.addCellDep(txSkeleton, this.connection.getConfig().SCRIPTS.SECP256K1_BLAKE160);
    }

    injectCapacity(txSkeleton: TransactionSkeletonType, capacity: bigint, cells: Cell[]): TransactionSkeletonType {
        let lastScript: Script;
        let changeCell: Cell;
        let changeCapacity = BigInt(0);
        let currentAmount = BigInt(capacity);

        for (const cell of cells) {
            // Cell is empty
            if (!cell.cell_output.type) {
                txSkeleton = txSkeleton.update("inputs", (inputs) => inputs.push(cell));
                txSkeleton = txSkeleton.update("witnesses", (witnesses) => witnesses.push("0x"));

                const inputCapacity = BigInt(cell.cell_output.capacity);
                let deductCapacity = inputCapacity;
                if (deductCapacity > currentAmount) {
                    deductCapacity = currentAmount;
                }
                currentAmount -= deductCapacity;
                changeCapacity += inputCapacity - deductCapacity;

                const lockScript = cell.cell_output.lock;
                if (
                    !lastScript ||
                    lastScript.args !== lockScript.args ||
                    lastScript.code_hash !== lockScript.code_hash ||
                    lastScript.hash_type !== lockScript.hash_type
                ) {
                    txSkeleton = this.addWitnesses(txSkeleton, lockScript);
                    lastScript = lockScript;
                }

                // Got enough amount
                if (Number(currentAmount) === 0 && Number(changeCapacity) > 0) {
                    changeCell = {
                        cell_output: {
                            capacity: "0x" + changeCapacity.toString(16),
                            lock: cell.cell_output.lock,
                            type: undefined,
                        },
                        data: "0x",
                        out_point: undefined,
                        block_hash: undefined,
                    };
                    break;
                }
            }
        }

        if (changeCapacity > BigInt(0)) {
            txSkeleton = txSkeleton.update("outputs", (outputs) => outputs.push(changeCell));
        }

        return txSkeleton;
    }

    getScriptFirstIndex(txSkeleton: TransactionSkeletonType, fromScript: Script): number {
        return txSkeleton
            .get("inputs")
            .findIndex((input) =>
                new ScriptValue(input.cell_output.lock, { validate: false }).equals(new ScriptValue(fromScript, { validate: false })),
            );
    }

    addWitnesses(txSkeleton: TransactionSkeletonType, fromScript: Script): TransactionSkeletonType {
        // posar el index i from script
        const firstIndex = this.getScriptFirstIndex(txSkeleton, fromScript);

        if (firstIndex !== -1) {
            while (firstIndex >= txSkeleton.get("witnesses").size) {
                txSkeleton = txSkeleton.update("witnesses", (witnesses) => witnesses.push("0x"));
            }

            let witness: string = txSkeleton.get("witnesses").get(firstIndex);
            const newWitnessArgs: WitnessArgs = { lock: this.secpSignaturePlaceholder };
            if (witness !== "0x") {
                const witnessArgs = new core.WitnessArgs(new Reader(witness));
                const lock = witnessArgs.getLock();
                if (lock.hasValue() && new Reader(lock.value().raw()).serializeJson() !== newWitnessArgs.lock) {
                    throw new Error("Lock field in first witness is set aside for signature!");
                }

                const inputType = witnessArgs.getInputType();
                if (inputType.hasValue()) {
                    newWitnessArgs.input_type = new Reader(inputType.value().raw()).serializeJson();
                }
                const outputType = witnessArgs.getOutputType();
                if (outputType.hasValue()) {
                    newWitnessArgs.output_type = new Reader(outputType.value().raw()).serializeJson();
                }
            }
            witness = new Reader(core.SerializeWitnessArgs(normalizers.NormalizeWitnessArgs(newWitnessArgs))).serializeJson();
            txSkeleton = txSkeleton.update("witnesses", (witnesses) => witnesses.set(firstIndex, witness));
        }

        return txSkeleton;
    }

    extractPrivateKeys(txSkeleton: TransactionSkeletonType, fromAddresses: string[], privateKeys: string[]): string[] {
        const signingPrivKeys: string[] = [];

        for (let i = 0; i < fromAddresses.length; i += 1) {
            if (this.getScriptFirstIndex(txSkeleton, this.connection.getLockFromAddress(fromAddresses[i])) !== -1) {
                this.logger.info(i);
                signingPrivKeys.push(privateKeys[i]);
            }
        }

        return signingPrivKeys;
    }

    async lockScriptHasTransactions(lockScript: Script): Promise<boolean> {
        const transactionCollector = new this.TransactionCollector(
            this.connection.getIndexer(),
            { lock: lockScript },
            this.connection.getCKBUrl(),
            { includeStatus: false },
        );

        const txs = await transactionCollector.count();
        return txs > 0;
    }

    async getTransactions(address: string, toBlock?: string, fromBlock?: string): Promise<Transaction[]> {
        const queryOptions: CKBIndexerQueryOptions = { lock: this.connection.getLockFromAddress(address) };
        if (toBlock) {
            queryOptions.toBlock = toBlock;
        }
        if (fromBlock) {
            queryOptions.fromBlock = fromBlock;
        }

        const transactionCollector = new this.TransactionCollector(
            this.connection.getIndexer(),
            queryOptions,
            this.connection.getCKBUrl(),
            { includeStatus: true },
        );

        const transactions: Transaction[] = [];
        let cell: TransactionWithStatus;
        for await (cell of transactionCollector.collect()) {
            if (!this.transactionMap.has(cell.transaction.hash)) {
                const header = await this.connection.getBlockHeaderFromHash(cell.tx_status.block_hash);
                let hasDAOInput = false;

                const inputs: DataRow[] = [];
                for (let i = 0; i < cell.transaction.inputs.length; i += 1) {
                    const input = cell.transaction.inputs[i];
                    const transaction = await this.connection.getTransactionFromHash(input.previous_output.tx_hash);
                    const output = transaction.transaction.outputs[parseInt(input.previous_output.index, 16)];
                    inputs.push({
                        quantity: parseInt(output.capacity, 16) / 100000000,
                        address: this.connection.getAddressFromLock(output.lock),
                    });
                    if (output.type) {
                        const script: ScriptType = {
                            codeHash: output.type.code_hash,
                            hashType: output.type.hash_type,
                            args: output.type.args,
                        };
                        if (TransactionService.isScriptTypeScript(script, this.connection.getConfig().SCRIPTS.DAO)) {
                            hasDAOInput = true;
                        }
                    }
                }

                const outputs: DataRow[] = cell.transaction.outputs.map((output) => ({
                    quantity: parseInt(output.capacity, 16) / 100000000,
                    address: this.connection.getAddressFromLock(output.lock),
                    type: output.type
                        ? { args: output.type.args, codeHash: output.type.code_hash, hashType: output.type.hash_type }
                        : undefined,
                }));
                cell.transaction.outputs_data.map((data, index) => {
                    if (data !== "0x") {
                        if (data.length === 34) {
                            outputs[index].data = Number(utils.readBigUInt128LE(data));
                        } else if (data.length === 18) {
                            outputs[index].data = Number(utils.readBigUInt64LE(data));
                        }
                    }
                });

                let amount = 0;
                let type: TransactionType;
                let scriptType: ScriptType;
                if (outputs[0] && cell.transaction.outputs[0]) {
                    amount = outputs[0].quantity;
                    const isReceive = outputs[0].address === address;

                    if (!outputs[0].type) {
                        if (hasDAOInput) {
                            type = TransactionType.UNLOCK_DAO;
                        } else {
                            type = !isReceive ? TransactionType.SEND_CKB : TransactionType.RECEIVE_CKB;
                        }
                    } else {
                        scriptType = outputs[0].type;
                        if (TransactionService.isScriptTypeScript(outputs[0].type, this.connection.getConfig().SCRIPTS.SUDT)) {
                            type = !isReceive ? TransactionType.SEND_TOKEN : TransactionType.RECEIVE_TOKEN;
                        } else if (TransactionService.isScriptTypeScript(outputs[0].type, this.connection.getConfig().SCRIPTS.DAO)) {
                            type = outputs[0].data === 0 ? TransactionType.DEPOSIT_DAO : TransactionType.WITHDRAW_DAO;
                        } else if (await this.nftService.isScriptNftScript(outputs[0].type)) {
                            type = !isReceive ? TransactionType.SEND_NFT : TransactionType.RECEIVE_NFT;
                        } else {
                            type = !isReceive ? TransactionType.SMART_CONTRACT_SEND : TransactionType.SMART_CONTRACT_RECEIVE;
                        }
                    }
                }

                this.transactionMap.set(cell.transaction.hash, {
                    status: cell.tx_status.status as TransactionStatus,
                    transactionHash: cell.transaction.hash,
                    inputs,
                    outputs,
                    blockHash: cell.tx_status.block_hash,
                    blockNumber: parseInt(header.number, 16),
                    type,
                    scriptType,
                    amount,
                    timestamp: new Date(parseInt(header.timestamp, 16)),
                });
            }

            const transaction = this.transactionMap.get(cell.transaction.hash);
            if (!transactions.includes(transaction)) {
                transactions.push(transaction);
            }
        }

        return transactions;
    }

    async signTransaction(txSkeleton: TransactionSkeletonType, privateKeys: string[]): Promise<string> {
        const txSkeletonWEntries = commons.common.prepareSigningEntries(txSkeleton, this.connection.getConfigAsObject());
        if (privateKeys.length !== txSkeletonWEntries.get("signingEntries").count()) {
            this.logger.error("Invalid private keys length");
            throw new Error("Invalid private keys length");
        }

        const signatures = [];
        for (let i = 0; i < privateKeys.length; i += 1) {
            const entry = txSkeletonWEntries.get("signingEntries").get(i);
            signatures.push(hd.key.signRecoverable(entry.message, privateKeys[i]));
        }
        const tx = sealTransaction(txSkeletonWEntries, signatures);
        const hash = await this.connection.getRPC().send_transaction(tx, "passthrough");

        return hash;
    }
}
