import { formatDate } from "module/common/hook/useFormatDate";

export const formatDateTest = (date: Date | string | number) => {
    return formatDate("en", date);
};

export default formatDateTest;
