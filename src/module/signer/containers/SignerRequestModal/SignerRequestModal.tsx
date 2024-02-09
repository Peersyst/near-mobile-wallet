import { createModal, Skeleton, useModal } from "@peersyst/react-native-components";
import CardSelectModal from "module/common/component/feedback/CardSelectModal/CardSelectModal";
import SignRequestDetails from "module/signer/components/display/SignRequestDetails/SignRequestDetails";
import { SignerModalProps } from "module/signer/hooks/useSignerModal";
import SignatureScaffold from "module/signer/components/layout/SignatureScaffold/SignatureScaffold";
import useSignRequestActions from "module/signer/queries/useSignRequestActions";
import LoadingModal from "module/common/component/feedback/LoadingModal/LoadingModal";
import useTranslate from "module/common/hook/useTranslate";
import useHandleSignerRequestError from "./hooks/useHandleSignerRequestError";
import useSignerRequest from "module/signer/hooks/useSignerRequest";
import useRejectSignerRequest from "module/signer/queries/useRejectSignerRequest";

const SignerRequestModal = createModal(({ id, ...modalProps }: SignerModalProps): JSX.Element => {
    const translate = useTranslate();
    const { hideModal } = useModal();

    const { signerRequest, isLoading } = useSignerRequest(id);

    const { signerRequestError, isSignerRequestError } = useHandleSignerRequestError(signerRequest);
    const close = () => hideModal(SignerRequestModal.id);

    const { mutate: signRequest, isLoading: isSigning, isError: isSignError, isSuccess } = useSignRequestActions();
    const { mutate: rejectRequest, isLoading: isRejecting, isError: isRejectError } = useRejectSignerRequest({ onSuccess: close });

    const handleSign = () => signRequest({ id, transactions: signerRequest!.requests });
    const handleReject = () => rejectRequest(id);

    return (
        <CardSelectModal {...modalProps} title={translate("reviewRequest")} dismissal="close" style={{ height: "95%" }}>
            <Skeleton loading={isLoading}>
                {isSignerRequestError ? (
                    signerRequestError
                ) : (
                    <>
                        <SignatureScaffold
                            onSign={handleSign}
                            onReject={handleReject}
                            sign={{ loading: isSigning, disabled: isSuccess || isSignError || isRejecting || isRejectError }}
                            reject={{
                                loading: isRejecting,
                                disabled: isSuccess || isSignError || isRejectError,
                            }}
                        >
                            <SignRequestDetails request={signerRequest!} />
                        </SignatureScaffold>
                        <LoadingModal
                            loading={isSigning}
                            success={isSuccess}
                            error={isSignError}
                            successMessage={translate("requestSignedSuccessfully")}
                            onClose={close}
                        />
                    </>
                )}
            </Skeleton>
        </CardSelectModal>
    );
});

export default SignerRequestModal;
