export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}
