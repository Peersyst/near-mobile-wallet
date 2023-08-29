import { SelectProps } from "module/common/component/input/Select/Select";
import { DAppTag } from "../../display/DApp/DApp.types";

export type DAppTagOption = DAppTag | "all";

export type DAppTagSelectProps = Omit<SelectProps<DAppTagOption>, "options" | "title">;
