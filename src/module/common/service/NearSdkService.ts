import { connect, keyStores, utils, Near, ConnectConfig, KeyPair, Account } from "near-api-js";
import { AccountBalance } from "near-api-js/lib/account";
import { AccountView, FinalExecutionOutcome } from "near-api-js/lib/providers/provider";
const { parseSeedPhrase, generateSeedPhrase } = require("near-seed-phrase");
import { decode, encode } from "bs58";

import {
    MINIMUM_UNSTAKED,
    DEPOSIT_STAKE_METHOD,
    UNSTAKE_METHOD,
    UNSTAKE_ALL_METHOD,
    WITHDRAW_METHOD,
    WITHDRAW_ALL_METHOD,
    ACCOUNT_TOTAL_BALANCE_METHOD,
    ACCOUNT_STAKED_BALANCE_METHOD,
    ACCOUNT_UNSTAKED_BALANCE_METHOD,
    IS_ACCOUNT_UNSTAKED_BALANCE_AVAILABLE_METHOD,
    REWARD_FEE_FRACTION_METHOD,
    NFT_TRANSFER_METHOD,
    NFT_TRANSFER_GAS,
    TOKEN_TRANSFER_DEPOSIT,
    FT_TRANSFER_GAS,
    FT_STORAGE_DEPOSIT_GAS,
    FT_TRANSFER_METHOD,
    STORAGE_BALANCE_METHOD,
    STORAGE_DEPOSIT_METHOD,
    FT_MINIMUM_STORAGE_BALANCE,
    FT_MINIMUM_STORAGE_BALANCE_LARGE,
} from "./near.constants";
import { KeyPairEd25519, PublicKey } from "near-api-js/lib/utils";

export enum Chains {
    MAINNET = "mainnet",
    TESTNET = "testnet",
    BETANET = "betanet",
    LOCAL = "local",
}

export interface StakingBalance {
    staked: number;
    pending: number;
    available: number;
    rewardsEarned?: number;
}

export interface Validator {
    accountId: string;
    fee: number | null;
    stakingBalance?: StakingBalance;
}

export class NearSDKService {
    private connection?: Near;
    private nearConfig: ConnectConfig;
    private nameId: string;
    private keyPair: KeyPairEd25519;
    private chain: Chains;
    private mnemonic?: string;

    constructor(chain: Chains, nodeUrl: string, secretKey: string, nameId: string, mnemonic?: string) {
        this.chain = chain;
        this.nameId = nameId;
        this.mnemonic = mnemonic;

        // Create KeyPairEd25519
        const parts = secretKey.split(":");
        if (parts.length === 1) {
            this.keyPair = new KeyPairEd25519(secretKey);
        } else if (parts.length === 2) {
            if (parts[0].toUpperCase() === "ED25519") {
                this.keyPair = new KeyPairEd25519(parts[1]);
            } else {
                throw new Error(`Unknown curve: ${parts[0]}`);
            }
        } else {
            throw new Error("Invalid encoded key format, must be <curve>:<encoded key>");
        }

        const keyStore = new keyStores.InMemoryKeyStore();
        keyStore.setKey(chain, nameId, this.keyPair);

        this.nearConfig = {
            networkId: chain,
            keyStore,
            nodeUrl,
        };
    }

    // --------------------------------------------------------------
    // -- CREATION FUNCTIONS ----------------------------------------
    // --------------------------------------------------------------
    static getAddressFromPublicKey(publicKey: PublicKey): string {
        return decode(encode(publicKey.data)).toString("hex");
    }

    static async createAndConnect(chain: Chains, nodeUrl: string): Promise<NearSDKService> {
        const { seedPhrase, secretKey, publicKey } = generateSeedPhrase();
        const nameId = NearSDKService.getAddressFromPublicKey(PublicKey.fromString(publicKey));

        const service = new NearSDKService(chain, nodeUrl, secretKey, nameId, seedPhrase);
        await service.connect();
        return service;
    }

    static async importFromMnemonic(chain: Chains, nodeUrl: string, mnemonic: string, nameId?: string): Promise<NearSDKService> {
        const { secretKey, publicKey } = parseSeedPhrase(mnemonic);
        const parsedNameId = nameId ? nameId : NearSDKService.getAddressFromPublicKey(PublicKey.fromString(publicKey));
        const service = new NearSDKService(chain, nodeUrl, secretKey, parsedNameId, mnemonic);
        await service.connect();
        return service;
    }

    static async importFromSecretKey(chain: Chains, nodeUrl: string, secretKey: string, nameId?: string): Promise<NearSDKService> {
        const parsedNameId = nameId ? nameId : NearSDKService.getAddressFromPublicKey(KeyPair.fromString(secretKey).getPublicKey());
        const service = new NearSDKService(chain, nodeUrl, secretKey, parsedNameId);
        await service.connect();
        return service;
    }

    // --------------------------------------------------------------
    // -- COMMON FUNCTIONS ------------------------------------------
    // --------------------------------------------------------------
    private async getAccount(): Promise<Account> {
        if (!this.connection) {
            throw new Error("Not connected");
        }
        const address = this.getAddress();
        return this.connection.account(address);
    }

    async connect(): Promise<void> {
        this.connection = await connect(this.nearConfig);
    }

    getAddress(): string {
        return this.nameId;
    }

    getMnemonic(): string | undefined {
        return this.mnemonic;
    }

    async accountExists(nameId: string): Promise<boolean> {
        // Could also be checked through our indexer api instead of rpc

        if (!this.connection) {
            throw new Error("Not connected");
        }

        let exists = true;
        try {
            await this.connection.connection.provider.query<AccountView>({
                request_type: "view_account",
                account_id: nameId,
                finality: "final",
            });
        } catch (e: any) {
            if (e.type === "AccountDoesNotExist" || e.toString().includes("does not exist")) {
                exists = false;
            }
        }

        return exists;
    }

    // Amount is in near
    private async createNewAccount(nameId: string, publicKey: PublicKey, amount: string): Promise<string> {
        const account = await this.getAccount();
        const tx = await account.createAccount(nameId, publicKey, utils.format.parseNearAmount(amount));
        return tx.transaction_outcome.id;
    }

    // Amount is in near
    async createNewAccountWithNewMnemonic(nameId: string, amount: string): Promise<NearSDKService> {
        const exists = await this.accountExists(nameId);
        if (exists) {
            throw new Error("Account already exists");
        }

        const { seedPhrase, publicKey } = generateSeedPhrase();
        this.createNewAccount(nameId, PublicKey.fromString(publicKey), amount);

        return NearSDKService.importFromMnemonic(this.chain, this.nearConfig.nodeUrl, seedPhrase, nameId);
    }

    // Amount is in near
    async createNewAccountWithNewSecretKey(nameId: string, amount: string): Promise<NearSDKService> {
        const exists = await this.accountExists(nameId);
        if (exists) {
            throw new Error("Account already exists");
        }

        const keyPair = KeyPairEd25519.fromRandom();
        this.createNewAccount(nameId, keyPair.getPublicKey(), amount);

        return NearSDKService.importFromSecretKey(this.chain, this.nearConfig.nodeUrl, keyPair.secretKey, nameId);
    }

    // Amount is in near
    async createNewAccountWithSameSecretKey(nameId: string, amount: string): Promise<NearSDKService> {
        const exists = await this.accountExists(nameId);
        if (exists) {
            throw new Error("Account already exists");
        }

        this.createNewAccount(nameId, this.keyPair.getPublicKey(), amount);

        return NearSDKService.importFromSecretKey(this.chain, this.nearConfig.nodeUrl, this.keyPair.secretKey, nameId);
    }

    async deleteAccount(beneficiaryId: string): Promise<string> {
        const account = await this.getAccount();
        const tx = await account.deleteAccount(beneficiaryId);
        return tx.transaction_outcome.id;
    }

    // --------------------------------------------------------------
    // -- WALLET STATE FUNCTIONS ------------------------------------
    // --------------------------------------------------------------
    async getAccountBalance(): Promise<AccountBalance> {
        const account = await this.getAccount();
        return account.getAccountBalance();
    }

    async getAccountState(): Promise<AccountView> {
        const account = await this.getAccount();
        return account.state();
    }

    // --------------------------------------------------------------
    // -- TRANSACTIONS FUNCTIONS ------------------------------------
    // --------------------------------------------------------------
    // Amount is in near
    async sendTransaction(to: string, amount: string): Promise<string> {
        const account = await this.getAccount();
        const amountInYocto = utils.format.parseNearAmount(amount);

        const tx = await account.sendMoney(to, amountInYocto);
        return tx.transaction_outcome.id;
    }

    async getTransactionStatus(txHash: string): Promise<FinalExecutionOutcome> {
        if (!this.connection) {
            throw new Error("Not connected");
        }

        const address = this.getAddress();
        return this.connection.connection.provider.txStatus(txHash, address);
    }

    // --------------------------------------------------------------
    // -- STAKING FUNCTIONS -----------------------------------------
    // --------------------------------------------------------------
    // Staking without validator
    // Amount is in near
    async stake(amount: string): Promise<string> {
        const account = await this.getAccount();
        const amountInYocto = utils.format.parseNearAmount(amount);

        const tx = await account.stake(this.keyPair.getPublicKey(), amountInYocto);
        return tx.transaction_outcome.id;
    }

    // Staking without validator
    async unstake(): Promise<string> {
        const account = await this.getAccount();

        const tx = await account.stake(this.keyPair.getPublicKey(), 0);
        return tx.transaction_outcome.id;
    }

    private async getValidatorFee(validatorId: string): Promise<number> {
        const account = await this.getAccount();

        const resp = await account.viewFunction({ contractId: validatorId, methodName: REWARD_FEE_FRACTION_METHOD, args: {} });
        return +((resp.numerator * 100) / resp.denominator);
    }

    private async getValidatorBalance(validatorId: string, validatorDeposit?: number): Promise<StakingBalance> {
        const account = await this.getAccount();
        const stakingBalance: StakingBalance = {
            staked: 0,
            available: 0,
            pending: 0,
        };

        const total = await account.viewFunction({
            contractId: validatorId,
            methodName: ACCOUNT_TOTAL_BALANCE_METHOD,
            args: { account_id: account.accountId },
        });

        if (validatorDeposit) {
            stakingBalance.rewardsEarned = total - validatorDeposit;
        }

        if (parseInt(total, 10) > 0) {
            const stakedStr = await account.viewFunction({
                contractId: validatorId,
                methodName: ACCOUNT_STAKED_BALANCE_METHOD,
                args: { account_id: account.accountId },
            });
            stakingBalance.staked = parseInt(stakedStr, 10);

            const unstakedStr = await account.viewFunction({
                contractId: validatorId,
                methodName: ACCOUNT_UNSTAKED_BALANCE_METHOD,
                args: { account_id: account.accountId },
            });

            if (parseInt(unstakedStr, 10) > MINIMUM_UNSTAKED) {
                const isAvailable = await account.viewFunction({
                    contractId: validatorId,
                    methodName: IS_ACCOUNT_UNSTAKED_BALANCE_AVAILABLE_METHOD,
                    args: { account_id: account.accountId },
                });

                if (isAvailable) {
                    stakingBalance.available = parseInt(unstakedStr, 10);
                } else {
                    stakingBalance.pending = parseInt(unstakedStr, 10);
                }
            }
        }

        return stakingBalance;
    }

    private async getAllValidatorIds(): Promise<string[]> {
        if (!this.connection) {
            throw new Error("Not connected");
        }

        const status = await this.connection.connection.provider.status();
        return status.validators.map((validator: any) => validator.account_id);
    }

    private async getValidatorDataFromId(validatorId: string, queryBalance: boolean): Promise<Validator> {
        let fee: number | null;
        let stakingBalance: StakingBalance | null;

        try {
            fee = await this.getValidatorFee(validatorId);

            if (queryBalance) {
                stakingBalance = await this.getValidatorBalance(validatorId);
                return { accountId: validatorId, fee, stakingBalance };
            }
        } catch (e) {
            fee = null;
        }

        return { accountId: validatorId, fee };
    }

    async getAllValidators(): Promise<Validator[]> {
        const validators = await this.getAllValidatorIds();
        const validatorsProms = validators.map((validator) => this.getValidatorDataFromId(validator, true));

        return Promise.all(validatorsProms);
    }

    async getTotalStakingBalance(): Promise<StakingBalance> {
        // TODO: improve with indexer api of only staking validators
        const validators = await this.getAllValidators();
        const stakingBalance: StakingBalance = {
            staked: validators.reduce((ant, act) => ant + (act.stakingBalance?.staked || 0), 0),
            available: validators.reduce((ant, act) => ant + (act.stakingBalance?.available || 0), 0),
            pending: validators.reduce((ant, act) => ant + (act.stakingBalance?.pending || 0), 0),
        };

        return stakingBalance;
    }

    // Amount is in near
    async depositAndStakeFromValidator(validatorId: string, amount: string): Promise<string> {
        const account = await this.getAccount();
        const amountInYocto = utils.format.parseNearAmount(amount);

        const tx = await account.functionCall({
            contractId: validatorId,
            methodName: DEPOSIT_STAKE_METHOD,
            args: {},
            attachedDeposit: amountInYocto,
        });
        return tx.transaction_outcome.id;
    }

    // Amount is in near
    async unstakeFromValidator(validatorId: string, amount: string): Promise<string> {
        const account = await this.getAccount();
        const amountInYocto = utils.format.parseNearAmount(amount);

        const tx = await account.functionCall({
            contractId: validatorId,
            methodName: UNSTAKE_METHOD,
            args: { amount: amountInYocto },
        });
        return tx.transaction_outcome.id;
    }

    async unstakeAllFromValidator(validatorId: string): Promise<string> {
        const account = await this.getAccount();

        const tx = await account.functionCall({
            contractId: validatorId,
            methodName: UNSTAKE_ALL_METHOD,
            args: {},
        });
        return tx.transaction_outcome.id;
    }

    // Amount is in near
    async withdrawFromValidator(validatorId: string, amount: string): Promise<string> {
        const account = await this.getAccount();
        const amountInYocto = utils.format.parseNearAmount(amount);

        const tx = await account.functionCall({
            contractId: validatorId,
            methodName: WITHDRAW_METHOD,
            args: { amount: amountInYocto },
        });
        return tx.transaction_outcome.id;
    }

    async withdrawAllFromValidator(validatorId: string): Promise<string> {
        const account = await this.getAccount();

        const tx = await account.functionCall({
            contractId: validatorId,
            methodName: WITHDRAW_ALL_METHOD,
            args: {},
        });
        return tx.transaction_outcome.id;
    }

    // --------------------------------------------------------------
    // -- TOKENS FUNCTIONS ------------------------------------------
    // --------------------------------------------------------------
    private async isStorageBalanceAvailable(contractId: string, accountId: string): Promise<boolean> {
        const account = await this.getAccount();

        const storageBalance = await account.viewFunction(contractId, STORAGE_BALANCE_METHOD, { account_id: accountId });
        return storageBalance?.total !== undefined;
    }

    private async transferStorageDeposit(contractId: string, receiverId: string): Promise<string> {
        const account = await this.getAccount();
        let tx: FinalExecutionOutcome;

        try {
            tx = await account.functionCall({
                contractId,
                methodName: STORAGE_DEPOSIT_METHOD,
                args: { account_id: receiverId, registration_only: true },
                gas: FT_STORAGE_DEPOSIT_GAS,
                attachedDeposit: FT_MINIMUM_STORAGE_BALANCE,
            });
        } catch (e: any) {
            if (e.message.includes("attached deposit is less than")) {
                tx = await account.functionCall({
                    contractId,
                    methodName: STORAGE_DEPOSIT_METHOD,
                    args: { account_id: receiverId, registration_only: true },
                    gas: FT_STORAGE_DEPOSIT_GAS,
                    attachedDeposit: FT_MINIMUM_STORAGE_BALANCE_LARGE,
                });
            } else {
                throw e;
            }
        }

        return tx.transaction_outcome.id;
    }

    async sendFungibleTokens(contractId: string, amount: number, receiverId: string, memo: string): Promise<string> {
        const account = await this.getAccount();

        const storageAvailable = await this.isStorageBalanceAvailable(contractId, receiverId);
        if (!storageAvailable) {
            await this.transferStorageDeposit(contractId, receiverId);
        }

        const tx = await account.functionCall({
            contractId,
            methodName: FT_TRANSFER_METHOD,
            args: { amount, memo, receiver_id: receiverId },
            gas: FT_TRANSFER_GAS,
            attachedDeposit: TOKEN_TRANSFER_DEPOSIT,
        });

        return tx.transaction_outcome.id;
    }

    // --------------------------------------------------------------
    // -- NFT FUNCTIONS ---------------------------------------------
    // --------------------------------------------------------------
    async sendNFT(contractId: string, tokenId: string, receiverId: string): Promise<string> {
        const account = await this.getAccount();

        const tx = await account.functionCall({
            contractId,
            methodName: NFT_TRANSFER_METHOD,
            args: { receiver_id: receiverId, token_id: tokenId },
            gas: NFT_TRANSFER_GAS,
            attachedDeposit: TOKEN_TRANSFER_DEPOSIT,
        });

        return tx.transaction_outcome.id;
    }
}
