declare namespace Express {
    export interface Request {
        payload?: {
            id: number;
            name: string;
            cpf: string;
        };
        userId?: number;
    }
}
