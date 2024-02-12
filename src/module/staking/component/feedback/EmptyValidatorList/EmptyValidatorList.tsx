import EmptyListComponent, { EmptyListComponentProps } from "module/common/component/display/EmptyListComponent/EmptyListComponent";
import useTranslate from "module/common/hook/useTranslate";

export type EmptyValidatorListProps = Pick<EmptyListComponentProps, "text">;

const EmptyValidatorList = ({ text }: EmptyValidatorListProps) => {
    const translateError = useTranslate("error");
    return <EmptyListComponent title={translateError("no_validators")} text={text} />;
};

export default EmptyValidatorList;
