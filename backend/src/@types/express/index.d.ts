import 'express';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        document: string;
        type: 'user' | 'admin';
      };
    }
  }
}
