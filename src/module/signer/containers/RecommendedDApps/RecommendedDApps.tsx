import DisconnectableDAppList from "module/signer/components/display/DisconnectableDAppList/DisconnectableDAppList";
import useRecommendedDApps from "module/signer/hooks/useRecommendedDApps";

const RecommendedDApps = (): JSX.Element => {
    const dapps = useRecommendedDApps();

    return <DisconnectableDAppList dapps={dapps} />;
};

export default RecommendedDApps;
