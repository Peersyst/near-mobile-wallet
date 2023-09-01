import { DAppTagOption, DAppTagSelectProps } from "./DAppTagSelect.types";
import useDAppTagSelectOptions from "./hooks/useDAppTagSelectOptions";
import { useTranslate } from "module/common/hook/useTranslate";
import { DAppTagSelectRoot } from "./DAppTagSelect.styles";

const DAppTagSelect = ({ defaultValue = "all", ...props }: DAppTagSelectProps): JSX.Element => {
    const translate = useTranslate();
    const options = useDAppTagSelectOptions();

    return (
        <DAppTagSelectRoot<DAppTagOption> title={translate("dAppCategories")} defaultValue={defaultValue} options={options} {...props} />
    );
};

export default DAppTagSelect;
