export default function parseDate(date) {
  let parsed =
    date.getMonth() + "-" + date.getDate() + "-" + date.getFullYear();
  return parsed;
}
