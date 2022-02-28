import { SizeType } from "module/common/types";
import { Logotip as Logo } from "./Logotip.styles";

export interface LogotipProps {
    size?: SizeType;
}

export type LogotipSizeRelationsType = Record<SizeType, { width: number; height: number }>;

export default Logo;
