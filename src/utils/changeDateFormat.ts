export const changeDateFormat = (inputDateString: string) => {
  const dateObject = new Date(inputDateString);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so add 1
  const day = String(dateObject.getDate()).padStart(2, "0");

  const formattedDateString = `${year}/${month}/${day}`;

  return formattedDateString;
};
