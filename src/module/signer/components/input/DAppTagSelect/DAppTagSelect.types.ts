import { SelectProps } from "module/common/component/input/Select/Select";
import { DAppTag } from "module/signer/types";

export type DAppTagOption = DAppTag | "all";

export type DAppTagSelectProps = Omit<SelectProps<DAppTagOption>, "options" | "title">;
