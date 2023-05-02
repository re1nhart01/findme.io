export type RegisterResponse = boolean;

export interface RegisterRequest {
  email: string;
  password: string;
  phone: string;
  firstName: string;
  lastName: string;
  birthday: number;
  details?: string;
  city: string;
  country: string;
}

export interface HasPhoneOrEmailResponse<T extends object> {
  isEmailExists?: T extends { email: string } ? boolean : void;
  isPhoneExists?: T extends { phone: string } ? boolean : void;
}

export type HasPhoneOrEmailRequest = { phone: string; } | { email: string; } | { phone?: string; email?: string; }

const a: HasPhoneOrEmailRequest = {

};
