import { TransactionDto, TransactionActionDto, TransactionKWDto, Transaction, TransactionAction } from "./NearSdkService.types";

// Until no indexer
export const EXTERNAL_NEAR_API = true;

export class NearApiParserService {
    static parseTransactionActionDto(transactionActionDto: TransactionActionDto): TransactionAction {
        return {
            transactionHash: transactionActionDto.transactionHash,
            indexInTransaction: transactionActionDto.indexInTransaction,
            actionKind: transactionActionDto.actionKind,
            codeSha256: transactionActionDto.args?.code_sha256,
            gas: transactionActionDto.args?.gas,
            deposit: transactionActionDto.args?.deposit,
            argsBase64: transactionActionDto.args?.args_base64,
            argsJson: transactionActionDto.args?.args_json,
            methodName: transactionActionDto.args?.method_name,
            stake: transactionActionDto.args?.stake,
            publicKey: transactionActionDto.args?.public_key,
            accessKey: transactionActionDto.args?.access_key
                ? {
                      nonce: transactionActionDto.args.access_key.nonce,
                      permission: {
                          permissionKind: transactionActionDto.args.access_key.permission?.permission_kind,
                          permissionDetails: transactionActionDto.args.access_key.permission?.permission_details
                              ? {
                                    allowance: transactionActionDto.args.access_key.permission.permission_details.allowance,
                                    receiverId: transactionActionDto.args.access_key.permission.permission_details.receiver_id,
                                    methodNames: transactionActionDto.args.access_key.permission.permission_details.method_names,
                                }
                              : undefined,
                      },
                  }
                : undefined,
            beneficiaryId: transactionActionDto.args?.beneficiary_id,
        };
    }

    static parseTransactionDto(transactionDto: TransactionDto): Transaction {
        return {
            transactionHash: transactionDto.transactionHash,
            includedInBlockHash: transactionDto.includedInBlockHash,
            blockTimestamp: transactionDto.blockTimestamp,
            signerAccountId: transactionDto.signerAccountId,
            nonce: transactionDto.nonce,
            receiverAccountId: transactionDto.receiverAccountId,
            status: transactionDto.status,
            transactionActions: transactionDto.transactionActions
                .map(NearApiParserService.parseTransactionActionDto)
                .sort((a, b) => a.indexInTransaction - b.indexInTransaction),
        };
    }

    static parseTransactionKWDto(transactionKWDto: TransactionKWDto): Transaction {
        return {
            transactionHash: transactionKWDto.hash,
            includedInBlockHash: transactionKWDto.block_hash,
            blockTimestamp: transactionKWDto.block_timestamp,
            signerAccountId: transactionKWDto.signer_id,
            receiverAccountId: transactionKWDto.receiver_id,
            transactionActions: [
                {
                    transactionHash: transactionKWDto.hash,
                    indexInTransaction: transactionKWDto.action_index,
                    actionKind: transactionKWDto.action_kind,
                    codeSha256: transactionKWDto.args?.code_sha256,
                    gas: transactionKWDto.args?.gas,
                    deposit: transactionKWDto.args?.deposit,
                    argsBase64: transactionKWDto.args?.args_base64,
                    argsJson: transactionKWDto.args?.args_json,
                    methodName: transactionKWDto.args?.method_name,
                    stake: transactionKWDto.args?.stake,
                    publicKey: transactionKWDto.args?.public_key,
                    accessKey: transactionKWDto.args?.access_key
                        ? {
                              nonce: transactionKWDto.args.access_key.nonce,
                              permission: {
                                  permissionKind: transactionKWDto.args.access_key.permission?.permission_kind,
                                  permissionDetails: transactionKWDto.args.access_key.permission?.permission_details
                                      ? {
                                            allowance: transactionKWDto.args.access_key.permission.permission_details.allowance,
                                            receiverId: transactionKWDto.args.access_key.permission.permission_details.receiver_id,
                                            methodNames: transactionKWDto.args.access_key.permission.permission_details.method_names,
                                        }
                                      : undefined,
                              },
                          }
                        : undefined,
                    beneficiaryId: transactionKWDto.args?.beneficiary_id,
                },
            ],
        };
    }
}

async function handleFetch<T>(url: string): Promise<T> {
    const response: Response = await fetch(url);
    if (response.status !== 200) throw new Error(`Error ${response.status} ${response.statusText}`);
    const data = await response.json();
    return data as T;
}

export class NearApiService {
    static async getAccountsFromPublicKey(publicKey: string, baseApiUrl: string): Promise<string[]> {
        let response: Response;

        if (!EXTERNAL_NEAR_API) {
            response = await fetch(`${baseApiUrl}/accounts/public-key/${publicKey}`);
        } else {
            response = await fetch(`${baseApiUrl}/publicKey/${publicKey}/accounts`);
        }

        if (response.status !== 200) {
            throw new Error("Bad response status");
        }
        const accounts: string[] = await response.json();
        return accounts;
    }

    static async getTransactions(address: string, baseApiUrl: string, page = 1, pageSize = 15): Promise<Transaction[]> {
        let url = "";
        if (!EXTERNAL_NEAR_API) {
            const transactionDtos = await handleFetch<TransactionDto[]>(
                `${baseApiUrl}/transactions/?accountId=${address}&page=${page}&pageSize=${pageSize}`,
            );
            return transactionDtos.map(NearApiParserService.parseTransactionDto);
        }

        const response = await fetch(`${baseApiUrl}/account/${address}/activity`);
        if (response.status !== 200) {
            throw new Error("Bad response status");
        }

        const transactionDtos: TransactionKWDto[] = await response.json();
        return transactionDtos.map(NearApiParserService.parseTransactionKWDto);
    }

    static async getStakingDeposits(address: string, baseApiUrl: string): Promise<{ validatorId: string; amount: number }[]> {
        if (!EXTERNAL_NEAR_API) {
            const response = await fetch(`${baseApiUrl}/accounts/${address}/staking-deposits`);
            if (response.status !== 200) {
                throw new Error("Bad response status");
            }
            const stakingDeposits: { validatorId: string; amount: number }[] = await response.json();
            return stakingDeposits;
        }

        const response = await fetch(`${baseApiUrl}/staking-deposits/${address}`);
        if (response.status !== 200) {
            throw new Error("Bad response status");
        }
        const stakingDeposits: { validator_id: string; deposit: string }[] = await response.json();
        return stakingDeposits.map((stkgDep) => ({ validatorId: stkgDep.validator_id, amount: parseInt(stkgDep.deposit, 10) }));
    }

    static async getLikelyTokens(address: string, baseApiUrl: string): Promise<string[]> {
        let response: Response;

        if (!EXTERNAL_NEAR_API) {
            response = await fetch(`${baseApiUrl}/accounts/${address}/likely-tokens?fromBlockTimestamp=0`);
        } else {
            response = await fetch(`${baseApiUrl}/account/${address}/likelyTokensFromBlock?fromBlockTimestamp=0`);
        }

        if (response.status !== 200) {
            throw new Error("Bad response status");
        }

        const contractIds: string[] = await response.json();
        return contractIds;
    }

    static async getLikelyNfts(address: string, baseApiUrl: string): Promise<string[]> {
        let response: Response;

        if (!EXTERNAL_NEAR_API) {
            response = await fetch(`${baseApiUrl}/accounts/${address}/likely-nfts?fromBlockTimestamp=0`);
        } else {
            response = await fetch(`${baseApiUrl}/account/${address}/likelyNFTsFromBlock?fromBlockTimestamp=0`);
        }

        if (response.status !== 200) {
            throw new Error("Bad response status");
        }

        const contractIds: string[] = await response.json();
        return contractIds;
    }
}
