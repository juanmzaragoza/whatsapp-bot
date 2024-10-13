import { addKeyword, EVENTS } from '@builderbot/bot';
import { SelectedProvider } from '~/provider';
import { infoFlow } from './info.flow';
import { defaultFlow } from './default.flow';
import { worksFlow } from './works.flow';
import { servicesFlow } from './services.flow';
import { arrangeMeetingFlow } from './arrange-meeting.flow';
import { flowHumanNewChat } from './human.flow';
import { googleSheetFlow } from './google-sheet.flow';

const flowConfigurations = {
  '1': infoFlow,
  '2': worksFlow,
  '3': servicesFlow,
  '4': arrangeMeetingFlow,
  '5': flowHumanNewChat,
  '6': googleSheetFlow,
  '_default': defaultFlow
};

export const welcomeFlow = addKeyword<typeof SelectedProvider>(EVENTS.WELCOME)
  .addAnswer(
      [
      "👋 *Hola! Soy Juanma, de Calcio.*",
      "",
      "Te voy a ayudar a agilizar lo que necesites en temas de tecnología y desarrollo. En Calcio nos especializamos en ofrecer soluciones rápidas y personalizadas para emprendedores y empresas que buscan mejorar su presencia digital.",
      "",
      "*[1]* 🏢 Información sobre Calcio",
      "*[2]* 🔨 Trabajos realizados",
      "*[3]* 💼 Servicios",
      "*[4]* 📅 Agendar una reunión",
      "*[5]* 📱 Hablá directamente conmigo",
      "*[6]* ✈️ Excursiones",
      "",
      "*¿En qué tema te gustaría que te ayude hoy?*",
      "Podés preguntarme por detalles, precios, tiempos, o lo que necesites saber"
    ],
    { capture: true }
  )
  .addAction(async (ctx, { gotoFlow })=> {
    const userAnswer = ctx.body;
    const keys = Object.keys(flowConfigurations).filter((key) => userAnswer.includes(key));
    const flow = keys.length ? flowConfigurations[keys[0]] : flowConfigurations['_default'];
    return gotoFlow(flow);
  })