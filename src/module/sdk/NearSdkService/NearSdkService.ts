import { connect, keyStores, Near, ConnectConfig, Account } from "near-api-js";
import { Action as NearAction } from "near-api-js/lib/transaction";
import { AccountBalance } from "near-api-js/lib/account";
import { AccessKeyInfoView, AccountView, FinalExecutionOutcome } from "near-api-js/lib/providers/provider";
import { KeyPairEd25519, PublicKey } from "near-api-js/lib/utils";
// @ts-ignore
import { parseSeedPhrase, generateSeedPhrase } from "near-seed-phrase";
import { decode, encode } from "bs58";
import * as Borsh from "borsh";
import BN from "bn.js";
import JSsha256 from "js-sha256";
// @ts-ignore
import bip39 from "bip39-light";

import {
    Chains,
    StakingBalance,
    Validator,
    TokenMetadata,
    Token,
    NftMetadata,
    NftToken,
    CreateNearSdkParams,
    BaseCreateNearSdkParams,
    CreateNearSdkWithMnemonicParams,
    CreateNearSdkWithSecretKeyParams,
    Action,
} from "./NearSdkService.types";
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
    FT_METADATA_METHOD,
    FT_BALANCE_METHOD,
    NFT_METADATA_METHOD,
    NFT_TOKEN_METHOD,
    NFT_SUPPLY_METHOD,
    NFT_OWNER_TOKENS_METHOD,
    NFT_TOKEN_METADATA_METHOD,
    NFT_OWNER_TOKENS_SET_METHOD,
} from "../utils/near.constants";
import {
    addNearAmounts,
    convertAccountBalanceToNear as convertAccountBalanceToNearUtil,
    convertNearToYocto,
    convertYoctoToNear,
    formatTokenAmount,
    subtractYoctoAmounts,
} from "../utils/near.utils";
import { ApiService, NearApiServiceInterface } from "../NearApiService";
import { BalanceOperations } from "../utils";
import { Payload } from "../utils/SignerPayload";

export class NearSDKService {
    private connection?: Near;
    private nearConfig: ConnectConfig;
    private nameId: string;
    private keyPair: KeyPairEd25519;
    private chain: Chains;
    private masterAccount: string;
    private mnemonic?: string;
    private apiService: NearApiServiceInterface;
    private static nameRegex = /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;
    private static addressRegex = /[\da-f]/i;
    public nearDecimals: number | undefined;

    constructor({ chain, nodeUrl, secretKey, nameId, nearDecimals, mnemonic }: CreateNearSdkParams) {
        this.chain = chain;
        this.masterAccount = chain === Chains.MAINNET ? "near" : this.chain;
        this.nameId = nameId;
        this.mnemonic = mnemonic;
        this.apiService = NearSDKService.createApiService(chain);
        this.nearDecimals = nearDecimals;
        // Create KeyPairEd25519
        this.keyPair = NearSDKService.createKeyPairFromSecretKey(secretKey);

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

    static createApiService(chain: Chains): NearApiServiceInterface {
        return new ApiService(chain);
    }

    static async createAndConnect(params: BaseCreateNearSdkParams): Promise<NearSDKService> {
        const { seedPhrase, secretKey, publicKey } = generateSeedPhrase();
        const nameId = NearSDKService.getAddressFromPublicKey(PublicKey.fromString(publicKey));
        const service = new NearSDKService({ ...params, nameId, secretKey, mnemonic: seedPhrase });
        await service.connect();
        return service;
    }

    static async createFromSecretKey(params: BaseCreateNearSdkParams & { secretKey: string; nameId: string }): Promise<NearSDKService> {
        const service = new NearSDKService(params);
        await service.connect();
        return service;
    }

    static async importFromMnemonic({
        mnemonic,
        chain,
        likelyNameIds = [],
        ...rest
    }: CreateNearSdkWithMnemonicParams): Promise<NearSDKService[]> {
        const { secretKey, publicKey } = parseSeedPhrase(mnemonic);
        const apiService = NearSDKService.createApiService(chain);
        const apiNameIds = await apiService.getAccountsFromPublicKey({ address: publicKey });
        const nameIds = [...new Set([...apiNameIds, ...likelyNameIds])];
        if (nameIds.length === 0) {
            nameIds.push(NearSDKService.getAddressFromPublicKey(PublicKey.fromString(publicKey)));
        }
        const services = nameIds.map(async (nameId) => {
            const service = new NearSDKService({ secretKey, nameId, mnemonic, chain, ...rest });
            await service.connect();
            return service;
        });
        return Promise.all(services);
    }

    static getPublicKeyFromSecretKey(secretKey: string): string {
        const keyPair = KeyPairEd25519.fromString(secretKey);
        return keyPair.getPublicKey().toString();
    }

    static async importFromSecretKey({
        secretKey,
        chain,
        likelyNameIds = [],
        ...rest
    }: CreateNearSdkWithSecretKeyParams): Promise<NearSDKService[]> {
        const secret = secretKey.split(":").pop();
        const publicKey = new KeyPairEd25519(secret!).getPublicKey().toString();
        const apiService = NearSDKService.createApiService(chain);
        const apiNameIds = await apiService.getAccountsFromPublicKey({ address: publicKey });
        const nameIds = [...new Set([...apiNameIds, ...likelyNameIds])];
        if (nameIds.length === 0) {
            nameIds.push(NearSDKService.getAddressFromPublicKey(PublicKey.fromString(publicKey)));
        }
        const services = nameIds.map(async (nameId) => {
            const service = new NearSDKService({ ...rest, secretKey, nameId, chain });
            await service.connect();
            return service;
        });
        return Promise.all(services);
    }

    static createNewMnemonic(): string {
        return bip39.generateMnemonic();
    }

    // --------------------------------------------------------------
    // -- COMMON FUNCTIONS ------------------------------------------
    // --------------------------------------------------------------
    private async getAccount(): Promise<Account> {
        const connection = this.getConnection();
        const address = this.getAddress();
        return connection.account(address);
    }

    async connect(): Promise<void> {
        this.connection = await connect(this.nearConfig);
    }

    private getConnection(): Near {
        if (!this.connection) {
            throw new Error("Not connected");
        }
        return this.connection;
    }

    getAddress(): string {
        return this.nameId;
    }

    getMnemonic(): string | undefined {
        return this.mnemonic;
    }

    getKeyPair(): string {
        return this.keyPair.toString();
    }

    getSecretKey(): string {
        return this.keyPair.secretKey;
    }

    static isSameSecretKey(secretKey1: string, secretKey2: string): boolean {
        const finalSecretKey1 = secretKey1.split(":").pop();
        const finalSecretKey2 = secretKey2.split(":").pop();
        if (!finalSecretKey1 || !finalSecretKey2) return false;
        return finalSecretKey1 === finalSecretKey2;
    }

    static parsePrivateKey(secretKey: string): string {
        const parts = secretKey.split(":");
        if (parts.length === 1) {
            return "ed25519:" + secretKey;
        }
        return secretKey;
    }

    async accountExists(nameId: string): Promise<boolean> {
        // Could also be checked through our indexer api instead of rpc

        const { connection } = this.getConnection();

        let exists = true;
        try {
            await connection.provider.query<AccountView>({
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

    static isImplicitAddress(accountId: string): boolean {
        return accountId.length === 64 && NearSDKService.addressRegex.test(accountId);
    }

    static nameIdIsValid(nameId: string, network?: Chains): boolean {
        if (network) {
            const splittedNameId = nameId.split(".");
            if (splittedNameId.length > 1) {
                const suffix = splittedNameId.pop();
                const invalidSuffix = network === Chains.MAINNET ? "testnet" : "near";
                if (suffix === invalidSuffix) return false;
            }
        }
        return nameId.length >= 2 && nameId.length <= 64 && NearSDKService.nameRegex.test(nameId);
    }

    static isImplicitAddressOrNameValid(accoutOrNameId: string, network?: Chains): boolean {
        return NearSDKService.nameIdIsValid(accoutOrNameId, network) || NearSDKService.isImplicitAddress(accoutOrNameId);
    }

    static validateMnemonic(mnemonic: string): boolean {
        return bip39.validateMnemonic(mnemonic);
    }

    static createKeyPairFromSecretKey(secretKey: string): KeyPairEd25519 {
        return KeyPairEd25519.fromString(secretKey) as KeyPairEd25519;
    }

    static isSecretKeyValid(secretKey: string): boolean {
        try {
            this.createKeyPairFromSecretKey(secretKey);
            return true;
        } catch (e) {
            return false;
        }
    }

    async accountCanReceive(accountId: string): Promise<boolean> {
        return NearSDKService.isImplicitAddress(accountId) || this.accountExists(accountId);
    }

    public isNewAddressValid(nameId: string): boolean {
        const nameParts = nameId.split(".").length;
        return nameParts === 2 && nameId.indexOf(`.${this.masterAccount}`) !== -1;
    }

    public isSubAddressValid(nameId: string): boolean {
        const address = this.getAddress();
        const addressParts = address.split(".").length;
        const nameParts = nameId.split(".").length;
        return nameId.indexOf(address) !== -1 && nameParts === addressParts + 1;
    }

    public nameIsValidSubAccount(nameId: string): boolean {
        return this.isNewAddressValid(nameId) || this.isSubAddressValid(nameId);
    }

    //https://docs.near.org/concepts/basics/accounts/account-id#named-accounts
    public nameCanBeCreated(nameId: string): boolean {
        return NearSDKService.nameIdIsValid(nameId, this.chain) && this.nameIsValidSubAccount(nameId);
    }

    async nameIsChoosalbe(nameId: string): Promise<boolean> {
        return NearSDKService.nameIdIsValid(nameId, this.chain) && !(await this.accountExists(nameId));
    }

    async acccountIsValidReceivingAccount(accountId: string): Promise<boolean> {
        if (NearSDKService.isImplicitAddress(accountId)) return true;
        if (!NearSDKService.nameIdIsValid(accountId, this.chain)) return false;
        return await this.accountExists(accountId);
    }

    // Amount is in near
    private async createNewAccount(nameId: string, publicKey: PublicKey, amount: string): Promise<string> {
        const account = await this.getAccount();

        if (nameId.includes(account.accountId)) {
            const tx = await account.createAccount(nameId, publicKey, new BN(this.parseNearAmount(amount)));
            return tx.transaction_outcome.id;
        }

        const tx = await account.functionCall({
            contractId: this.masterAccount,
            methodName: "create_account",
            args: { new_account_id: nameId, new_public_key: publicKey.toString() },
            attachedDeposit: new BN(this.parseNearAmount(amount)),
        });
        return tx.transaction_outcome.id;
    }

    // Amount is in near
    async createNewAccountWithNewMnemonic(nameId: string, amount: string, nearDecimals?: number): Promise<NearSDKService> {
        const exists = await this.accountExists(nameId);
        if (exists) {
            throw new Error("Account already exists");
        }

        const { seedPhrase, publicKey, secretKey } = generateSeedPhrase();
        await this.createNewAccount(nameId, PublicKey.fromString(publicKey), amount);

        const service = new NearSDKService({
            chain: this.chain,
            nodeUrl: this.nearConfig.nodeUrl,
            secretKey,
            nameId,
            nearDecimals,
            mnemonic: seedPhrase,
        });
        await service.connect();
        return service;
    }

    // Amount is in near
    async createNewAccountWithNewSecretKey(nameId: string, amount: string, nearDecimals?: number): Promise<NearSDKService> {
        const exists = await this.accountExists(nameId);
        if (exists) {
            throw new Error("Account already exists");
        }
        const keyPair = KeyPairEd25519.fromRandom();
        await this.createNewAccount(nameId, keyPair.getPublicKey(), amount);
        const service = new NearSDKService({
            chain: this.chain,
            nodeUrl: this.nearConfig.nodeUrl,
            secretKey: keyPair.secretKey,
            nameId,
            nearDecimals,
        });
        await service.connect();
        return service;
    }

    // Amount is in near
    async createNewAccountWithSameSecretKey(
        nameId: string,
        amount: string,
        nearDecimals?: number,
        mnemonic?: string,
    ): Promise<NearSDKService | undefined> {
        const exists = await this.accountExists(nameId);
        if (exists) {
            throw new Error("Account already exists");
        }
        try {
            let publicKey;
            let secretKey;
            if (mnemonic) {
                const { publicKey: PK, secretKey: SK } = parseSeedPhrase(mnemonic);
                publicKey = PK;
                secretKey = SK;
            } else {
                publicKey = this.keyPair.getPublicKey();
                secretKey = this.keyPair.secretKey;
            }
            await this.createNewAccount(nameId, publicKey as any, amount);
            const service = new NearSDKService({
                chain: this.chain,
                nodeUrl: this.nearConfig.nodeUrl,
                secretKey,
                nameId,
                nearDecimals,
            });
            await service.connect();
            return service;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.warn("Error creating new account", e);
            return;
        }
    }

    async deleteAccount(beneficiaryId: string): Promise<string> {
        const account = await this.getAccount();
        const tx = await account.deleteAccount(beneficiaryId);
        return tx.transaction_outcome.id;
    }

    // --------------------------------------------------------------
    // -- UTILS FUNCTIONS ------------------------------------
    // --------------------------------------------------------------
    public parseNearAmount(amount: string): string {
        return convertNearToYocto(amount);
    }
    public convertAccountBalanceToNear(accountBalance: AccountBalance): AccountBalance {
        return convertAccountBalanceToNearUtil(accountBalance, this.nearDecimals);
    }

    // --------------------------------------------------------------
    // -- WALLET STATE FUNCTIONS ------------------------------------
    // --------------------------------------------------------------
    //Returns the balance in near
    async getAccountBalance(): Promise<AccountBalance> {
        try {
            const account = await this.getAccount();
            const accountBalance: AccountBalance = await account.getAccountBalance();
            return this.convertAccountBalanceToNear(accountBalance);
        } catch (e: any) {
            return {
                total: "0",
                available: "0",
                staked: "0",
                stateStaked: "0",
            };
        }
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
        const amountInYocto = this.parseNearAmount(amount);

        const tx = await account.sendMoney(to, new BN(amountInYocto));
        return tx.transaction_outcome.id;
    }

    async getTransactionStatus(txHash: string): Promise<FinalExecutionOutcome> {
        const { connection } = this.getConnection();
        const address = this.getAddress();
        return connection.provider.txStatus(txHash, address);
    }

    async getRecentActivity(): Promise<Action[]> {
        this.getConnection();
        let actions: Action[] = [];
        try {
            actions = await this.apiService.getRecentActivity({ address: this.getAddress() });
        } catch (e: any) {
            //eslint-disable-next-line no-console
            console.warn("Error getting recent activity: ", e);
        }
        return actions;
    }

    // --------------------------------------------------------------
    // -- STAKING FUNCTIONS -----------------------------------------
    // --------------------------------------------------------------
    // Staking without validator
    // Amount is in near
    async stake(amount: string): Promise<string> {
        const account = await this.getAccount();
        const amountInYocto = this.parseNearAmount(amount);

        const tx = await account.stake(this.keyPair.getPublicKey(), new BN(amountInYocto));
        return tx.transaction_outcome.id;
    }

    // Staking without validator
    async unstake(): Promise<string> {
        const account = await this.getAccount();

        const tx = await account.stake(this.keyPair.getPublicKey(), new BN(0));
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
            staked: "0",
            available: "0",
            pending: "0",
        };

        const total = await account.viewFunction({
            contractId: validatorId,
            methodName: ACCOUNT_TOTAL_BALANCE_METHOD,
            args: { account_id: account.accountId },
        });
        if (parseInt(total, 10) <= 0 || Number.isNaN(parseInt(total, 10))) {
            // It is not truly a validator
            return stakingBalance;
        }

        const stakedStr = await account.viewFunction({
            contractId: validatorId,
            methodName: ACCOUNT_STAKED_BALANCE_METHOD,
            args: { account_id: account.accountId },
        });
        stakingBalance.staked = stakedStr;

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
                stakingBalance.available = unstakedStr;
            } else {
                stakingBalance.pending = unstakedStr;
            }
        }

        if (validatorDeposit) {
            stakingBalance.rewardsEarned = subtractYoctoAmounts(BigInt(total).toString(), BigInt(validatorDeposit).toString());
        }

        return stakingBalance;
    }

    private async getAllValidatorIds(): Promise<string[]> {
        const { connection } = this.getConnection();
        const status = await connection.provider.status();
        return status.validators.map((validator: any) => validator.account_id);
    }

    private async getValidatorDataFromId(
        validatorId: string,
        queryBalance: boolean,
        totalDeposits?: number,
        activeValidator?: boolean,
    ): Promise<Validator> {
        let fee: number | null;
        let stakingBalance: StakingBalance | null;

        try {
            fee = await this.getValidatorFee(validatorId);
            if (queryBalance) {
                const balanceInYocto = await this.getValidatorBalance(validatorId, totalDeposits);
                const balanceInNear = {
                    staked: convertYoctoToNear(balanceInYocto.staked),
                    available: convertYoctoToNear(balanceInYocto.available),
                    pending: convertYoctoToNear(balanceInYocto.pending),
                    ...(balanceInYocto.rewardsEarned && { rewardsEarned: convertYoctoToNear(balanceInYocto.rewardsEarned) }),
                };
                stakingBalance = balanceInNear;
                return { accountId: validatorId, fee, stakingBalance, ...(activeValidator && { active: true }) };
            }
        } catch (e) {
            fee = null;
        }

        return { accountId: validatorId, fee, ...(activeValidator && { active: true }) };
    }

    async getAllValidators(): Promise<Validator[]> {
        let availableValidatorsList: Validator[] = [];
        try {
            const validatorsIds = await this.getAllValidatorIds();
            const getValidatorsDataPromise = validatorsIds.map((validator) =>
                this.getValidatorDataFromId(validator, false, undefined, true),
            );
            availableValidatorsList = await Promise.all(getValidatorsDataPromise);
        } catch (e) {
            //eslint-disable-next-line no-console
            console.warn("Error in getAllValidators: ", e);
        }
        return availableValidatorsList;
    }

    async getCurrentValidators(): Promise<Validator[]> {
        let validators: Validator[] = [];
        try {
            const stakingDeposits = await this.apiService.getStakingDeposits({ address: this.getAddress() });
            const validatorsProms = stakingDeposits.map(({ validatorId, amount }) =>
                this.getValidatorDataFromId(validatorId, true, amount),
            );
            validators = await Promise.all(validatorsProms);
            // Remove validators that no longer have any amount in it
            validators = validators.filter(
                ({ stakingBalance: sb }) => sb && (sb.staked !== "0" || sb.available !== "0" || sb.pending !== "0"),
            );
        } catch (e) {
            //eslint-disable-next-line no-console
            console.warn("Error in getCurrentValidators: ", e);
        }
        return validators;
    }

    private addStakingBalancesFromValidators(validators: Validator[]): StakingBalance {
        let finalStakingBalance: StakingBalance = {
            staked: "0",
            available: "0",
            pending: "0",
        };

        validators.forEach((validator) => {
            finalStakingBalance = this.addStakingBalances(finalStakingBalance, validator.stakingBalance);
        });

        return finalStakingBalance;
    }

    private addStakingBalances(ant: StakingBalance, act?: StakingBalance): StakingBalance {
        return {
            staked: act?.staked ? addNearAmounts(ant.staked, act.staked) : ant.staked,
            available: act?.available ? addNearAmounts(ant.available, act.available) : ant.available,
            pending: act?.pending ? addNearAmounts(ant.pending, act.pending) : ant.pending,
            rewardsEarned: act?.rewardsEarned ? addNearAmounts(ant.rewardsEarned || "0", act.rewardsEarned) : ant.rewardsEarned,
        };
    }

    async getTotalStakingBalance(): Promise<StakingBalance> {
        const validators = await this.getCurrentValidators();
        return this.addStakingBalancesFromValidators(validators);
    }

    // Amount is in near
    async depositAndStakeFromValidator(validatorId: string, amount: string): Promise<string> {
        const account = await this.getAccount();
        const amountInYocto = this.parseNearAmount(amount);

        const tx = await account.functionCall({
            contractId: validatorId,
            methodName: DEPOSIT_STAKE_METHOD,
            args: {},
            attachedDeposit: new BN(amountInYocto),
        });
        return tx.transaction_outcome.id;
    }

    // Amount is in near
    async unstakeFromValidator(validatorId: string, amount: string): Promise<string> {
        const account = await this.getAccount();
        const amountInYocto = this.parseNearAmount(amount);

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
        const amountInYocto = this.parseNearAmount(amount);

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

        const storageBalance = await account.viewFunction({
            contractId,
            methodName: STORAGE_BALANCE_METHOD,
            args: { account_id: accountId },
        });
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
                gas: new BN(FT_STORAGE_DEPOSIT_GAS),
                attachedDeposit: new BN(FT_MINIMUM_STORAGE_BALANCE),
            });
        } catch (e: any) {
            if (e.message.includes("attached deposit is less than")) {
                tx = await account.functionCall({
                    contractId,
                    methodName: STORAGE_DEPOSIT_METHOD,
                    args: { account_id: receiverId, registration_only: true },
                    gas: new BN(FT_STORAGE_DEPOSIT_GAS),
                    attachedDeposit: new BN(FT_MINIMUM_STORAGE_BALANCE_LARGE),
                });
            } else {
                throw e;
            }
        }

        return tx.transaction_outcome.id;
    }

    async sendFungibleTokens(contractId: string, amount: string, receiverId: string, memo?: string): Promise<string> {
        const account = await this.getAccount();

        const storageAvailable = await this.isStorageBalanceAvailable(contractId, receiverId);
        if (!storageAvailable) {
            await this.transferStorageDeposit(contractId, receiverId);
        }
        const tx = await account.functionCall({
            contractId,
            methodName: FT_TRANSFER_METHOD,
            args: { amount, receiver_id: receiverId, memo },
            gas: new BN(FT_TRANSFER_GAS),
            attachedDeposit: new BN(TOKEN_TRANSFER_DEPOSIT),
        });

        return tx.transaction_outcome.id;
    }

    async getTokenMetadata(contractId: string): Promise<TokenMetadata> {
        // TODO: Cache this call
        try {
            const account = await this.getAccount();
            return account.viewFunction({
                contractId,
                methodName: FT_METADATA_METHOD,
                args: {},
            });
        } catch (e) {
            //eslint-disable-next-line no-console
            console.warn("Error in getTokenMetadata: ", e);
            return {
                spec: "ft-1.0.0",
                name: "Unknown",
                symbol: "Unknown",
                icon: "",
                reference: null,
                reference_hash: null,
                decimals: "18",
            };
        }
    }

    async getTokenBalance(contractId: string): Promise<string> {
        // TODO: Cache this call
        const account = await this.getAccount();
        try {
            return account.viewFunction({
                contractId,
                methodName: FT_BALANCE_METHOD,
                args: { account_id: account.accountId },
            });
        } catch (e: any) {
            //eslint-disable-next-line no-console
            console.warn("Error in getTokenBalance: ", e);
            return "0";
        }
    }

    async getAccountTokens(): Promise<Token[]> {
        const contractIds = await this.apiService.getLikelyTokens({ address: this.getAddress(), chain: this.chain });
        const tokens: Token[] = [];

        for (const contractId of contractIds) {
            try {
                const [balance, metadata] = await Promise.all([this.getTokenBalance(contractId), this.getTokenMetadata(contractId)]);
                if (BalanceOperations.BNIsBigger(balance, "0")) {
                    tokens.push({
                        balance: formatTokenAmount(balance, metadata.decimals.toString()),
                        metadata,
                        contractId: contractId,
                    });
                }
            } catch (e) {
                //eslint-disable-next-line no-console
                console.warn("Error in getAccountTokens: ", contractId, e);
                continue;
            }
        }
        return tokens;
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
            gas: new BN(NFT_TRANSFER_GAS),
            attachedDeposit: new BN(TOKEN_TRANSFER_DEPOSIT),
        });

        return tx.transaction_outcome.id;
    }

    // User has nfts of contract
    async getNftTokensAmount(contractId: string): Promise<number> {
        const account = await this.getAccount();
        return account.viewFunction({
            contractId,
            methodName: NFT_SUPPLY_METHOD,
            args: { account_id: account.accountId },
        });
    }

    async getNftMetadata(contractId: string): Promise<NftMetadata> {
        const account = await this.getAccount();
        return account.viewFunction({
            contractId,
            methodName: NFT_METADATA_METHOD,
            args: {},
        });
    }

    // Mintbase non-standard method
    private async getNftTokenMetadata(contractId: string, tokenId: string, baseUri: string): Promise<NftMetadata> {
        const account = await this.getAccount();
        let metadata = await account.viewFunction({
            contractId,
            methodName: NFT_TOKEN_METADATA_METHOD,
            args: { token_id: tokenId },
        });

        if (!metadata.media && metadata.reference) {
            try {
                metadata = await (await fetch(`${baseUri}/${metadata.reference}`)).json();
            } catch {}
        }

        return metadata;
    }

    // Necessary for Mintbase nfts
    private async parseNftToken(token: any, contractId: string, baseUri: string | null): Promise<NftToken> {
        // Adapt for Mintbase NFTs
        if (token.id && !token.token_id) {
            token.token_id = token.id.toString();
            delete token.id;
        }

        if (token.owner_id && token.owner_id.Account) {
            token.owner_id = token.owner_id.Account;
        }

        if (!token.metadata || !token.metadata.media) {
            token.metadata = {
                ...token.metadata,
                ...(await this.getNftTokenMetadata(contractId, token.token_id, baseUri!)),
            };
        }

        const media = token.metadata.media;
        if (media && media.includes("://")) {
            token.metadata.media_url = media;
            token.metadata.media = null;
        }
        if (media && !media.includes("://") && !media.startsWith("data:image")) {
            const url = baseUri ? `${baseUri}/${media}` : `https://cloudflare-ipfs.com/ipfs/${media}`;
            token.metadata.media_url = url;
            token.metadata.media = null;
        }

        return token;
    }

    async getNftToken(contractId: string, tokenId: string, baseUri?: string): Promise<NftToken | null> {
        const account = await this.getAccount();
        const token = await account.viewFunction({
            contractId,
            methodName: NFT_TOKEN_METHOD,
            args: { token_id: tokenId },
        });

        if (!token) {
            return null;
        }

        return this.parseNftToken(token, contractId, baseUri || null);
    }

    async getNftTokens(contractId: string, baseUri: string | null): Promise<NftToken[]> {
        const account = await this.getAccount();
        let tokens: NftToken[] = [];
        try {
            const tokenIds = await account.viewFunction({
                contractId,
                methodName: NFT_OWNER_TOKENS_SET_METHOD,
                args: { account_id: account.accountId },
            });
            tokens = await Promise.all(
                tokenIds.map(async (tokenId: number | string) => ({
                    token_id: tokenId.toString(),
                    owner_id: account.accountId,
                    metadata: await this.getNftTokenMetadata(contractId, tokenId.toString(), baseUri!),
                })),
            );
        } catch (err: any) {
            if (!err.toString().includes("MethodResolveError(MethodNotFound)")) {
                throw err;
            }
            tokens = await account.viewFunction({
                contractId,
                methodName: NFT_OWNER_TOKENS_METHOD,
                args: { account_id: account.accountId },
            });
        }
        const parsedTokens = tokens.map((token: any) => this.parseNftToken(token, contractId, baseUri));
        return Promise.all(parsedTokens);
    }

    async getNfts(): Promise<NftToken[]> {
        const contractIds = await this.apiService.getLikelyNfts({ address: this.getAddress() });
        const nftTokens: NftToken[] = [];

        for (const contractId of contractIds) {
            let contractNfts = 0;
            try {
                contractNfts = await this.getNftTokensAmount(contractId);
            } catch {
                // eslint-disable-next-line no-console
                console.warn("Error getting nft amount for contract", contractId);
            }

            if (contractNfts > 0) {
                try {
                    const collectionMetadata = await this.getNftMetadata(contractId);
                    const newNftTokens = await this.getNftTokens(contractId, collectionMetadata.base_uri);
                    nftTokens.push(
                        ...newNftTokens.map((token: NftToken) => ({ ...token, collection_metadata: collectionMetadata, contractId })),
                    );
                } catch {
                    // eslint-disable-next-line no-console
                    console.warn("Error getting nft tokens for contract", contractId);
                }
            }
        }

        return nftTokens;
    }

    /**
     * @section SIGNER METHODS
     */

    async getAccountId(): Promise<string> {
        const account = await this.getAccount();
        return account.accountId;
    }

    async getAccessKeys(): Promise<AccessKeyInfoView[]> {
        const account = await this.getAccount();
        return account.getAccessKeys();
    }

    async deleteAccessKey(publicKey: string): Promise<string> {
        const account = await this.getAccount();
        if (publicKey === this.keyPair.getPublicKey().toString()) throw new Error("Cannot delete main key");
        const tx = await account.deleteKey(publicKey);
        return tx.transaction_outcome.id;
    }

    public getPublicKey(): string {
        return this.keyPair.getPublicKey().toString();
    }

    public async isAccountConnected(contractId: string) {
        const accessKeys = await this.getAccessKeys();
        return accessKeys.some((key) => {
            if (typeof key.access_key.permission === "object") {
                return key.access_key.permission.FunctionCall && key.access_key.permission.FunctionCall.receiver_id === contractId;
            }
            return false;
        });
    }

    public async disconnectSmartContract(contractId: string): Promise<string[]> {
        const account = await this.getAccount();

        const accessKeys = await this.getAccessKeys();
        const contractAccessKey = accessKeys.filter(
            ({ access_key: { permission } }) => typeof permission === "object" && permission.FunctionCall.receiver_id === contractId,
        );

        if (!contractAccessKey) throw new Error("Contract not connected");
        const txs: string[] = [];
        for (const key of contractAccessKey) {
            const tx = await account.deleteKey(key.public_key);
            txs.push(tx.transaction_outcome.id);
        }
        return txs;
    }

    public async signAndSendTransaction(receiver: string, actions: NearAction[]): Promise<FinalExecutionOutcome> {
        const account = await this.getAccount();
        // @ts-ignore
        return account.signAndSendTransaction({ receiverId: receiver, actions });
    }

    async signMessage(message: string, recipient: string, nonce: Buffer, callbackUrl?: string) {
        // Get key from the wallet
        const Key = this.keyPair;

        // Check the nonce is a 32bytes array
        if (nonce.byteLength != 32) {
            throw Error("Expected nonce to be a 32 bytes buffer");
        }

        // Create the payload and sign it
        const payload = new Payload({ message, nonce, recipient, callbackUrl });
        const borshPayload = Borsh.serialize(
            {
                struct: {
                    prefix: "u32",
                    message: "string",
                    nonce: { array: { type: "u8", len: 32 } },
                    recipient: "string",
                    callbackUrl: { option: { struct: { callbackUrl: "string" } } },
                },
            },
            payload,
        );
        const hashedPayload = JSsha256.sha256.array(borshPayload);
        const { signature } = Key.sign(Uint8Array.from(hashedPayload));

        const encoded: string = Buffer.from(signature).toString("base64");

        // Return the AuthenticationToken
        return { accountId: this.getAddress(), publicKey: this.getPublicKey(), signature: encoded };
    }

    public async getAccountFullAccessPublicKeys(accountId: string): Promise<string[]> {
        const connection = this.getConnection();
        const account = await connection.account(accountId);
        const accessKeys = await account.getAccessKeys();
        const keys: string[] = [];

        for (const key of accessKeys) {
            if (key.access_key.permission === "FullAccess") keys.push(key.public_key);
        }

        return keys;
    }
}
