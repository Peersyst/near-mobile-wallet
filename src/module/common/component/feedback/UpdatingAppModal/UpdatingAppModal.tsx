import { UpdatingAppModalProps } from "./UpdatingAppModal.types";
import useTranslate from "module/common/hook/useTranslate";
import LoadingModal from "../LoadingModal/LoadingModal";

export function UpdatingAppModal(props: UpdatingAppModalProps): JSX.Element {
    const translate = useTranslate();
    return <LoadingModal processingMessage={translate("updatingApp")} {...props} />;
}
