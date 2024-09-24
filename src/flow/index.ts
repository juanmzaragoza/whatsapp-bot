import { createFlow } from '@builderbot/bot';
import { flowData } from './config';
import { flowHumanThisChat, flowHumanAllChats, blackListFlow, flowHumanBlacklist } from './flowHuman';
import { createNestedFlows } from './helper/createNestedFlow';

const nestedFlows = createNestedFlows(flowData);
export const adapterFlow = createFlow([
  ...Object.values(nestedFlows), 
  flowHumanThisChat,
  flowHumanAllChats,
  blackListFlow,
  flowHumanBlacklist
]);