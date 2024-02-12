jest.mock("refactor/domain/adapter/ServiceFactory", () => new Proxy({}, { get: () => ({}) }));
jest.mock("refactor/domain/adapter/RepositoryFactory", () => new Proxy({}, { get: () => ({}) }));
