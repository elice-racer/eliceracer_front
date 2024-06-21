export const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
export const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

export function validatePassword(password: string) {
  const passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,20}$/;
  return passwordPattern.test(password);
}

export function vaildateEmailRegEx(eamil: string) {
  const emailPattern = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  return emailPattern.test(eamil);
}

export function vaildatePhoneNumber(phoneNumber: string) {
  const phoneNumberPattern = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;
  return phoneNumberPattern.test(phoneNumber);
}
