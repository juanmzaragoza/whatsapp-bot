import { addKeyword, EVENTS } from '@builderbot/bot';
import { SelectedProvider } from '~/provider';
import { flowInfo } from './flowInfo';
import { flowDefault } from './flowDefault';
import { flowWorks } from './flowWorks';
import { flowServices } from './flowServices';
import { flowArrangeMeeting } from './flowArrangeMeeting';
import { flowHumanNewChat } from './flowHuman';
import { googleSheetFlow } from './google-sheet.flow';

const flowConfigurations = {
  '1': flowInfo,
  '2': flowWorks,
  '3': flowServices,
  '4': flowArrangeMeeting,
  '5': flowHumanNewChat,
  '6': googleSheetFlow,
  '_default': flowDefault
};

export const flowWelcome = addKeyword<typeof SelectedProvider>(EVENTS.WELCOME)
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