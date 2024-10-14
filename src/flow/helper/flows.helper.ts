import { addKeyword, EVENTS } from '@builderbot/bot';
import { SelectedProvider } from '~/provider';
import { welcomeFlow } from '../welcome.flow';
import { BACK_WORD, BACK_ANSWER } from '../config';

export const getFlowWithoutSubFlow = ({ messages = [ ] }) => {
  return addKeyword<typeof SelectedProvider>(EVENTS.ACTION)
  .addAnswer([...messages, BACK_ANSWER],
    { capture: true },
    async (ctx, { gotoFlow, fallBack })=> {
      const userAnswer = ctx.body;
      console.log(userAnswer)
      if (userAnswer.toLowerCase().includes(BACK_WORD)) {
        return gotoFlow(welcomeFlow);
      } else{
        return fallBack(`Upa! Pasó algo!\n${BACK_ANSWER}`);
      }
    }
  )
}