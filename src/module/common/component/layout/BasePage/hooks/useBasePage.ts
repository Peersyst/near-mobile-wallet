import { useContext } from "react";
import { BasePageContext } from "../context/BasePageContext";

export const useBasePage = () => {
    return useContext(BasePageContext);
};
