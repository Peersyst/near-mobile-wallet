import DomainError from "refactor/domain/error/DomainError";
import AuthErrorCodes from "../AuthErrorCodes";
import { IPinRepository } from "refactor/domain/adapter/repository/IPinRepository";
import { IPinController } from "refactor/ui/adapter/controllers/IPinController";

export default class PinController implements IPinController {
    constructor(private readonly pinRepository: IPinRepository) {}

    /**
     * Sets thePIN
     * @param pin
     */
    setPin(pin: string): Promise<void> {
        return this.pinRepository.setPin(pin);
    }

    /**
     * Checks if the given pin is correct
     * @param pin
     */
    async checkPin(pin: string): Promise<boolean> {
        const storedPin = await this.pinRepository.getPin();

        if (!storedPin) throw new DomainError(AuthErrorCodes.PIN_IS_NOT_SET);

        return storedPin === pin;
    }

    /**
     * Checks if the pin is set
     */
    async isPinSet(): Promise<boolean> {
        const storedPin = await this.pinRepository.getPin();
        return !!storedPin;
    }

    /**
     * Removes the PIN
     */
    async removePin(): Promise<void> {
        return this.pinRepository.removePin();
    }
}
