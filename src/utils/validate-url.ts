export const validateUrl = (url: string) => {
  const urlRegex =
    /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

  if (!urlRegex.test(url)) return "Field must be a valid URL";

  return true;
};
