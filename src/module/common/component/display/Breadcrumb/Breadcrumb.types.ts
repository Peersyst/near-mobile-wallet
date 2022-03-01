export interface ActiveProps {
    active: boolean;
}

export interface BreadcrumpItemProps extends ActiveProps {
    number: number;
}

export interface BreadcrumpProps {
    numberOfActive: number;
    length: number;
}
