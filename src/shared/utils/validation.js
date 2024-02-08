class Validation {
  validEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (this.notEmpty(email)) {
      if (emailRegex.test(email)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  onlyEnglishCharacter = (string) => {
    const regex = /^[A-Za-z0-9]*$/;
    if (this.notEmpty(string)) {
      if (regex.test(string)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  validPassword = (password) => {
    if (this.notEmpty(password)) {
      if (password.length >= 6) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  passwordMatch = (password, confirmPassword) => {
    if (
      this.notEmpty(password) &&
      this.notEmpty(confirmPassword) &&
      password === confirmPassword
    ) {
      return true;
    } else {
      return false;
    }
  };
  isNull = (field) => {
    if (field === null) {
      return true;
    } else {
      return false;
    }
  };
  isEmpty = (field) => {
    if (
      field === null ||
      field === "null" ||
      field === undefined ||
      field === "undefined" ||
      field === ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  notEmpty = (field) => {
    if (
      field !== null &&
      field !== "null" &&
      field !== undefined &&
      field !== "undefined" &&
      field !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  isBoolean = (field) => {
    if (this.notEmpty(field)) {
      if (typeof field === "boolean") {
        return true;
      } else {
        return false;
      }
    }
  };
  isNumber = (field) => {
    if (this.notEmpty(field)) {
      if (typeof field === "number" && !isNaN(field)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  isArrayEmpty = (field) => {
    if (Array.isArray(field)) {
      if (field.length === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  isObjectEmpty = (field) => {
    if (typeof field === "object") {
      let hasEmptyValue = false;
      for (const key in field) {
        if (field.hasOwnProperty(key)) {
          if (this.isEmpty(field[key])) {
            hasEmptyValue = true;
          }
        }
      }
      if (hasEmptyValue) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  isStringIsWhiteSpace = (field) => {
    if (/^\s*$/.test(field)) {
      return true;
    } else {
      return false;
    }
  };

  englishCharacter = (field) => {
    if (/^[a-zA-Z0-9-_]+$/.test(field)) {
      return field;
    }
  };

  listHasEmptyValues = (fields) => {
    let hasEmpty = false;

    if (Array.isArray(fields)) {
      fields.forEach((field) => (this.isEmpty(field) ? (hasEmpty = true) : ""));
    }
    return hasEmpty;
  };

  validateValue = (value, type) => {
    if (validation.notEmpty(value)) {
      switch (type) {
        case "string":
          value = String(value);
          if (validation.notEmpty(value)) {
            return value;
          } else {
            return null;
          }
        case "number":
          value = parseFloat(value);
          if (validation.notEmpty(value) && validation.isNumber(value)) {
            return value;
          } else {
            return null;
          }
        case "integer":
          value = parseInt(value);
          if (validation.notEmpty(value) && validation.isNumber(value)) {
            return value;
          } else {
            return null;
          }
        case "boolean":
          value = Boolean(value);
          if (validation.notEmpty(value) && validation.isBoolean(value)) {
            return value;
          } else {
            return null;
          }
        default:
          return null;
      }
    } else {
      return null;
    }
  };
}
const validation = new Validation();
export default validation;
