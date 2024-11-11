import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  validadeAllFormFields(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const controls = formGroup.get(field);

      if(controls instanceof UntypedFormControl){
        controls.markAsTouched({onlySelf: true})
      }else  if (controls instanceof UntypedFormGroup || controls instanceof UntypedFormArray){
        controls.markAsTouched({onlySelf: true})
        this.validadeAllFormFields(controls);
      }
    });
  }

  errorMessage(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(fieldName) as UntypedFormControl

    return this.errorMessageFormField(field)
  }

  errorMessageFormField(field: UntypedFormControl) {


    if (field?.hasError('required')) {
      return 'Precisa colocar algum valor';
    }
    if (field?.hasError('minlength')) {
      const requiredLength: number = field.errors
        ? field.errors['minlength']['requiredLength']
        : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres`;
    }
    if (field?.hasError('maxlength')) {
      const requiredLength: number = field.errors
        ? field.errors['maxlength']['requiredLength']
        : 100;
      return `Tamanho máximo precisa ser de ${requiredLength} caracteres`;
    }
    return 'Erro';
  }


  getFormArrayFieldErrorMsg(formGroup: UntypedFormGroup, formArrayName: string, fieldName: string, index: number){
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field =  formArray.controls[index].get(fieldName) as UntypedFormControl;
    return this.errorMessageFormField(field)
    }

    isFormArrayRequeired(formGroup: UntypedFormGroup, formArrayName: string){
      const formArray = formGroup.get(formArrayName) as UntypedFormArray;
      return !formArray.valid && formArray.hasError('required') && formArray.touched;
    }


}
