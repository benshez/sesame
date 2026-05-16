export interface ITenant {
  TenantId: string;
  coreConfig?: {
    "email_verification_token_lifetime": number,
    "password_reset_token_lifetime": number,
    "postgresql_connection_uri": string,
  }

  FirstFactors?: Array<string>;
}