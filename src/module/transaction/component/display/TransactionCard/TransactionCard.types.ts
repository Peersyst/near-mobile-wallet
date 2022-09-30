import { FullTransaction } from "module/common/service/CkbSdkService.types";
import { MainListCardProps } from "module/main/component/display/MainListCard/MainListCard";

export interface TransactionCardProps extends Partial<MainListCardProps> {
    transaction: FullTransaction;
}
