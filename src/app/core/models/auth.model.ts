export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface OtpVerifyResponse {
  tokens: AuthTokens;
  newUser: boolean;
}
