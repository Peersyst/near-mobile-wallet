export interface ActiveProps {
    active: boolean;
}

export interface BreadcrumbItemProps extends ActiveProps {
    number: number;
}

export interface BreadcrumbProps {
    numberOfActive: number;
    length: number;
}

export interface BreadcrumbLineProps {
    length: number;
    active: boolean;
}
