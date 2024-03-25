import { Col, Typography } from "@peersyst/react-native-components";

export interface DetailsNftModalHeaderProps {
    title?: string;
    owner?: string;
}

const DetailsNftModalHeader = ({ title, owner }: DetailsNftModalHeaderProps) => {
    return (
        <Col gap={6}>
            {title && (
                <Typography variant="body1Strong" numberOfLines={1}>
                    {title}
                </Typography>
            )}

            {owner && (
                <Typography variant="body3Strong" numberOfLines={1} color="primary">
                    {owner}
                </Typography>
            )}
        </Col>
    );
};

export default DetailsNftModalHeader;
