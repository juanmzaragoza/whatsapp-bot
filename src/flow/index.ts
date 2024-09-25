import { createFlow } from '@builderbot/bot';
import { flowData } from './config';
import { flowHumanThisChat, flowHumanAllChats, blackListFlow, flowHumanBlacklist } from './human.flow';
import { createNestedFlows } from './helper/create-nested-flow.helper';

const nestedFlows = createNestedFlows(flowData);
export const adapterFlow = createFlow([
  ...Object.values(nestedFlows), 
  flowHumanThisChat,
  flowHumanAllChats,
  blackListFlow,
  flowHumanBlacklist
]);