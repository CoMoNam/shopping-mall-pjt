export interface JoinRequestDto {
  email: string;
  username: string;
  nickname: string;
  password: string;
  address: string;
  addressDetail: string;
  addressMore: string;
  overAge: boolean;
  termsOfService: boolean;
  privacyPolicy: boolean;
  marketingConsent: boolean;
  notifications: boolean;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}
