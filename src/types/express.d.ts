// src/types/express.d.ts

import { Request } from 'express';

// ------------------------------------------------------------------
// 1. JWT Payload Type: টোকেন ডিকোড করার পর যে ডেটা পাওয়া যায়
// ------------------------------------------------------------------
export type JwtPayload = {
    userId: number; // নিশ্চিত করুন যে এটি আপনার JWT এ আছে
    role: 'ADMIN' | 'USER'; // আপনার schema.prisma-এর enum অনুযায়ী
};


export interface CustomRequest extends Request {
    // user? : যদি authenticateJWT মিডলওয়্যার সফল হয়, তবে এই অবজেক্টটি থাকবে
    user?: JwtPayload;
}