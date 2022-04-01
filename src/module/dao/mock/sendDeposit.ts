export interface SendTransactionParams {
    mnemonic: string[];
    amount: string;
}

//eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (params: SendTransactionParams): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), 2000));
}
