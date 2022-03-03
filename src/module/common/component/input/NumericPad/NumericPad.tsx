import { useEffect, useState } from "react";
import Keyboard from "../Keyboard/Keyboard";
import PinDisplay from "../../display/PinDisplay/PinDisplay";
import { NumericPadProps } from "module/common/component/input/NumericPad/NumericPad.types";
import { Col, Row } from "react-native-components";
import PressableText from "module/common/component/base/input/PressableText/PressableText";
import { translate } from "locale";

const NumericPad = ({ onSubmit, error: errorProp = false, placeholder, style, onCancel }: NumericPadProps): JSX.Element => {
    const [value, setValue] = useState<string>("");
    const [error, setError] = useState<boolean>(errorProp);

    useEffect(() => {
        if (value.length > 3) {
            onSubmit(value);
            setValue("");
        }
    }, [onSubmit, value]);

    useEffect(() => {
        setError(errorProp);
    }, [errorProp]);

    return (
        <Col style={style} justifyContent="space-around" flex={1}>
            <Row justifyContent="center">
                <PinDisplay length={value.length} error={error && !value.length} placeholder={error ? undefined : placeholder} />
            </Row>
            <Col style={style} gap={"8%"}>
                <Keyboard setValue={setValue} />
                <PressableText
                    style={{ marginHorizontal: "17.8%", marginBottom: "2%" }}
                    variant="body1"
                    textAlign="right"
                    onPress={onCancel}
                >
                    {translate("cancel")}
                </PressableText>
            </Col>
        </Col>
    );
};

export default NumericPad;
