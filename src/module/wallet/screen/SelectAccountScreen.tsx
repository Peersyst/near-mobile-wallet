import { Col, Form, FormProps } from "@peersyst/react-native-components";
import { config } from "config";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import WalletSelectorGroup from "../component/input/WalletSelectorGroup/WalletSelectorGroup";
import { WalletSelectorProps } from "../component/input/WalletSelectorGroup/WalletSelectorGroup.types";

export interface SelectAccountScreenProps {
    name: string;
    onSubmit: FormProps["onSubmit"];
    children?: ReactNode;
    submitText?: string;
    minBalanceToCreateAccount?: WalletSelectorProps["minBalance"];
    style?: ViewStyle;
}

const SelectAccountScreen = ({
    name,
    onSubmit,
    children,
    submitText,
    style,
    minBalanceToCreateAccount = config.minBalanceToCreateAccount,
}: SelectAccountScreenProps) => {
    const translate = useTranslate();
    return (
        <Form onSubmit={onSubmit} style={{ flex: 1, ...style }}>
            <Col gap="10%" flex={1}>
                <Col flex={1} gap="6%">
                    {children}
                    <WalletSelectorGroup name={name} defaultValue={0} minBalance={minBalanceToCreateAccount} />
                </Col>
                <Button fullWidth type="submit">
                    {submitText || translate("continue")}
                </Button>
            </Col>
        </Form>
    );
};

export default SelectAccountScreen;
