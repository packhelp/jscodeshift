import {defineInlineTest, defineTest} from 'jscodeshift/src/testUtils';
import useRootStoreToUseStore from "../use-root-store-to-use-store-migration";

// IMPORTANT:
// Nesting "it" in "describe" is forbidden

const inputCode = `
const { dielineService, authService, logger } = useRootStore()
`

const outputCode = `
const dielineService = useStore(Stores.DielineService);
const authService = useStore(Stores.AuthService);
const logger = useStore(Stores.Logger);
`

describe("use-root-store-to-use-store", () => {
  defineInlineTest(useRootStoreToUseStore, null, inputCode, outputCode);
});
