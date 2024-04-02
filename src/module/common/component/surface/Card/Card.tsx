import { PaperProps } from "@peersyst/react-native-components";
import { CardRoot } from "./Card.styles";

export interface CardProps extends PaperProps {
    variant?: "gray" | "blue";
}

const Card = ({ children, variant = "gray", ...rest }: CardProps) => {
    return (
        <CardRoot variant={variant} {...rest}>
            {children}
        </CardRoot>
    );
};

export default Card;
