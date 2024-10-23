import { addKeyword, EVENTS } from "@builderbot/bot";
import { SelectedProvider } from "~/provider";
import GoogleSheetService from "~/services/sheets";
import { BACK_ANSWER, BACK_WORD } from "./config";
import { welcomeFlow } from "./welcome.flow";
import { todaySheetName } from "./helper/utils.heper";

//TODO: move this line to a configuration service
const googleSheetService = new GoogleSheetService(process.env.GOOGLE_SHEET_ID);

export const googleSheetStatusOrderFlow = addKeyword<typeof SelectedProvider>(EVENTS.ACTION)
  .addAnswer(
   "🕑 Estoy consultando el listado de tus pedidos..."
  )
  .addAction(async (ctx, { flowDynamic, endFlow, gotoFlow }) => {
    const dateToday = todaySheetName();
    const orders = await googleSheetService.retrieveData({ sheetTitle: dateToday });
    if(orders) {
      const response = ["Estos son los pedidos que hiciste en el día de la fecha: \n"];
      for (const [index, order] of orders.entries()) {
        if(order[0]) {
          response.push(`➖➖➖➖➖➖➖➖`);
          response.push(`✅ *Pedido: ${index + 1}* \n${order[3]}\n_Aclaraciones:_ ${order[4]? order[4] : "-"}\n\n➖ ESTADO: *RECIBIDO* 🚀`);
          response.push(`➖➖➖➖➖➖➖➖\n`);
        }
      }
      await flowDynamic(response.join("\n"));
      return gotoFlow(goBackOptionFlow);
    } else {
      return endFlow("No hay resultados para tu busqueda");
    }
  });

export const goBackOptionFlow = addKeyword<typeof SelectedProvider>(EVENTS.ACTION)
  .addAnswer(
    [
      "¿Hay algo más sobre lo que te gustaría saber?", 
      BACK_ANSWER
    ],
    { capture: true },
    async (ctx, { fallBack, gotoFlow }) => {
      const txt = ctx.body;
      // back the main menu
      if(txt.trim().toLowerCase().includes(BACK_WORD)) {
        return gotoFlow(welcomeFlow);
      } else{
        return fallBack('Ups! Pasó algo!\nIntentalo de nuevo');
      }
    }
  );