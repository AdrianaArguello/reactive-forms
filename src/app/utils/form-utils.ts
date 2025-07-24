import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';
export class FormUtils {
  static getTextError(errors: ValidationErrors): string | null {
  for( const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `Minimo ${errors['min'].min} caracteres`;
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

}
