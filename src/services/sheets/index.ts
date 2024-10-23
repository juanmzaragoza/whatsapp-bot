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
  retrieveData = async ({ sheetTitle = undefined, sheetNumber = 0, range = 'A:D' }) => {
    try {
      const list = [];
      await this.doc.loadInfo();
      const sheet = sheetTitle? this.doc.sheetsByTitle[sheetTitle] : this.doc.sheetsByIndex[sheetNumber]; // the first sheet
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
   * save data on file
   * @param {*} data
   */
  saveData = async ({ sheetTitle = undefined, sheetNumber = 0, data = {}, createSheetByName = false }) => {
    await this.doc.loadInfo();
    let sheet;
    if(createSheetByName && sheetTitle) {
      sheet = this.doc.sheetsByTitle[sheetTitle] ??
        await this.doc.addSheet({ title: sheetTitle, headerValues: Object.keys(data) });
    } else{
      sheet = sheetTitle? this.doc.sheetsByTitle[sheetTitle] : this.doc.sheetsByIndex[sheetNumber];
    }
    const row = await sheet.addRow({...data});
    return row;
  };
}

export default GoogleSheetService;