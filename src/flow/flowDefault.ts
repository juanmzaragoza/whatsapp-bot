import { addKeyword, EVENTS } from '@builderbot/bot';
import { SelectedProvider } from '~/provider';
import { flowWelcome } from './flowWelcome';

export const flowDefault = addKeyword<typeof SelectedProvider>(EVENTS.WELCOME)
  .addAnswer(
    [
      "No entendi lo que me quisite decir 🫤",
      "¿Podrías intenerlo de nuevo con las opciones disponibles?"
    ],
  )
  .addAction(async (ctx, { gotoFlow })=> {
    return gotoFlow(flowWelcome);
  })