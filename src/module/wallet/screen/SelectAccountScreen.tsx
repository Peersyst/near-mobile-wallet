import { Col, Form, FormProps } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import { useTranslate } from "module/common/hook/useTranslate";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import WalletSelectorGroup from "../component/input/WalletSelectorGroup/WalletSelectorGroup";

export interface SelectAccountScreenProps {
    name: string;
    onSubmit: FormProps["onSubmit"];
    children?: ReactNode;
    submitText?: string;
    withBalanceError?: boolean;
    style?: ViewStyle;
}

const SelectAccountScreen = ({ name, onSubmit, children, submitText, withBalanceError, style }: SelectAccountScreenProps) => {
    const translate = useTranslate();
    return (
        <Form onSubmit={onSubmit} style={{ flex: 1, ...style }}>
            <Col gap="10%" flex={1}>
                <Col flex={1} gap="6%">
                    {children}
                    <WalletSelectorGroup name={name} defaultValue={0} withBalanceError={withBalanceError} />
                </Col>
                <Button fullWidth type="submit">
                    {submitText || translate("continue")}
                </Button>
            </Col>
        </Form>
    );
};

export default SelectAccountScreen;
