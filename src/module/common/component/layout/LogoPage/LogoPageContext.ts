import { createContext, useContext, useEffect } from "react";

export interface LogoPageContextType {
    setLogoFlex: (flex: number) => void;
}

export const LogoPageContext = createContext<LogoPageContextType>({ setLogoFlex: () => undefined });
export const LogoPageProvider = LogoPageContext.Provider;
export const LogoPageConsumer = LogoPageContext.Consumer;

export const useLogoPageFlex = (flex: number) => {
    const setLogoFlex = useContext(LogoPageContext).setLogoFlex;
    useEffect(() => {
        setLogoFlex(flex);
    }, [flex, setLogoFlex]);
};
