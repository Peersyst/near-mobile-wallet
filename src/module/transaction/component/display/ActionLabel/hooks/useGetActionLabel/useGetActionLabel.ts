import { useTranslate } from "module/common/hook/useTranslate";
import { TransactionActionKind } from "near-peersyst-sdk";
import { AddedTransactionActionKind, EnhancedTransactionAction } from "../../../ActionCard/ActionCard.types";

export const useGetActionLabel = ({
    actionKind,
    publicKey,
    codeSha256,
    methodName,
    transaction: { receiverAccountId },
}: EnhancedTransactionAction): string => {
    const translate = useTranslate();
    switch (actionKind) {
        case TransactionActionKind.STAKE: {
            return translate("stake_added");
        }
        case TransactionActionKind.CREATE_ACCOUNT: {
            return `${translate("new_account_created")}: ${receiverAccountId}`;
        }
        case TransactionActionKind.DELETE_ACCOUNT: {
            return `${translate("account_deleted")}: ${publicKey}`;
        }
        case TransactionActionKind.DEPLOY_CONTRACT: {
            return `${translate("contract_deployed")}: ${codeSha256}`;
        }
        case TransactionActionKind.FUNCTION_CALL: {
            return `${translate("called")} ${methodName} ${translate("method_in")} ${receiverAccountId}`;
        }
        case TransactionActionKind.ADD_KEY: {
            return `${translate("key_added")}: ${publicKey}`;
        }
        case TransactionActionKind.DELETE_KEY: {
            return `${translate("key_deleted")}: ${publicKey}`;
        }
        case AddedTransactionActionKind.TRANSFER_SEND: {
            return `${translate("send_to")} ${receiverAccountId}`;
        }
        case AddedTransactionActionKind.TRANSFER_RECEIVE: {
            return `${translate("from")} ${receiverAccountId}`;
        }
        default: {
            return translate("unknown_action"); //assert (maybe in the future there are new actions)
        }
    }
};
