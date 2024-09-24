import { addKeyword } from '@builderbot/bot';
import { JsonFileDB as Database } from '@builderbot/database-json';
import { BaileysProvider as Provider } from '@builderbot/provider-baileys';
import { isBotEnabledForThisUser, isBotEnabledGlobally } from './statusBot';

// Función para generar flujos con múltiples respuestas
export const createNestedFlows = (flowData) => {
  const flows = {};

  flowData.flows.forEach((flow) => {
    const { name, question, responses } = flow;

    // Crear flujo principal
    flows[name] = addKeyword<Provider, Database>(name)
      .addAction(async (_, { state, globalState, endFlow }) => {
        const botEnabledForThisUser = isBotEnabledForThisUser(state);
        const botEnabledGlobally = isBotEnabledGlobally(globalState);
        console.debug('[DEBUG] botEnabledForThisUser, botEnabledGlobally: ',botEnabledForThisUser, botEnabledGlobally)
        //if(!botEnabledForThisUser || !botEnabledGlobally) return endFlow();
      })
      .addAnswer(question, { capture: true }, async (ctx, { flowDynamic, fallBack, gotoFlow }) => {
        try {
          const response = responses.find(r => ctx.body.toLowerCase().includes(r.keyword));
          if (response) {
            if (response.answers) {
              // Enviar respuestas múltiples
              for (const answer of response.answers) {
                if (typeof answer === 'string') {
                  await flowDynamic(answer);
                } else if (typeof answer === 'object' && answer.text) {
                  if (answer.image) {
                    await flowDynamic(answer.text, { media: answer.image });
                  } else{
                    await flowDynamic(answer.text);
                  }
                }
              }
            } else if (response.nextFlow) {
              // Navegar a un siguiente flujo
              return gotoFlow(flows[response.nextFlow]);
            } else{
              return fallBack('No entendí tu pregunta. Por favor, elige una opción válida.');
            }
          } else{
            return fallBack('No entendí tu pregunta. Por favor, elige una opción válida.');
          }
        } catch(e) {
          return fallBack('Ups! Pasó algo!\n En un rato te contesto personalmente');
        }

      });
  });

  return flows;
};