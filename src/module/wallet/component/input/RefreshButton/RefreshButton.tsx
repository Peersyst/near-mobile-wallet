import { Easing } from "react-native";
import { RefreshIcon } from "icons";
import { Animated, IconButton } from "react-native-components";
import { serviceInstancesMap } from "module/wallet/state/WalletState";
import { useEffect, useRef, useState } from "react";
import { classify } from "@peersyst/react-utils";
import useWalletState from "module/wallet/hook/useWalletState";

const AnimatedRefreshIcon = Animated.createAnimatedComponent(classify(RefreshIcon));

const RefreshButton = (): JSX.Element => {
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "-360deg"],
    });

    const {
        state: { wallets },
    } = useWalletState();
    const [ownSynchronizing, setOwnSynchronizing] = useState(false);
    const synchronizing = ownSynchronizing || wallets.some((w) => w.synchronizing);

    const handleRefresh = async () => {
        setOwnSynchronizing(true);
        for (let i = 0; i < serviceInstancesMap.size; i += 1) {
            await serviceInstancesMap.get(i)?.synchronize();
        }
        setOwnSynchronizing(false);
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
