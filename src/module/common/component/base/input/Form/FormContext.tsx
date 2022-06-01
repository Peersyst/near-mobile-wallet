import { createContext } from "react";
import { FormContextInterface } from "./Form.types";

export const FormContext = createContext<FormContextInterface>({
    valid: true,
    notifyForm: () => undefined,
    submitted: false,
    handleSubmit: () => undefined,
});
export const FormProvider = FormContext.Provider;
export const FormConsumer = FormContext.Consumer;
