import { createFlow } from '@builderbot/bot';
import { chooseOptionFlow, googleSheetFlow } from './google-sheet.flow';
import { flowHumanNewChat } from './human.flow';
import { welcomeFlow } from './welcome.flow';
import { oneDayFlow } from './one-day.flow';
import { twoDaysFlow } from './two-days.flow';
import { moreTimeFlow } from './more-time.flow';
import { moreDaysFlow } from './more-days.flow';
import { defaultFlow } from './default.flow';
import { selectLangFlow } from './select-lang.flow';

export const adapterFlow = createFlow([
  welcomeFlow,
  oneDayFlow,
  twoDaysFlow,
  moreTimeFlow,
  moreDaysFlow,
  flowHumanNewChat,
  googleSheetFlow,
  chooseOptionFlow,
  defaultFlow,
  selectLangFlow
]);