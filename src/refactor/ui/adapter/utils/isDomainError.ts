import { IDomainError } from "../IDomainError";

export default function isDomainError(error: any): error is IDomainError {
    return error instanceof Error && error.name === "DomainError";
}
