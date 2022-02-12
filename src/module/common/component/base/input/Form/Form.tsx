import { useRef, useState } from "react";
import { FormProvider } from "./FormContext";
import { useFormSubmit } from "./hooks";
import { FieldNotification, FieldState, FormProps } from "./Form.types";
import { View } from "react-native";

const Form = ({ style, children, onSubmit, onInvalid }: FormProps): JSX.Element => {
    const [valid, setValid] = useState(true);
    const data = useRef<Record<string, FieldState>>({});
    const handleNotification = ({ name, ...state }: FieldNotification): void => {
        data.current[name] = state;

        if ((valid && !state.valid) || (!valid && state.valid)) {
            setValid(Object.values(data.current).every((v) => v.valid === true));
        }
    };
    const { submitted, handleSubmit } = useFormSubmit(data.current, onSubmit, onInvalid);

    return (
        <FormProvider
            value={{
                notifyForm: handleNotification,
                valid,
                submitted,
                handleSubmit,
            }}
        >
            <View style={style}>{children}</View>
        </FormProvider>
    );
};

export default Form;
