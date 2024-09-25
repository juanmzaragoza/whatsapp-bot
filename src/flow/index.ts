import { createFlow } from '@builderbot/bot';
import { flowHumanBlacklist } from './flowHuman';
import { flowWelcome } from './flowWelcome';

export const adapterFlow = createFlow([
  flowWelcome,
  flowHumanBlacklist
]);