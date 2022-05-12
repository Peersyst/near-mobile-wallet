import { TransactionStatusIndicatorRoot } from "./TransactionStatusIndicator.styles";
import { TransactionStatus } from "ckb-peersyst-sdk";
import { Animated, Easing } from "react-native";
import { useEffect, useRef } from "react";
import { classify } from "@peersyst/react-utils";

export interface TransactionStatusIndicatorProps {
    status: TransactionStatus;
}

const AnimatedTransactionStatusIndicator = Animated.createAnimatedComponent(classify(TransactionStatusIndicatorRoot));

const TransactionStatusIndicator = ({ status }: TransactionStatusIndicatorProps): JSX.Element => {
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const animation = useRef(
        Animated.loop(
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ),
    ).current;

    useEffect(() => {
        if (status === TransactionStatus.PENDING || status === TransactionStatus.PROPOSED) animation.start();
        else {
            animation.reset();
            fadeAnim.setValue(1);
        }
    }, [status]);

    return <AnimatedTransactionStatusIndicator style={{ opacity: fadeAnim }} status={status} />;
};

export default TransactionStatusIndicator;
