import { createFlow } from '@builderbot/bot';
import { goBackOptionFlow, googleSheetPricesFlow } from './google-sheet-prices.flow';
import { flowHumanNewChat } from './human.flow';
import { welcomeFlow } from './welcome.flow';
import { googleSheetPlaceOrderFlow, placeProductFlow, registerClientFlow, saveProductFlow } from './google-sheet-place-order.flow';
import { defaultFlow } from './default.flow';
import { googleSheetStatusOrderFlow } from './google-sheet-status-order.flow';

export const adapterFlow = createFlow([
  welcomeFlow,
  googleSheetPricesFlow,
  googleSheetPlaceOrderFlow,
  flowHumanNewChat,
  defaultFlow,
  registerClientFlow,
  placeProductFlow,
  goBackOptionFlow,
  saveProductFlow,
  googleSheetStatusOrderFlow
]);