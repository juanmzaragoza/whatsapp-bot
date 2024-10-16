import { addKeyword, EVENTS } from "@builderbot/bot";
import { SelectedProvider } from "~/provider";
import GoogleSheetService from "~/services/sheets";
import { BACK_WORD } from "./config";

//TODO: move this line to a configuration service
const googleSheetService = new GoogleSheetService("1Cd6jeYk3hgq7XPmxRG0L3RV0P5fBztKBQa1rUvqCsgc");
const GLOBAL_STATE = [];
const numberPattern = /\d+/g;

export const googleSheetFlow = addKeyword<typeof SelectedProvider>("sheet")
  .addAnswer(
   "Estoy consultando los datos de tu archivo..."
  )
  .addAction(async (ctx, { flowDynamic, endFlow, gotoFlow }) => {
    
    const menus = await googleSheetService.retrieveData({ sheetNumber: 1 });
    if(menus) {
      let response = "Estos son las excursos disponibles en el día de la fecha: \n";
      for (const menu of menus) {
        GLOBAL_STATE.push(menu);
        response = `${response}*[${menus.indexOf(menu)}]* ${menu[0]}\n`;
      }
      await flowDynamic(response);
      return gotoFlow(chooseOptionFlow);
    } else {
      return endFlow("No hay resultados para tu busqueda");
    }
  })


export const chooseOptionFlow = addKeyword<typeof SelectedProvider>(EVENTS.ACTION)
  .addAnswer(
    [
      "¿Sobre cuál te interesaría saber más?", 
      `Si querés *${BACK_WORD}*, solo decimelo 🔙"`
    ],
    { capture: true },
    async (ctx, { fallBack, flowDynamic, gotoFlow }) => {
      const txt = ctx.body;
      // back the main menu
      if(txt.trim().toLowerCase().includes(BACK_WORD)) {
        return gotoFlow(googleSheetFlow);
      } else{
        return await chooseTour({ txt, flowDynamic, fallBack, gotoFlow });
      }
    }
  );


const chooseTour = async ({ txt, flowDynamic, fallBack, gotoFlow }) => {
  const match = txt.match( numberPattern );
  if(match) {
    const choice = match[0];
    if(GLOBAL_STATE[choice]) {
      let response = `*${GLOBAL_STATE[choice][0]}* \n\n`;
      response = response + `${GLOBAL_STATE[choice][1]} \n\n`;
      if (GLOBAL_STATE[choice][2]) {
        response = response + `*PRECIOS*\n\n${GLOBAL_STATE[choice][2]} \n\n`;
      }
      if (GLOBAL_STATE[choice][3]) {
        response = response + `*OBSERVACIONES*\n\n${GLOBAL_STATE[choice][3]} \n\n`;
      }
      await flowDynamic(response);
      return gotoFlow(chooseOptionFlow);
    }
  }
  return fallBack('Ups! Pasó algo!\nIntentalo de nuevo');
}