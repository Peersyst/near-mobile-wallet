import { ActionMock } from "mocks/NearSdk/action.mock";
import BaseMock from "../base.mock";
import { UseServiceInstanceMock } from "../wallet";

export interface UseGetActionsMockType {
    actions: ActionMock[];
}

export class UseGetActionMock extends BaseMock {
    actions: ActionMock[];
    constructor({ actions }: Partial<UseGetActionsMockType> = {}) {
        super();
        this.actions = actions || [new ActionMock()];
        const { serviceInstance } = new UseServiceInstanceMock();
        this.mock = jest.spyOn(serviceInstance, "getRecentActivity").mockResolvedValue(this.actions);
    }
}
