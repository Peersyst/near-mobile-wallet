import { createModal, Skeleton, useModal } from "@peersyst/react-native-components";
import CardSelectModal from "module/common/component/feedback/CardSelectModal/CardSelectModal";
import SignRequestDetails from "module/signer/components/display/SignRequestDetails/SignRequestDetails";
import { SignerModalProps } from "module/signer/hooks/useSignerModal";
import useGetSignerRequest from "module/signer/queries/useGetSignerRequest";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import SignModalScaffold from "module/signer/components/layout/SignModalScaffold/SignModalScaffold";
import NetworkMismatchError from "module/signer/components/feedback/NetworkMismatchError/NetworkMismatchError";
import useSignRequestActions from "module/signer/queries/useSignRequestActions";

const RequestSignerModal = createModal(({ id, ...modalProps }: SignerModalProps): JSX.Element => {
    const { hideModal } = useModal();
    const network = useSelectedNetwork();

    const { data: signerRequest, isLoading } = useGetSignerRequest(id);

    const { mutate: signRequest, isLoading: isSigning } = useSignRequestActions();

    const matchingNetwork = network === signerRequest?.network;

    const close = () => hideModal(RequestSignerModal.id);

    const handleSign = () => signRequest({ id, actions: signerRequest?.requests[0].actions }, { onSuccess: close });
    const handleReject = () => close();

    return (
        <CardSelectModal {...modalProps} title="Sign request" dismissal="close" style={{ height: "60%" }}>
            <Skeleton loading={isLoading}>
                {!matchingNetwork ? (
                    <NetworkMismatchError />
                ) : (
                    <SignModalScaffold onSign={handleSign} onReject={handleReject} sign={{ loading: isSigning }}>
                        <SignRequestDetails request={signerRequest!} />
                    </SignModalScaffold>
                )}
            </Skeleton>
        </CardSelectModal>
    );
});

export default RequestSignerModal;
