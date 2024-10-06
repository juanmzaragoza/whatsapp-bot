import { addKeyword, EVENTS } from '@builderbot/bot';
import { SelectedProvider } from '~/provider';
import { flowWelcome } from '../flowWelcome';

export const getFlowWithoutSubFlow = ({ messages = [ ] }) => {
  return addKeyword<typeof SelectedProvider>(EVENTS.ACTION)
  .addAnswer([...messages, "Si querés *regresar*, solo decimelo 🔙"],
    { capture: true },
    async (ctx, { gotoFlow, fallBack })=> {
      const userAnswer = ctx.body;
      console.log(userAnswer)
      if (userAnswer.toLowerCase().includes('regresar')) {
        return gotoFlow(flowWelcome);
      } else{
        return fallBack('Upa! Pasó algo!\nSi querés *regresar*, solo tenés que escribirlo');
      }
    }
  )
}