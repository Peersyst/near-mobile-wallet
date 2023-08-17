import { Skeleton, createModal, useModal } from "@peersyst/react-native-components";
import CardSelectModal from "module/common/component/feedback/CardSelectModal/CardSelectModal";
import SignModalScaffold from "module/signer/components/layout/SignModalScaffold/SignModalScaffold";
import SignMessageDetails from "module/signer/components/display/SignMessageDetails/SignMessageDetails";
import { SignerModalProps } from "module/signer/hooks/useSignerModal";
import useGetSignMessageRequest from "module/signer/queries/useGetSignMessageRequest";

const MessageSignerModal = createModal(({ id, ...props }: SignerModalProps): JSX.Element => {
    const { hideModal } = useModal();

    const { data: signMessageRequest = { receiver: "", message: "" }, isLoading } = useGetSignMessageRequest(id);

    const close = () => hideModal(MessageSignerModal.id);

    const handleSign = () => close();

    const handleReject = () => close();

    return (
        <CardSelectModal {...props} title="Sign message" dismissal="close" style={{ height: "60%" }}>
            <Skeleton loading={isLoading}>
                <SignModalScaffold onSign={handleSign} onReject={handleReject}>
                    <SignMessageDetails receiver={signMessageRequest.receiver} message={signMessageRequest.message} />
                </SignModalScaffold>
            </Skeleton>
        </CardSelectModal>
    );
});

export default MessageSignerModal;
