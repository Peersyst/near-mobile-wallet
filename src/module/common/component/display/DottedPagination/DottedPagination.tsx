import { Row } from "@peersyst/react-native-components";
import { PaginationDot } from "module/common/component/display/DottedPagination/DottedPagination.styles";
import { DottedPaginationProps } from "./DottedPagination.types";

const DottedPagination = ({ pages, currentPage }: DottedPaginationProps) => {
    return (
        <Row justifyContent="center" gap={5}>
            {[...Array(pages)].map((_, i) => {
                const isActive = currentPage === i + 1;
                return <PaginationDot active={isActive} style={isActive ? { width: 20 } : { width: 10 }} key={i} />;
            })}
        </Row>
    );
};

export default DottedPagination;
