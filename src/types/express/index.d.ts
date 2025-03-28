import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string }; // Define the structure of the user object
}
