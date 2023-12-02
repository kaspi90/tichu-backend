declare namespace Express {
  export interface Request {
    user: {
      userId: number;
      email: string;
      firstname?: string;
      lastname?: string;
      password: string;
      image?: String;
    };
  }
}
