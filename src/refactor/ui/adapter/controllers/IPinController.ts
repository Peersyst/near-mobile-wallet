export interface IPinController {
    setPin(pin: string): Promise<void>;
    checkPin(pin: string): Promise<boolean>;
    removePin(): Promise<void>;
    isPinSet(): Promise<boolean>;
}
