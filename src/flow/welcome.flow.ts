import { addKeyword, EVENTS } from '@builderbot/bot';
import { SelectedProvider } from '~/provider';
import { defaultFlow } from './default.flow';
import { twoDaysFlow } from './two-days.flow';
import { moreTimeFlow } from './more-time.flow';
import { moreDaysFlow } from './more-days.flow';
import { flowHumanNewChat } from './human.flow';
import { googleSheetFlow } from './google-sheet.flow';
import { oneDayFlow } from './one-day.flow';
import { selectLangFlow } from './select-lang.flow';

export const welcomeFlow = addKeyword<typeof SelectedProvider>(EVENTS.WELCOME)
  .addAction(async (ctx, { state, gotoFlow })=> {
    const lang = state.get('language');
    console.log("[DEBUG] welcomeFlow.ts ~ state.get('language') -> ", lang);
    if(!lang) {
      return gotoFlow(selectLangFlow);
    }
  })
  .addAnswer(
      [
      "👋 *Hola! Soy Sebas, de The Host.*",
      "",
      "Te voy a ayudar a agilizar y evacuar todas las dudas que tengas sobre Puerto Iguazú 🤗",
      "",
      "*[1]* ☝🏻 ¿Qué atracciones principales puedo visitar si me quedo 1 día?",
      "*[2]* ✌🏻 ¿Qué atracciones principales puedo visitar si me quedo 2 días?",
      "*[3]* ⏳ ¿Qué otras cosas puedo hacer si tengo más tiempo/al regresar del Parque?",
      "*[4]* 📅 ¿Qué hacer si tengo más días?",
      "*[5]* ✈️ Excursiones",
      "*[6]* 📱 Hablá directamente conmigo",
      "",
      "*¿En qué tema te gustaría que te ayude hoy?*",
      "Podés preguntarme por detalles, precios, tiempos, o lo que necesites saber"
    ],
    { capture: true }
  )
  .addAction(async (ctx, { gotoFlow })=> {

    const flowConfigurations = {
      '1': oneDayFlow,
      '2': twoDaysFlow,
      '3': moreTimeFlow,
      '4': moreDaysFlow,
      '5': googleSheetFlow,
      '6': flowHumanNewChat,
      '_default': defaultFlow
    };
    
    const userAnswer = ctx.body;
    const keys = Object.keys(flowConfigurations).filter((key) => userAnswer.includes(key));
    const flow = keys.length ? flowConfigurations[keys[0]] : flowConfigurations['_default'];
    return gotoFlow(flow);
  })