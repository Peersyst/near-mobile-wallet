import { Col, Form, FormProps, ScrollView } from "@peersyst/react-native-components";
import Button from "module/common/component/input/Button/Button";
import useTranslate from "module/common/hook/useTranslate";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import WalletSelectorGroup from "../component/input/WalletSelectorGroup/WalletSelectorGroup";
import { WalletSelectorProps } from "../component/input/WalletSelectorGroup/WalletSelectorGroup.types";

export interface SelectAccountScreenProps {
    name: string;
    defaultWalletIndex?: number;
    onSubmit: FormProps["onSubmit"];
    children?: ReactNode;
    submitText?: string;
    minBalance?: WalletSelectorProps["minBalance"];
    style?: ViewStyle;
}

const SelectAccountScreen = ({
    name,
    onSubmit,
    children,
    submitText,
    defaultWalletIndex = 0,
    style,
    minBalance,
}: SelectAccountScreenProps) => {
    const translate = useTranslate();

    return (
        <Form onSubmit={onSubmit} style={{ flex: 1, position: "absolute", height: "100%", width: "100%", ...style }}>
            <Col gap="10%" flex={1}>
                <ScrollView>
                    <Col flex={1} gap="6%">
                        {children}
                        <WalletSelectorGroup name={name} defaultValue={defaultWalletIndex} minBalance={minBalance} />
                    </Col>
                </ScrollView>
                <Button fullWidth type="submit">
                    {submitText || translate("continue")}
                </Button>
            </Col>
        </Form>
    );
};

export default SelectAccountScreen;
