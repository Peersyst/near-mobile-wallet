import { useMutation } from "react-query";
import sendTransaction from "module/transaction/mock/sendTransaction";

const useSendTransaction = () => useMutation(sendTransaction);

export default useSendTransaction;
