import { createModal, Typography, useModal } from "@peersyst/react-native-components";
import CardSelectModal from "module/common/component/feedback/CardSelectModal/CardSelectModal";

import SignRequestDetails from "module/signer/components/display/SignRequestDetails/SignRequestDetails";
import { SignerModalProps } from "module/signer/hooks/useSignerModal";
import useGetSignerRequest from "module/signer/queries/useGetSignerRequest";
import useSelectedNetwork from "module/settings/hook/useSelectedNetwork";
import SignModalScaffold from "module/signer/components/layout/SignModalScaffold/SignModalScaffold";

const RequestSignerModal = createModal(({ id, ...modalProps }: SignerModalProps): JSX.Element => {
    const { hideModal } = useModal();

    const { data: signerRequest, isLoading } = useGetSignerRequest(id);

    const network = useSelectedNetwork();

    const matchingNetwork = network === signerRequest?.network;

    const close = () => hideModal(RequestSignerModal.id);

    const handleSign = () => close();

    const handleReject = () => close();

    return (
        <CardSelectModal {...modalProps} title="Sign request" dismissal="close">
            {!matchingNetwork ? (
                // TODO: Add Error component here
                <Typography variant="body2Strong">This request is for a different network</Typography>
            ) : !isLoading ? (
                <SignModalScaffold onSign={handleSign} onReject={handleReject}>
                    <SignRequestDetails request={signerRequest!} />
                </SignModalScaffold>
            ) : (
                <Typography variant="body2Strong">Loading...</Typography>
            )}
            {}
        </CardSelectModal>
    );
});

export default RequestSignerModal;
