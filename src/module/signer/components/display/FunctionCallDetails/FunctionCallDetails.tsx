import { Col } from "@peersyst/react-native-components";
import PermissionField from "../PermissionField/PermissionField";
import { FunctionCallDetailsProps } from "./FunctionCallDetails.types";
import Container from "module/common/component/display/Container/Container";
import useFunctionCallPermissions from "./hooks/useFunctionCallPermissions";
import ActionDetailField from "../ActionDetailField/ActionDetailField";
import { ClipboardListIcon } from "icons";
import Balance from "module/wallet/component/display/Balance/Balance";
import { useTranslate } from "module/common/hook/useTranslate";
import { convertYoctoToNear } from "near-peersyst-sdk";

const FunctionCallDetails = ({ permission: { allowance: allowanceInYocto, receiverId } }: FunctionCallDetailsProps): JSX.Element => {
    const translate = useTranslate();
    const permissions = useFunctionCallPermissions();

    const allowanceInNEAR = allowanceInYocto && convertYoctoToNear(allowanceInYocto);

    return (
        <Col gap={16}>
            {permissions.map((permission, index) => (
                <PermissionField key={index} {...permission} />
            ))}
            <Container>
                <Col alignItems="center" justifyContent="center">
                    <ActionDetailField label={translate("contract")} content={receiverId} leftIcon={ClipboardListIcon} />
                    {allowanceInNEAR && (
                        <ActionDetailField
                            label={translate("networkFeeAllowance")}
                            content={<Balance variant="body2Strong" balance={allowanceInNEAR} units="token" />}
                            description={translate("networkFeeAllowanceDescription", { amount: allowanceInNEAR })}
                            leftIcon={ClipboardListIcon}
                        />
                    )}
                </Col>
            </Container>
        </Col>
    );
};

export default FunctionCallDetails;
