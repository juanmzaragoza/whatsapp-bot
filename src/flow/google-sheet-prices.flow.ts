import { addKeyword, EVENTS } from "@builderbot/bot";
import { SelectedProvider } from "~/provider";
import GoogleSheetService from "~/services/sheets";
import { BACK_ANSWER, BACK_WORD } from "./config";
import { welcomeFlow } from "./welcome.flow";

//TODO: move this line to a configuration service
const googleSheetService = new GoogleSheetService(process.env.GOOGLE_SHEET_ID);
let GLOBAL_STATE = [];

export const googleSheetPricesFlow = addKeyword<typeof SelectedProvider>(EVENTS.ACTION)
  .addAnswer(
   "🕑 Estoy consultando nuestro listado para el día de hoy..."
  )
  .addAction(async (ctx, { flowDynamic, endFlow, gotoFlow }) => {
    
    const products = await googleSheetService.retrieveData({});
    if(products) {
      const response = ["Estos son los productos disponibles en el día de la fecha: \n"];
      GLOBAL_STATE = [];
      for (const product of products) {
        if(product[0]) {
          GLOBAL_STATE.push(product);
          response.push(`🥖 *${product[0]}*: ${product[2]? product[2] : "-"}${product[1] ? `\n${product[1]}\n` : "\n"}${product[3] ? `Obs: ${product[3]}\n` : ""}`);
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