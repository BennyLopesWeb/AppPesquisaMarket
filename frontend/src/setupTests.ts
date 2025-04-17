import { server } from "../tests/mocks/server";
import "@testing-library/jest-dom";

// Inicia o mock server antes de todos os testes
beforeAll(() => server.listen());
// Limpa após cada teste
afterEach(() => server.resetHandlers());
// Fecha o server após os testes
afterAll(() => server.close());
