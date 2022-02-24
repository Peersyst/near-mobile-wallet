import { useContext } from "react";
import { FormContext } from "react-native-components";

export interface UseFormResult {
    valid: boolean;
    handleSubmit: () => any;
}

export default function useForm(): UseFormResult {
    const { valid, handleSubmit } = useContext(FormContext);
    return { valid, handleSubmit };
}
