import { SharePayload } from "@peersyst/react-native-components";
import ShareButton, { ShareButtonProps } from "module/common/component/input/ShareButton/ShareButton";
import useShareTxHashButton from "./hooks/useShareTxHashButton";

export interface ShareTxButtonProps extends Omit<ShareButtonProps, keyof SharePayload> {
    txHash: string;
}

const ShareTxHashButton = ({ txHash, ...rest }: ShareTxButtonProps) => {
    const { shareContent } = useShareTxHashButton(txHash);
    return <ShareButton shareContent={shareContent} {...rest} />;
};

export default ShareTxHashButton;
