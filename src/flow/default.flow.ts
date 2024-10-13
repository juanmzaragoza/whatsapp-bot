import { addKeyword, EVENTS } from '@builderbot/bot';
import { SelectedProvider } from '~/provider';
import { welcomeFlow } from './welcome.flow';

export const defaultFlow = addKeyword<typeof SelectedProvider>(EVENTS.WELCOME)
  .addAnswer(
    [
      "No entendi lo que me quisite decir 🫤",
      "¿Podrías intenerlo de nuevo con las opciones disponibles?"
    ],
  )
  .addAction(async (ctx, { gotoFlow })=> {
    return gotoFlow(welcomeFlow);
  })