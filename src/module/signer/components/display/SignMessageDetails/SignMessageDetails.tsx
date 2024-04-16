import { SignMessageDetailsProps } from "./SignMessageDetails.types";
import ActionDetailsScaffold from "../../layout/ActionDetailsScaffold/ActionDetailsScaffold";
import { ConnectIcon } from "icons";
import ActionDetailField from "../ActionDetailField/ActionDetailField";
import Container from "module/common/component/display/Container/Container";
import useTranslate from "module/common/hook/useTranslate";
import SignerWalletSelector from "module/signer/containers/SignerWalletSelector/SignerWalletSelector";

const SignMessageDetails = ({ receiver, message, metadata }: SignMessageDetailsProps): JSX.Element => {
    const previewProps = metadata ? { dAppPreview: { logoUrl: metadata.logoUrl, Icon: ConnectIcon } } : undefined;
    const translate = useTranslate();

    return (
        <ActionDetailsScaffold
            header={translate("signMessage")}
            description={translate("signMessageDescription", { receiver })}
            showPreview
            previewProps={previewProps}
        >
            <Container>
                <ActionDetailField label={translate("message")} description={message} />
            </Container>
            <SignerWalletSelector />
        </ActionDetailsScaffold>
    );
};

export default SignMessageDetails;
