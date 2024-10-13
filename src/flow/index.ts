import { createFlow } from '@builderbot/bot';
import { flowHumanThisChat, flowHumanAllChats, blackListFlow, flowHumanBlacklist } from './human.flow';
import { flowData } from './config';
import { createNestedFlows } from './helper/create-nested-flow.helper';
import { chooseOptionFlow, googleSheetFlow } from './google-sheet.flow';

export const adapterFlow = createFlow([
  ...createNestedFlows(flowData),
  googleSheetFlow,
  chooseOptionFlow,
  flowHumanThisChat,
  flowHumanAllChats,
  blackListFlow,
  flowHumanBlacklist
]);