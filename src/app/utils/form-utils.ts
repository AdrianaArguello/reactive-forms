import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';
export class FormUtils {
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getTextError(errors: ValidationErrors): string | null {
  for( const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Minimo ${errors['min'].min} caracteres`;
        case 'email':
          return `El valor ingresado no tiene formato de correo`;
        case 'pattern':
          if(errors['pattern'].requiredPattern === FormUtils.emailPattern){
            return `El valor ingresado no tiene formato de correo`;
          }
          return 'El valor ingresado no es valido';
        default:
          return `Error de validacion no controlado: ${key}`;
      }
    }
    return null;
  }

  static isValidField(myForm: FormGroup, fieldName: string): boolean | null {
    return (!!myForm.controls[fieldName].errors && !!myForm.controls[fieldName].touched);
  }

  static getFieldError(myForm: FormGroup, fieldName: string): string | null {
    if(!myForm.controls[fieldName]) return null;

    const errors = myForm.controls[fieldName].errors || {};

    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      !!formArray.controls[index]?.errors &&
      !!formArray.controls[index]?.touched
    )
  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if(!formArray.controls[index]) return null;

    const errors = formArray.controls[index].errors || {};

    return FormUtils.getTextError(errors);
  }

  static isFieldOneEqualsFieldTwo(field1: string, field2: string){
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { notEquals: true };
    }
  }

}
