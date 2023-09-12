import { createModal, Skeleton, useModal } from "@peersyst/react-native-components";
import CardSelectModal from "module/common/component/feedback/CardSelectModal/CardSelectModal";
import SignRequestDetails from "module/signer/components/display/SignRequestDetails/SignRequestDetails";
import { SignerModalProps } from "module/signer/hooks/useSignerModal";
import useGetSignerRequest from "module/signer/queries/useGetSignerRequest";
import SignatureScaffold from "module/signer/components/layout/SignatureScaffold/SignatureScaffold";
import useSignRequestActions from "module/signer/queries/useSignRequestActions";
import LoadingModal from "module/common/component/feedback/LoadingModal/LoadingModal";
import { useTranslate } from "module/common/hook/useTranslate";
import { SignerRequestModalProvider } from "./SignerRequestModalContext";
import { useState } from "react";
import useHandleSignerRequestError from "./hooks/useHandleSigneRequestError";

const SignerRequestModal = createModal(({ id, ...modalProps }: SignerModalProps): JSX.Element => {
    const translate = useTranslate();
    const { hideModal } = useModal();

    const { data: signerRequest, isLoading } = useGetSignerRequest(id);

    const { signerRequestError, isSignerRequestError } = useHandleSignerRequestError(signerRequest);

    const [signerWalletIndex, setSignerWalletIndex] = useState<number>();

    const { mutate: signRequest, isLoading: isSigning, isError: isSignError, isSuccess } = useSignRequestActions(signerWalletIndex);

    const close = () => hideModal(SignerRequestModal.id);

    const handleSign = () =>
        signRequest({ id, actions: signerRequest?.requests[0].actions, receiverId: signerRequest?.requests[0].receiverId });
    const handleReject = () => close();

    return (
        <CardSelectModal {...modalProps} title={translate("reviewRequest")} dismissal="close" style={{ height: "95%" }}>
            <Skeleton loading={isLoading}>
                {isSignerRequestError ? (
                    signerRequestError
                ) : (
                    <SignerRequestModalProvider value={{ signerWalletIndex, setSignerWalletIndex }}>
                        <SignatureScaffold
                            onSign={handleSign}
                            onReject={handleReject}
                            sign={{ loading: isSigning, disabled: isSuccess || isSignError }}
                            reject={{ loading: isSigning, disabled: isSuccess || isSignError }}
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
                    </SignerRequestModalProvider>
                )}
            </Skeleton>
        </CardSelectModal>
    );
});

export default SignerRequestModal;
