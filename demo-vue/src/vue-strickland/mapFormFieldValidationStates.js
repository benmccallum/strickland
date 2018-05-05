import classnames from 'classnames';

export default function mapFormFieldValidationStates (form) {
  var fieldNames = Object.keys(form);
  return fieldNames.reduce((obj, fieldName) => {
    const computedPropName = fieldName + 'State';
    const computedProp = {
      get () {
        return {
          validationClassName: getValidationClassName(this.form, this.validation, fieldName),
          validationMessage: getValidationMessage(this.validation, fieldName)
        };
      },
      set () { }
    };
    obj[computedPropName] = computedProp;
    return obj;
  }, {});
}

function getValidationClassName (form, validation, fieldName) {
  const fieldValidation = validation && validation.form && validation.form.validationResults[fieldName];

  // TODO: Make configurable via plugin
  return classnames({
    'validation-value': !!form[fieldName],
    'validation-valid': fieldValidation && fieldValidation.isValid,
    'validation-async': fieldValidation && fieldValidation.validateAsync,
    'validation-invalid': fieldValidation && !fieldValidation.isValid && !fieldValidation.validateAsync
  });
}

function getValidationMessage (validation, fieldName) {
  const fieldValidation = validation && validation.form && validation.form.validationResults[fieldName];

  if (fieldValidation && (fieldValidation.validateAsync || !fieldValidation.isValid || fieldValidation.showValidMessage)) {
    return fieldValidation.message;
  }
}