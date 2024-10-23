import { createFlow } from '@builderbot/bot';
import { goBackOptionFlow, googleSheetPricesFlow } from './google-sheet-prices.flow';
import { flowHumanNewChat } from './human.flow';
import { welcomeFlow } from './welcome.flow';
import { placeOrderFlow, placeProductFlow, registerClientFlow, saveProductFlow } from './place-order.flow';
import { moreTimeFlow } from './more-time.flow';
import { defaultFlow } from './default.flow';

export const adapterFlow = createFlow([
  welcomeFlow,
  googleSheetPricesFlow,
  placeOrderFlow,
  moreTimeFlow,
  flowHumanNewChat,
  defaultFlow,
  registerClientFlow,
  placeProductFlow,
  goBackOptionFlow,
  saveProductFlow
]);