import { Transaction, TransactionStatus, TransactionType } from "../types";

export const transaction: Transaction = {
    status: TransactionStatus.COMMITTED,
    transactionHash: "0xa43e1c45350cdcf16bfd0e5dda832302cf34300054f1ddeb571cf6ce178bb700",
    inputs: [],
    outputs: [],
    blockHash: "0x36d810d978e50426f52b29d36e3a1e7a9a1eb14a9ece2f30da16e9c81c61398b",
    blockNumber: 4821477,
    type: TransactionType.SEND_CKB,
    amount: 10250,
    timestamp: new Date("2022-03-25T10:59:05.094Z"),
};

export const transactions: Transaction[] = [
    {
        status: TransactionStatus.COMMITTED,
        transactionHash: "0x8997875ae2f4b1e42e5a894dd2a2ba147bf2f4c9e0e58ddf4a6dff38b4a254be",
        inputs: [],
        outputs: [],
        blockHash: "0xb83e97ab314cf6980385a0d9bdb885d3b380e85967a913b00dcb7376ec380a83",
        blockNumber: 4425606,
        type: TransactionType.RECEIVE_CKB,
        amount: 10000,
        timestamp: new Date("2022-02-16T18:39:35.639Z"),
    },
    {
        status: TransactionStatus.COMMITTED,
        transactionHash: "0x1a50505b2a0a7e8eebb06fda96abcbff6551f2b5711ba8266fd4a6f35833aa05",
        inputs: [],
        outputs: [],
        blockHash: "0x17a505353a671db2874b8a789a2706cab69579919ea577fe893d3a1686b211a4",
        blockNumber: 4479608,
        type: TransactionType.DEPOSIT_DAO,
        amount: 1000,
        timestamp: new Date("2022-02-21T18:48:21.881Z"),
    },
    {
        status: TransactionStatus.COMMITTED,
        transactionHash: "0x992208eab19d0f8ce5a2fc10579d8d614d265aa12851ea140ec717f2f41b925f",
        inputs: [],
        outputs: [],
        blockHash: "0x4b3422f42a72c313c74d4b1c15a89fa16d466f8602dea9cd097cf0544177356d",
        blockNumber: 4479744,
        type: TransactionType.DEPOSIT_DAO,
        amount: 150,
        timestamp: new Date("2022-02-21T19:03:28.714Z"),
    },
    {
        status: TransactionStatus.COMMITTED,
        transactionHash: "0x805168dafc0c10ae31de2580541db0f5ee8ff53afb55e39a5e2eeb60f878553f",
        inputs: [],
        outputs: [],
        blockHash: "0x7895667ef62cf0b4bc7be9485577d7feaf9c278fd1b50e9f66cdc3292cf32335",
        blockNumber: 4498929,
        type: TransactionType.WITHDRAW_DAO,
        amount: 1000,
        timestamp: new Date("2022-02-23T13:33:31.920Z"),
    },
    {
        status: TransactionStatus.COMMITTED,
        transactionHash: "0x62e2b992ca219b27e7c508e65c0bacd92403a467a213cbc1d148d09cd8a553ae",
        inputs: [],
        outputs: [],
        blockHash: "0x8ed8e88a9eb337e453ca6937ebc010676689037e7d1b93f8b9bc0ac155e61a05",
        blockNumber: 4519481,
        type: TransactionType.RECEIVE_CKB,
        amount: 10000,
        timestamp: new Date("2022-02-25T11:23:47.510Z"),
    },
    {
        status: TransactionStatus.COMMITTED,
        transactionHash: "0xda24328c67b182c0354d76385e952451ffb8964bc447ef69fdade5e20cbb1dd8",
        inputs: [],
        outputs: [],
        blockHash: "0x569e198c49fad75e0f30545aedd1f6da5c1972ca1199577bbb3cd788c31a207e",
        blockNumber: 4553464,
        type: TransactionType.RECEIVE_TOKEN,
        amount: 142,
        timestamp: new Date("2022-02-28T14:52:53.713Z"),
    },
    {
        status: TransactionStatus.COMMITTED,
        transactionHash: "0x54658a3934b8b5c2bc7a68c5f118f2509dbdd2cd64f3d24c75901c2ba74cb026",
        inputs: [],
        outputs: [],
        blockHash: "0x75c679dd2e3bd40f0836daa8f60c0af9f2a9a6f76898639bb1c5261a2cb7a018",
        blockNumber: 4553477,
        type: TransactionType.RECEIVE_TOKEN,
        amount: 142,
        timestamp: new Date("2022-02-28T14:54:52.556Z"),
    },
    {
        status: TransactionStatus.COMMITTED,
        transactionHash: "0x45ae27991ea926a28bd0ef0d3dbbb2350fb1dc3bceff6de4272c4a00027d36a0",
        inputs: [],
        outputs: [],
        blockHash: "0x203e6bded8043383ff19db72c2947d8e18e3ca843be16f0205f861c089ab09fd",
        blockNumber: 4572537,
        type: TransactionType.RECEIVE_CKB,
        amount: 10000,
        timestamp: new Date("2022-03-02T09:23:53.839Z"),
    },
    {
        status: TransactionStatus.COMMITTED,
        transactionHash: "0x9f0cf27529cc2a7253e709072540976d94b2756375b355bf01b8e4fc6a2a3e11",
        inputs: [],
        outputs: [],
        blockHash: "0x6ffc4841a709a9de597a7bf480044c3a88b4e9a6281c4184a67714319ea3574b",
        blockNumber: 4582890,
        type: TransactionType.DEPOSIT_DAO,
        amount: 12000,
        timestamp: new Date("2022-03-03T08:33:34.858Z"),
    },
    {
        status: TransactionStatus.COMMITTED,
        transactionHash: "0x1ac185a0ad7bb3ad02bf2ed99c0fd5c3d528ac21dc657620065dfd727d470f31",
        inputs: [],
        outputs: [],
        blockHash: "0x70fdbc559b3517a9682f555fe5340fd725baab5104f7fcc7c33bfafc37854741",
        blockNumber: 4812409,
        type: TransactionType.RECEIVE_CKB,
        amount: 10000,
        timestamp: new Date("2022-03-24T14:46:42.237Z"),
    },
    {
        status: TransactionStatus.COMMITTED,
        transactionHash: "0x94e11b622743fbcd9261b9f509d9bd9b121fffb6faac9b9fb582e45da2319614",
        inputs: [],
        outputs: [],
        blockHash: "0x711be54800cdbf6c1607c8098b276fadf7ead000d06cce1489d0ff5f35e8b291",
        blockNumber: 4887015,
        type: TransactionType.SMART_CONTRACT,
        amount: 150,
        timestamp: new Date("2022-03-31T12:37:41.173Z"),
    },
    {
        status: TransactionStatus.COMMITTED,
        transactionHash: "0x81bbc439433bc380f6910752bb2ed1ed3bc520d0d7678376a1baf3dd571649b2",
        inputs: [
            {
                quantity: 39842,
                address: "ckb1qqypm0l63rdt2jayymfrrjnyadmqe630a8skwcdpmfqqmgdje0sjsqfyxx8e4nfdhtjf2eynl0wnx5zprz6s77gmudv2e",
            },
            {
                quantity: 9485,
                address: "ckb1qyqy5vmywpty6p72wpvm0xqys8pdtxqf6cmsr8p2l0",
            },
            {
                quantity: 49532,
                address: "ckb1qyqdmeuqrsrnm7e5vnrmruzmsp4m9wacf6vsxasryq",
            },
        ],
        outputs: [],
        blockHash: "0x89ff1fad43de1ea3e42961215224755478a9fc08033bc1f17bfed0207ad989ef",
        blockNumber: 4724117,
        type: TransactionType.RECEIVE_CKB,
        amount: 10000,
        timestamp: new Date("2022-03-16T10:32:34.819Z"),
    },
    {
        status: TransactionStatus.COMMITTED,
        transactionHash: "0x9469fc7c6991197ee6f370244402b75cba78360fa4d553ad082fbb0dae2d7626",
        inputs: [],
        outputs: [],
        blockHash: "0xdaf0f5a30827722f26f276a64019c24fab05d0b22cb20cef5cbc17ec7d9bf30f",
        blockNumber: 4812273,
        type: TransactionType.DEPOSIT_DAO,
        amount: 2000,
        timestamp: new Date("2022-03-24T14:28:12.771Z"),
    },
    {
        status: TransactionStatus.COMMITTED,
        transactionHash: "0xe53b34a7a670fd634173039cb38a9c70b1a2405870db5730375c7534c5af1d26",
        inputs: [],
        outputs: [],
        blockHash: "0xc3df9c214b728a3231a35625b6e374401230d05b8f978a2b97d17c3793c5b545",
        blockNumber: 4813293,
        type: TransactionType.SEND_CKB,
        amount: 10250,
        timestamp: new Date("2022-03-24T16:40:18.414Z"),
    },
    {
        status: TransactionStatus.COMMITTED,
        transactionHash: "0xa43e1c45350cdcf16bfd0e5dda832302cf34300054f1ddeb571cf6ce178bb700",
        inputs: [],
        outputs: [],
        blockHash: "0x36d810d978e50426f52b29d36e3a1e7a9a1eb14a9ece2f30da16e9c81c61398b",
        blockNumber: 4821477,
        type: TransactionType.SEND_CKB,
        amount: 10250,
        timestamp: new Date("2022-03-25T10:59:05.094Z"),
    },
    {
        status: TransactionStatus.COMMITTED,
        transactionHash: "0x9469fc7c6991197ee6f370244402b75cba78360fa4d553ad082fbb0dae2d7626",
        inputs: [],
        outputs: [],
        blockHash: "0xdaf0f5a30827722f26f276a64019c24fab05d0b22cb20cef5cbc17ec7d9bf30f",
        blockNumber: 4812273,
        type: TransactionType.DEPOSIT_DAO,
        amount: 2000,
        timestamp: new Date("2022-03-24T14:28:12.771Z"),
    },
    {
        status: TransactionStatus.COMMITTED,
        transactionHash: "0xa43e1c45350cdcf16bfd0e5dda832302cf34300054f1ddeb571cf6ce178bb700",
        inputs: [],
        outputs: [
            {
                quantity: 10250,
                address: "ckb1qqypm0l63rdt2jayymfrrjnyadmqe630a8skwcdpmfqqmgdje0sjsqfyxx8e4nfdhtjf2eynl0wnx5zprz6s77gmudv2e",
            },
        ],
        blockHash: "0x36d810d978e50426f52b29d36e3a1e7a9a1eb14a9ece2f30da16e9c81c61398b",
        blockNumber: 4821477,
        type: TransactionType.SEND_CKB,
        amount: 10250,
        timestamp: new Date("2022-03-25T10:59:05.094Z"),
    },
];
