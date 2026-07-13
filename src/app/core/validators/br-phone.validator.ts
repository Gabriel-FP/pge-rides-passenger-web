import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const BR_MOBILE_PATTERN = /^[1-9][0-9]9[0-9]{8}$/;

export function brPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value ?? '';
    if (!value) {
      return null;
    }
    return BR_MOBILE_PATTERN.test(value) ? null : { brPhone: true };
  };
}
