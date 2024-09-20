import { addKeyword } from '@builderbot/bot';

/**
 * Esto se ejeuta cunado la persona escruibe "AGENTE"
 */
export const flowHuman = addKeyword("AGENTE")
  .addAnswer(
   "Estamos desviando tu conversacion a nuestro agente"
  )
  .addAction(async (ctx, {provider}) => {
    const ID_GROUP = ctx.name;
    const refProvider = await provider.getInstance()
    await refProvider.groupCreate(`Media Tech Support con (${ID_GROUP})`,[
      `${ctx.from}@s.whatsapp.net`
    ])
  })
  .addAnswer('Te hemos agregado a un grupo con un asesor! Gracias');
