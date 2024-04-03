import { PaperProps } from "@peersyst/react-native-components";
import { CardRoot } from "./Card.styles";

export interface CardProps extends PaperProps {
    variant?: "gray" | "blue" | "default";
}

const Card = ({ children, variant = "default", ...rest }: CardProps) => {
    return (
        <CardRoot variant={variant} {...rest}>
            {children}
        </CardRoot>
    );
};

export default Card;
