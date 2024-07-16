import { NearSDKService } from "../NearSdkService";

/**
 * Decorator to check if there is a cash instance in the device
 */
export default function RPCControl() {
    return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const _this = this as NearSDKService;
            const isAvailable = await _this.checkRpcHealthStatus();
            if (!isAvailable) {
                await _this.switchRpcUrl();
            }

            return await originalMethod.apply(this, args);
        };

        return descriptor;
    };
}
