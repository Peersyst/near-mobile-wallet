import { useEffect, useState } from "react";
import { Col } from "react-native-components";
import Keyboard from "../Keyboard/Keyboard";
import PinDisplay from "../../display/PinDisplay/PinDisplay";
import { NumericPadProps } from "module/common/component/input/NumericPad/NumericPad.types";

const NumericPad = ({ onSubmit, error: errorProp = false, placeholder, style: styleProp }: NumericPadProps): JSX.Element => {
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

    const { gap = 40, ...style } = styleProp || {};
    return (
        <Col gap={gap} justifyContent="space-between" alignItems={"center"} style={style}>
            <PinDisplay length={value.length} error={error && !value.length} placeholder={error ? undefined : placeholder} />
            <Keyboard setValue={setValue} />
        </Col>
    );
};

export default NumericPad;
