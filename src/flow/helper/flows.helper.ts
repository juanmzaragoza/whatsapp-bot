import { addKeyword, EVENTS } from '@builderbot/bot';
import { SelectedProvider } from '~/provider';
import { welcomeFlow } from '../welcome.flow';
import { BACK_WORD, BACK_ANSWER } from '../config';
import { __, i18n } from '~/config/i18n.config';

export const getFlowWithoutSubFlow = ({ messages = [ ] }) => {
  return addKeyword<typeof SelectedProvider>(EVENTS.ACTION)
  .addAction(async (ctx, { flowDynamic })=> {
    console.log("[DEBUG] flows.helper.ts ~ i18n.getLocale() -> ", i18n.getLocale());
    return await flowDynamic([
      ...messages.map(message => message != "" ? __(message) : message), 
      __(BACK_ANSWER)
    ].join("\n"));
  })
  .addAction({ capture: true }, async (ctx, { gotoFlow, fallBack })=> {
    const userAnswer = ctx.body;
    console.log(userAnswer)
    if (userAnswer.toLowerCase().includes(__(BACK_WORD))) {
      return gotoFlow(welcomeFlow);
    } else{
      return fallBack(`${__("Upa! Pasó algo!")}\n${__(BACK_ANSWER)}`);
    }
  })
}