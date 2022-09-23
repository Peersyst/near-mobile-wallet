import { useEffect, useState } from "react";
import Keyboard from "../Keyboard/Keyboard";
import PinDisplay from "../../display/PinDisplay/PinDisplay";
import { NumericPadProps } from "module/common/component/input/NumericPad/NumericPad.types";
import { Col, Row, PressableText } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";

const NumericPad = ({ onSubmit, error: errorProp = false, placeholder, style, onCancel }: NumericPadProps): JSX.Element => {
    const [value, setValue] = useState<string>("");
    const [error, setError] = useState<boolean>(errorProp);
    const translate = useTranslate();
    useEffect(() => {
        if (value.length > 3) {
            onSubmit(value)?.then(() => {
                setValue("");
            });
        }
    }, [onSubmit, value]);

    useEffect(() => {
        setError(errorProp);
    }, [errorProp]);

    return (
        <Col style={{ marginTop: "40%", minHeight: "70%", ...style }} justifyContent="space-around" gap={30}>
            <Row justifyContent="center">
                <PinDisplay length={value.length} error={error && !value.length} placeholder={error ? undefined : placeholder} />
            </Row>
            <Col gap={"8%"}>
                <Keyboard setValue={setValue} />
                {onCancel && (
                    <PressableText
                        style={{ marginHorizontal: "17.8%", marginBottom: "2%" }}
                        variant="body1"
                        textAlign="right"
                        onPress={onCancel}
                    >
                        {translate("cancel")}
                    </PressableText>
                )}
            </Col>
        </Col>
    );
};

export default NumericPad;
