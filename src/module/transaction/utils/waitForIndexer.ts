import { config } from "config";

export default function waitForIndexer(): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, config.indexerEstimatedDelay));
}
