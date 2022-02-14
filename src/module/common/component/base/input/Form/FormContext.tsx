import { createContext } from "react";
import { FormContextInterface } from "./Form.types";

export const FormContext = createContext<Partial<FormContextInterface>>({});
export const FormProvider = FormContext.Provider;
export const FormConsumer = FormContext.Consumer;
