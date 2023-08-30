import { Col } from "@peersyst/react-native-components";
import PermissionField from "../PermissionField/PermissionField";
import { FunctionCallDetailsProps } from "./FunctionCallDetails.types";
import Container from "module/common/component/display/Container/Container";
import useFunctionCallPermissions from "./hooks/useFunctionCallPermissions";
import ActionDetailField from "../ActionDetailField/ActionDetailField";
import { ClipboardListIcon, DatabaseIcon } from "icons";
import Balance from "module/wallet/component/display/Balance/Balance";
import { useTranslate } from "module/common/hook/useTranslate";
import { convertYoctoToNear } from "near-peersyst-sdk";
import { useFormatBalance } from "module/wallet/component/display/Balance/hook/useFormatBalance";
import { BalanceProps } from "module/wallet/component/display/Balance/Balance.types";

const FunctionCallDetails = ({ permission: { allowance: allowanceInYocto = "", receiverId } }: FunctionCallDetailsProps): JSX.Element => {
    const translate = useTranslate();
    const permissions = useFunctionCallPermissions();

    const allowanceInNEAR = convertYoctoToNear(allowanceInYocto);

    const balanceProps: Partial<BalanceProps> = { units: "token" };
    const formatedAllowance = useFormatBalance(allowanceInNEAR, balanceProps);

    return (
        <Col gap={16}>
            {permissions.map((permission, index) => (
                <PermissionField key={index} {...permission} />
            ))}
            <Container>
                <Col gap={16} alignItems="center" justifyContent="center">
                    <ActionDetailField label={translate("contract")} content={receiverId} leftIcon={ClipboardListIcon} />
                    {!!allowanceInNEAR && (
                        <ActionDetailField
                            label={translate("networkFeeAllowance")}
                            content={<Balance variant="body2Strong" balance={allowanceInNEAR} {...balanceProps} />}
                            description={translate("networkFeeAllowanceDescription", { amount: formatedAllowance })}
                            leftIcon={DatabaseIcon}
                        />
                    )}
                </Col>
            </Container>
        </Col>
    );
};

export default FunctionCallDetails;
