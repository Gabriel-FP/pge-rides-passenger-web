import { FormControl } from '@angular/forms';
import { brPhoneValidator } from './br-phone.validator';

describe('brPhoneValidator', () => {
  const validator = brPhoneValidator();

  it('should accept a valid BR mobile number', () => {
    expect(validator(new FormControl('85991234567'))).toBeNull();
  });

  it('should reject a number without the mobile 9 digit', () => {
    expect(validator(new FormControl('8533334444'))).toEqual({ brPhone: true });
  });

  it('should leave empty values to the required validator', () => {
    expect(validator(new FormControl(''))).toBeNull();
  });
});
