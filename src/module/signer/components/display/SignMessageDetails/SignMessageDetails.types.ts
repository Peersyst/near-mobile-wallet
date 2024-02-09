import { DAppMetadataDto } from "refactor/data-access/api/service";

export interface SignMessageDetailsProps {
    receiver: string;
    message: string;
    metadata?: DAppMetadataDto;
}
