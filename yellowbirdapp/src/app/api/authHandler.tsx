'use server'
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';

const key = process.env.TOKEN_SECRET || '';

export async function decryptToken(token: string): Promise<JwtPayload | null> {
    try {
        const userInfo = jwt.verify(token, key);
        if (typeof userInfo === 'string') {
            return null;
        }
        return userInfo as JwtPayload;
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return null;
    }
}

export async function storeToken(authToken: string){
    cookies().set('session', JSON.stringify({ token: authToken }), {
        expires: new Date(Date.now() + 10 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
}

export async function getUserInfo() {
    const sessionCookie = cookies().get('session');
    if (!sessionCookie) {
        return null;
    }
    const { token } = JSON.parse(sessionCookie.value);
    if (!token) {
        return null;
    }
    const decodedToken = await decryptToken(token);
    if (!decodedToken) {
        return null;
    }
    return {id: decodedToken._id, name: decodedToken.name, email: decodedToken.email};
}