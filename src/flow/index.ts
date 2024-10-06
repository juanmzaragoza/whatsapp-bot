import { createFlow } from '@builderbot/bot';
import { flowHumanThisChat, flowHumanAllChats, blackListFlow, flowHumanBlacklist } from './human.flow';

export const adapterFlow = createFlow([
  flowHumanThisChat,
  flowHumanAllChats,
  blackListFlow,
  flowHumanBlacklist
]);