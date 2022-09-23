import { useEffect, useState } from "react";
import Keyboard from "../Keyboard/Keyboard";
import PinDisplay from "../../display/PinDisplay/PinDisplay";
import { NumericPadProps } from "module/common/component/input/NumericPad/NumericPad.types";
import { Col, Row } from "@peersyst/react-native-components";
import { useTranslate } from "module/common/hook/useTranslate";
import Button from "module/common/component/input/Button/Button";
import { NumericPadRoot } from "module/common/component/input/NumericPad/NumericPad.styles";

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
        <NumericPadRoot style={style}>
            <Row justifyContent="center">
                <PinDisplay
                    length={value.length}
                    error={error && !value.length}
                    placeholder={error ? undefined : placeholder?.toUpperCase()}
                />
            </Row>
            <Col gap="6%" style={style}>
                <Keyboard setValue={setValue} />
                {onCancel && (
                    <Button variant="text" fullWidth onPress={onCancel}>
                        {translate("cancel")}
                    </Button>
                )}
            </Col>
        </NumericPadRoot>
    );
};

export default NumericPad;
