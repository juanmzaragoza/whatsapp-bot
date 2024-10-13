import { createFlow } from '@builderbot/bot';
import { flowHumanNewChat } from './flowHuman';
import { flowWelcome } from './flowWelcome';
import { flowInfo } from './flowInfo';
import { flowDefault } from './flowDefault';
import { flowWorks } from './flowWorks';
import { flowServices } from './flowServices';
import { flowArrangeMeeting } from './flowArrangeMeeting';
import { chooseOptionFlow, googleSheetFlow } from './google-sheet.flow';

export const adapterFlow = createFlow([
  flowWelcome,
  flowInfo,
  flowWorks,
  flowServices,
  flowArrangeMeeting,
  flowHumanNewChat,
  flowDefault,
  googleSheetFlow,
  chooseOptionFlow,
]);