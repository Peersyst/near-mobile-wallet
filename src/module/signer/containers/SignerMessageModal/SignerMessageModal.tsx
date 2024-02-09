import { Skeleton, createModal, useModal } from "@peersyst/react-native-components";
import CardSelectModal from "module/common/component/feedback/CardSelectModal/CardSelectModal";
import SignatureScaffold from "module/signer/components/layout/SignatureScaffold/SignatureScaffold";
import SignMessageDetails from "module/signer/components/display/SignMessageDetails/SignMessageDetails";
import { SignerModalProps } from "module/signer/hooks/useSignerModal";
import useGetSignMessageRequest from "module/signer/queries/useGetSignMessageRequest";
import useTranslate from "module/common/hook/useTranslate";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import useSignMessage from "module/signer/queries/useSignMessage";
import LoadingModal from "module/common/component/feedback/LoadingModal/LoadingModal";
import NetworkMismatchError from "module/signer/components/feedback/NetworkMismatchError/NetworkMismatchError";
import useRejectMessageRequest from "module/signer/queries/useRejectMessageRequest";

const SignerMessageModal = createModal(({ id, ...props }: SignerModalProps): JSX.Element => {
    const translate = useTranslate();
    const { hideModal } = useModal();

    const { data: signMessageRequest, isLoading } = useGetSignMessageRequest(id);

    const network = useSelectedNetwork();
    const matchingNetwork = network === signMessageRequest?.network;

    const close = () => hideModal(SignerMessageModal.id);

    const { mutate: signMessage, isLoading: isSigning, isError, isSuccess } = useSignMessage();
    const { mutate: rejectMessage, isLoading: isRejecting, isError: isRejectError } = useRejectMessageRequest({ onSuccess: close });

    const handleSign = () =>
        signMessage({
            id: signMessageRequest!.id,
            message: signMessageRequest!.message,
            receiver: signMessageRequest!.receiver,
            nonce: Buffer.from(signMessageRequest!.nonce),
            callbackUrl: signMessageRequest?.callbackUrl,
        });
    const handleReject = () => rejectMessage(id);

    return (
        <CardSelectModal {...props} title={translate("signMessage")} dismissal="close" style={{ height: "90%" }}>
            <Skeleton loading={isLoading}>
                {!matchingNetwork ? (
                    <NetworkMismatchError />
                ) : (
                    <>
                        <SignatureScaffold
                            onSign={handleSign}
                            onReject={handleReject}
                            sign={{ loading: isSigning, disabled: isSuccess || isError || isRejecting || isRejectError }}
                            reject={{ loading: isRejecting, disabled: isSuccess || isError || isSigning || isRejectError }}
                        >
                            <SignMessageDetails
                                receiver={signMessageRequest!.receiver}
                                message={signMessageRequest!.message}
                                metadata={signMessageRequest.receiverMetadata}
                            />
                        </SignatureScaffold>
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

export default SignerMessageModal;
