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
import { i18n, __ } from '~/config/i18n.config';

export const welcomeFlow = addKeyword<typeof SelectedProvider>(EVENTS.WELCOME)
  .addAction( async (ctx, { state, gotoFlow, flowDynamic })=> {
    const lang = state.get('language');
    console.log("[DEBUG] welcomeFlow.ts ~ state.get('language') -> ", lang);
    if(!lang) {
      return gotoFlow(selectLangFlow);
    }
    i18n.setLocale(lang);

    const message = [
      __("👋 *Hola! Soy Sebas, de The Host.*"),
      "",
      __("Te voy a ayudar a agilizar y evacuar todas las dudas que tengas sobre Puerto Iguazú 🤗"),
      "",
      __("*[1]* ☝🏻 ¿Qué atracciones principales puedo visitar si me quedo 1 día?"),
      __("*[2]* ✌🏻 ¿Qué atracciones principales puedo visitar si me quedo 2 días?"),
      __("*[3]* ⏳ ¿Qué otras cosas puedo hacer si tengo más tiempo/al regresar del Parque?"),
      __("*[4]* 📅 ¿Qué hacer si tengo más días?"),
      __("*[5]* ✈️ Excursiones"),
      __("*[6]* 🇦🇷 Select language"),
      __("*[7]* 📱 Hablá directamente conmigo"),
      "",
      __("*¿En qué tema te gustaría que te ayude hoy?*"),
      __("Podés preguntarme por detalles, precios, tiempos, o lo que necesites saber")
    ]. join("\n");
    
    return await flowDynamic(message);
  })
  .addAction({ capture: true }, async (ctx, { gotoFlow })=> {

    const flowConfigurations = {
      '1': oneDayFlow,
      '2': twoDaysFlow,
      '3': moreTimeFlow,
      '4': moreDaysFlow,
      '5': googleSheetFlow,
      '6': selectLangFlow,
      '7': flowHumanNewChat,
      '_default': defaultFlow
    };
    
    const userAnswer = ctx.body;
    const keys = Object.keys(flowConfigurations).filter((key) => userAnswer.includes(key));
    const flow = keys.length ? flowConfigurations[keys[0]] : flowConfigurations['_default'];
    return gotoFlow(flow);
  })