import { ReactNode } from "react";

const keyboardAwareScrollView = jest.createMockFromModule("react-native-keyboard-aware-scroll-view") as any;

keyboardAwareScrollView.KeyboardAwareScrollView = ({ children }: { children: ReactNode }) => children;

module.exports = keyboardAwareScrollView;
