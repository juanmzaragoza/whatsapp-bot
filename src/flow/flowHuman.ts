import { addKeyword } from '@builderbot/bot';
import { SelectedProvider } from '~/provider';
import { changeBotStatusForThisUser, changeBotStatusGlobally, isBotEnabledForThisUser, isBotEnabledGlobally } from './helper/status-bot.helper';
import { numberClean } from './helper/utils.heper';
import { ADMIN_NUMBER } from './config';
import { SelectedDatabase } from '~/database';

/**
 * Esto abre un nuevo chat cuando se escribe "AGENTE"
 */
export const flowHumanNewChat = addKeyword<typeof SelectedProvider>("5")
  .addAnswer(
   "Estoy creando un grupo para que charles directamente con Juanma 🙂"
  )
  .addAction(async (ctx, { provider }) => {
    const ID_GROUP = ctx.name;
    const refProvider = await provider.getInstance();
    await refProvider.groupCreate(`[CALCIO] Consulta personalizada con ${ID_GROUP}`,[
      `${ctx.from}@s.whatsapp.net`
    ]);
  })
  .addAnswer('Te agregué a un grupo con Juanma! Gracias');

export const flowHumanThisChat = addKeyword<typeof SelectedProvider>('humano2')
  .addAction(async (_, { state, endFlow }) => {
    const botOffForThisUser = isBotEnabledForThisUser(state);
    console.debug("[DEBUG] humano -> ", botOffForThisUser);
    await changeBotStatusForThisUser(state, !botOffForThisUser);
    //await state.update({botOffForThisUser: !botOffForThisUser});
    if(!botOffForThisUser) return endFlow();
  })
  .addAnswer('En unos instantes un representante se pondrá en contacto contigo! Gracias');

export const flowHumanAllChats = addKeyword<typeof SelectedProvider>('botoff')
  .addAction(async (_, { globalState, endFlow }) => {
    const botOffForEveryOne = isBotEnabledGlobally(globalState);
    console.debug("[DEBUG] representante -> ", botOffForEveryOne);
    await changeBotStatusGlobally(globalState, !botOffForEveryOne);
    //await globalState.update({ botOffForEveryOne: !botOffForEveryOne});
    if(!botOffForEveryOne) return endFlow();
  })
  .addAnswer('Bot apagado hasta nuevo aviso!');

export const blackListFlow = addKeyword<typeof SelectedProvider, typeof SelectedDatabase>('mute')
  .addAction(async (ctx, { blacklist, flowDynamic }) => {
    console.log('[DEBUG] ctx.from=',ctx.from,", ADMIN_NUMBER=",ADMIN_NUMBER,", ctx=",ctx);
    if (ctx.from === ADMIN_NUMBER) {
      const toMute = numberClean(ctx.body); //Mute +34000000 message incoming
      const check = blacklist.checkIf(toMute);
      if (!check) {
        blacklist.add(toMute)
        await flowDynamic(`❌ ${toMute} muted`)
        return;
      }
      blacklist.remove(toMute);
      await flowDynamic(`🆗 ${toMute} unmuted`);
      return;
    }
  })
  .addAnswer('En unos instantes yo te hablo! Gracias por tu pacienca');

export const flowHumanBlacklist = addKeyword<typeof SelectedProvider>('humano')
  .addAnswer('En unos instantes yo te hablo! Gracias por tu pacienca')
  .addAction(async (ctx, { blacklist, endFlow }) => {
    const toMute = numberClean(ctx.from);
    const isInTheBlacklist = blacklist.checkIf(toMute);
    console.log('[DEBUG] ctx.from=',ctx.from,", toMute=",toMute,", isInTheBlacklist=",isInTheBlacklist);
    if (!isInTheBlacklist) {
      blacklist.add(toMute);
      return endFlow();
    }
  });