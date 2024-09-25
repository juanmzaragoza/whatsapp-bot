import { addKeyword, EVENTS } from '@builderbot/bot';
import { SelectedProvider } from '~/provider';

export const flowWelcome = addKeyword<typeof SelectedProvider>(EVENTS.WELCOME)
  .addAnswer([
    "👋 *Hola! Soy Juanma, de Calcio.*",
    "",
    "Te voy a ayudar a agilizar lo que necesites en temas de tecnología y desarrollo. En Calcio nos especializamos en ofrecer soluciones rápidas y personalizadas para emprendedores y empresas que buscan mejorar su presencia digital.",
    "",
    "*[1]* 🏢 Información sobre Calcio",
    "*[2]* 🔨 Trabajos realizados",
    "*[3]* 💼 Servicios",
    "*[4]* 📅 Agendar una reunión",
    "*[5]* 📱 Hablá directamente conmigo",
    "",
    "*¿En qué tema te gustaría que te ayude hoy?*",
    "Podés preguntarme por detalles, precios, tiempos, o lo que necesites saber"
  ])
  .addAction(async (ctx, { provider }) => {
    const selectedOption = ctx.body;
    console.log(`${ctx.from} selectedOption=`, selectedOption);
  });