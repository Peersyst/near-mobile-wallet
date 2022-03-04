export interface ActiveProps {
    active: boolean;
}

export interface BreadcrumbItemProps extends ActiveProps {
    number: number;
}

export interface BreadcrumbsProps {
    index: number;
    length: number;
}

export interface BreadcrumbsLineProps {
    length: number;
    active: boolean;
}
