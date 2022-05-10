import { Easing } from "react-native";
import { RefreshIcon } from "icons";
import { Animated, IconButton } from "react-native-components";
import useSelectedWallet from "module/wallet/hook/useSelectedWallet";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { useEffect, useRef } from "react";
import { classify } from "@peersyst/react-utils";

const AnimatedRefreshIcon = Animated.createAnimatedComponent(classify(RefreshIcon));

const RefreshButton = (): JSX.Element => {
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "-360deg"],
    });

    const { synchronizing = false } = useSelectedWallet() || {};
    const handleRefresh = async () => {
        for (let i = 0; i < serviceInstancesMap.size; i += 1) {
            await serviceInstancesMap.get(i)?.synchronize();
        }
    };

    const animation = useRef(
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ),
    ).current;

    useEffect(() => {
        if (synchronizing) animation.start();
        else {
            animation.reset();
            rotateAnim.setValue(0);
        }
    }, [synchronizing]);

    return (
        <IconButton disabled={synchronizing} onPress={handleRefresh}>
            <AnimatedRefreshIcon style={{ transform: [{ rotate: spin }] }} />
        </IconButton>
    );
};

export default RefreshButton;
