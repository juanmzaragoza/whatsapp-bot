import { addKeyword, EVENTS } from '@builderbot/bot';
import { SelectedProvider } from '~/provider';
import { defaultFlow } from './default.flow';
import { placeOrderFlow } from './place-order.flow';
import { moreTimeFlow } from './more-time.flow';
import { flowHumanNewChat } from './human.flow';
import { googleSheetPricesFlow } from './google-sheet-prices.flow';

export const welcomeFlow = addKeyword<typeof SelectedProvider>(EVENTS.WELCOME)
  .addAnswer(
      [
      "👋 *Hola! Soy Leo, el panadero de tu vida 🍞.*",
      "",
      "Te voy a ayudar a agilizar y evacuar todas las dudas que tengas sobre nuestros productos 🤗",
      "",
      "*[1]* ☝🏻 Listado de precios del día de hoy",
      "*[2]* 📋 Hacer tu pedido",
      "*[3]* ⏳ Estado de mi pedido",
      "*[4]* 📱 Hablá directamente conmigo",
      "",
      "*¿En qué tema te gustaría que te ayude hoy?*",
      "Podés preguntarme por detalles, precios, tiempos, o lo que necesites saber"
    ],
    { capture: true }
  )
  .addAction(async (ctx, { gotoFlow })=> {

    const flowConfigurations = {
      '1': googleSheetPricesFlow,
      '2': placeOrderFlow,
      '3': moreTimeFlow,
      '4': flowHumanNewChat,
      '_default': defaultFlow
    };
    
    const userAnswer = ctx.body;
    const keys = Object.keys(flowConfigurations).filter((key) => userAnswer.includes(key));
    const flow = keys.length ? flowConfigurations[keys[0]] : flowConfigurations['_default'];
    return gotoFlow(flow);
  })