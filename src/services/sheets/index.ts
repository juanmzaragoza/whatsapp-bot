import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

//TODO: move to a configuration service
const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive.file",
];

class GoogleSheetService {
  jwtFromEnv = undefined;
  doc = undefined;

  // google sheet id
  constructor(id = undefined) {
    if (!id) {
      throw new Error("ID_UNDEFINED");
    }

    this.jwtFromEnv = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: SCOPES,
    });
    this.doc = new GoogleSpreadsheet(id, this.jwtFromEnv);
  }

  /**
   * get all rows from google sheet file
   * @param {*} sheetNumber
   * @param {*} range
   * @returns
   */
  retrieveData = async ({ sheetNumber = 0, range = 'A:D' }) => {
    try {
      const list = [];
      await this.doc.loadInfo();
      const sheet = this.doc.sheetsByIndex[sheetNumber]; // the first sheet
      console.log("[DEBUG] sheet.rowCount: ", sheet.rowCount);
      await sheet.loadCells(range);
      console.log("[DEBUG] sheet.cellStats: ",sheet.cellStats);
      const rows = await sheet.getRows();
      for (const row of rows) {
        //const cellA1 = sheet.getCell(a + 1, colNumber - 1);
        list.push(row._rawData);
      }

      return list;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  /**
   * Guardar pedido
   * @param {*} data
   */
  /*saveOrder = async (data = {}) => {
    await this.doc.loadInfo();
    const sheet = this.doc.sheetsByIndex[1]; // the first sheet

    const order = await sheet.addRow({
      fecha: data.fecha,
      telefono: data.telefono,
      nombre: data.nombre,
      pedido: data.pedido,
      observaciones: data.observaciones,
    });

    return order
  };*/
}

export default GoogleSheetService;