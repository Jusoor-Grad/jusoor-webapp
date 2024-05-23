import i18n from "@/i18n";
export const formulateErrorMessage = (errorObject) => {
  // Check if the error object contains the 'errors' field
  if (errorObject && errorObject.data && errorObject.data.errors) {
    const errors = errorObject.data.errors;

    // Initialize an array to store the formatted error messages
    const formattedErrorMessages = [];

    if (Array.isArray(errors?.error)) {
      for (const field in errors) {
        if (errors.hasOwnProperty(field)) {
          const fieldErrors = errors[field];
          if (Array.isArray(fieldErrors)) {
            // If the fieldErrors is an array, join its elements with newlines
            formattedErrorMessages.push(`${field}: ${fieldErrors.join("\n")}`);
          }
        }
      }
    } else {
      for (const field in errors) {
        if (errors.hasOwnProperty(field)) {
          const fieldErrors = errors[field];
          formattedErrorMessages.push(`${field}: ${fieldErrors.join("\n")}`);
        }
      }
    }
    // Join the formatted error messages with newlines
    return formattedErrorMessages.join("\n");
  } else {
    // If the error object doesn't contain the expected structure, return a generic error message
    return i18n.t("errorCodes.general");
  }
};
