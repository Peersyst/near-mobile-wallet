import { DAppMetadataDto, SignerRequestDto } from "refactor/data-access/api/service";
import { ActionParams } from "./actions.types";

export interface SignRequestDetailsProps {
    request: SignerRequestDto;
}

export interface ActionDetailsProps {
    params: ActionParams;
    receiverId?: string;
    metadata?: DAppMetadataDto;
}
