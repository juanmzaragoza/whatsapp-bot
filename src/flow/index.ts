import { createFlow } from '@builderbot/bot';
import { flowHumanThisChat, flowHumanAllChats, blackListFlow, flowHumanBlacklist } from './human.flow';
import { flowData } from './config';
import { createNestedFlows } from './helper/create-nested-flow.helper';

export const adapterFlow = createFlow([
  ...createNestedFlows(flowData),
  flowHumanThisChat,
  flowHumanAllChats,
  blackListFlow,
  flowHumanBlacklist
]);