import { parse, format, parseISO } from "date-fns";
import es from 'date-fns/locale/es'

export const convertToISO = (formDate) => {
  const parsedDate = parse(formDate, 'dd/MM/yyyy', new Date());
  const newDate = new Date(Date.UTC(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate()));
  return newDate.toISOString();
};

export function displayDate(date) {
  const newDate = parseISO(date)
  const formatDate = format(newDate,'PPPP', {locale:es})
  return formatDate
}

export function convertDate(isDate) {
  const newDate = parseISO(isDate)
  const formatDate = format(newDate,'dd/MM/yyyy')
  return formatDate
}
