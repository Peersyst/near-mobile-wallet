import { SignerRequestDto } from "module/api/service";
import { ActionParams } from "./actions.types";

export interface SignRequestDetailsProps {
    request: SignerRequestDto;
}

export interface ActionDetailsProps {
    params: ActionParams;
}
