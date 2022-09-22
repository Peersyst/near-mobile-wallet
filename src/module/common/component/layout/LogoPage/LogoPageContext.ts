import { createContext, useContext, useEffect } from "react";

export interface LogoPageContextType {
    setLogoFlex: (flex: number) => void;
    setGradient: (gradient: boolean) => void;
}

export const LogoPageContext = createContext<LogoPageContextType>({ setLogoFlex: () => undefined, setGradient: () => undefined });
export const LogoPageProvider = LogoPageContext.Provider;
export const LogoPageConsumer = LogoPageContext.Consumer;

export const useLogoPageFlex = (flex: number) => {
    const setLogoFlex = useContext(LogoPageContext).setLogoFlex;
    useEffect(() => {
        setLogoFlex(flex);
    }, [flex, setLogoFlex]);
};

export const useLogoPageGradient = (gradient: boolean) => {
    const setGradient = useContext(LogoPageContext).setGradient;
    useEffect(() => {
        setGradient(gradient);
    }, [gradient, setGradient]);
};
