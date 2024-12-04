export type User = {
    email: string;
    name: string;
    role: string;
    id: number;
    user_id?: number; // ID user dari JWT (opsional)
    // points?: number;
};

declare global {
    namespace Express {
        export interface Request {
            user?: User;
jwtPayload?: JWTPayload; 
        }
    }
}