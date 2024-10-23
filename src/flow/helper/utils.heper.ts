export const numberClean = (raw: string): string => {
  //Mute +3400000 
  const number = raw.toLowerCase().replace('mute', '').replace(/\s/g, '').replace('+', '');
  // 3400000
  return number;
}

export const todaySheetName = () => {
  const date = getDateNow();
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  return `${date.getDay()} de ${months[date.getMonth()]}`;
}

export const getDateNow = () => {
  const ARGENTINA_TIMEZONE = 3;
  const date = new Date();
  date.setTime( date.getTime() - ARGENTINA_TIMEZONE*60*1000 );
  return date;
}