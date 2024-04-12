import { UpdatingAppModalProps } from "./UpdatingAppModal.types";
import useTranslate from "module/common/hook/useTranslate";
import LoadingModal from "../LoadingModal/LoadingModal";

export function UpdatingAppModal({ open = false }: UpdatingAppModalProps): JSX.Element {
    const translate = useTranslate();

    return (
        <LoadingModal
            loading={open}
            processingMessage={translate("updatingApp")}
            processingDescriptionMessage={translate("pleaseWaitAMoment")}
        />
    );
}
