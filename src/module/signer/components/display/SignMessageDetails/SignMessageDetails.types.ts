import { DAppMetadataDto } from "module/api/service";

export interface SignMessageDetailsProps {
    receiver: string;
    message: string;
    metadata?: DAppMetadataDto;
}
