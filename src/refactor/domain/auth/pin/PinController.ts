import DomainError from "refactor/domain/error/DomainError";
import { IPinRepository } from "refactor/domain/adapter/repository/IPinRepository";
import { IPinController } from "refactor/ui/adapter/controllers/IPinController";
import DomainEvents from "refactor/domain/events";
import PinErrorCodes from "./PinErrorCodes";

export default class PinController implements IPinController {
    constructor(private readonly pinRepository: IPinRepository) {}

    onInit(): void {
        // Listen for logout event to remove the Mnemonic
        DomainEvents.auth.on("logout", () => {
            this.removePin();
        });
    }

    /**
     * Sets the PIN.
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

        if (!storedPin) throw new DomainError(PinErrorCodes.PIN_IS_NOT_SET);

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
