import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export enum DeviceSize {
    SMALL = "small",
    MEDIUM = "medium",
    LARGE = "large",
}
const useDeviceSize = (): DeviceSize => {
    const [deviceSize, setDeviceSize] = useState<DeviceSize>(DeviceSize.MEDIUM);

    useEffect(() => {
        const { height } = Dimensions.get("window");
        if (height < 620) {
            setDeviceSize(DeviceSize.SMALL);
        } else if (height >= 600 && height < 1000) {
            setDeviceSize(DeviceSize.MEDIUM);
        } else {
            setDeviceSize(DeviceSize.LARGE);
        }

        const handleDimensionsChange = ({ window: { height: newHeight } }: { window: { height: number } }) => {
            if (newHeight < 600) {
                setDeviceSize(DeviceSize.SMALL);
            } else if (newHeight >= 600 && newHeight < 1000) {
                setDeviceSize(DeviceSize.MEDIUM);
            } else {
                setDeviceSize(DeviceSize.LARGE);
            }
        };

        Dimensions.addEventListener("change", handleDimensionsChange);
    }, []);

    return deviceSize;
};

export default useDeviceSize;
