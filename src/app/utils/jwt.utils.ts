import * as jose from 'jose';

/**
 * Decodifica un JWT sin verificar la firma.
 */
export function decodeJwt(token: string): any | null {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    } catch {
        return null;
    }
}

/**
 * Verifica si el JWT ha expirado.
 */
export function isJwtExpired(token: string): boolean {
    const payload = decodeJwt(token);
    if (!payload) return true;
    const now = Math.floor(Date.now() / 1000);
    return payload?.exp < now; // Usar optional chaining para evitar errores si payload es null
}

/**
 * Verifica la firma del JWT usando la clave secreta (en Base64, la misma del backend).
 * Devuelve el payload si es válido, null si no lo es.
 */
export async function verifyJwtSignature(token: string, base64Secret: string): Promise<any | null> {
    try {
        // 1. Decodifica la clave secreta desde Base64 a un ArrayBuffer (Uint8Array)
        const secret = new TextEncoder().encode(atob("OGFhZGE4YjU1MTUwYTVjYmE2YWUwNzQwZGEyYjU5MDE="));
        console.log('Clave secreta (Uint8Array) para verificación:', secret);

        // 2. Verifica la firma del JWT utilizando la clave secreta y los algoritmos esperados
        const { payload } = await jose.jwtVerify(token, secret, {
            algorithms: ['HS256'], // Asegúrate de que coincida con el algoritmo de tu backend
            // issuer: 'cedac.cfemex.com', // Asegúrate de que coincida con el emisor de tu backend
            // audience: 'usuarios_cfe', // Asegúrate de que coincida con la audiencia de tu backend
        });

        console.log('JWT verificado:', payload);
        return payload;
    } catch (err) {
        console.error('Firma JWT inválida:', err);
        return null;
    }
}
