import { Skeleton, createModal, useModal } from "@peersyst/react-native-components";
import CardSelectModal from "module/common/component/feedback/CardSelectModal/CardSelectModal";
import SignModalScaffold from "module/signer/components/layout/SignModalScaffold/SignModalScaffold";
import SignMessageDetails from "module/signer/components/display/SignMessageDetails/SignMessageDetails";
import { SignerModalProps } from "module/signer/hooks/useSignerModal";
import useGetSignMessageRequest from "module/signer/queries/useGetSignMessageRequest";
import { useTranslate } from "module/common/hook/useTranslate";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import NetworkMismatchError from "module/signer/components/feedback/NetworkMismatchError/NetworkMismatchError";
import useSignMessage from "module/signer/queries/useSignMessage";
import LoadingModal from "module/common/component/feedback/LoadingModal/LoadingModal";

const MessageSignerModal = createModal(({ id, ...props }: SignerModalProps): JSX.Element => {
    const translate = useTranslate();
    const { hideModal } = useModal();

    const { data: signMessageRequest, isLoading } = useGetSignMessageRequest(id);

    const network = useSelectedNetwork();
    const matchingNetwork = network === signMessageRequest?.network;

    const { mutate: signMessage, isLoading: isSigning, isError, isSuccess } = useSignMessage();

    const close = () => hideModal(MessageSignerModal.id);

    const handleSign = () =>
        signMessage({ id: signMessageRequest!.id, message: signMessageRequest!.message, receiver: signMessageRequest!.receiver });
    const handleReject = () => close();

    return (
        <CardSelectModal {...props} title={translate("signMessage")} dismissal="close" style={{ height: "90%" }}>
            <Skeleton loading={isLoading}>
                {!matchingNetwork ? (
                    <NetworkMismatchError />
                ) : (
                    <>
                        <SignModalScaffold
                            onSign={handleSign}
                            onReject={handleReject}
                            sign={{ loading: isSigning, disabled: isSuccess || isError }}
                            reject={{ loading: isSigning, disabled: isSuccess || isError }}
                        >
                            <SignMessageDetails
                                receiver={signMessageRequest!.receiver}
                                message={signMessageRequest!.message}
                                metadata={signMessageRequest.receiverMetadata}
                            />
                        </SignModalScaffold>
                        <LoadingModal
                            loading={isSigning}
                            success={isSuccess}
                            error={isError}
                            successMessage={translate("messageSignedSuccessfully")}
                            onExited={close}
                        />
                    </>
                )}
            </Skeleton>
        </CardSelectModal>
    );
});

export default MessageSignerModal;
