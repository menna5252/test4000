
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function getToken() {
    const token = (await cookies()).get('next-auth.session-token')?.value || (await cookies()).get('__Secure-next-auth.session-token')?.value
    const encodedToken = await decode({token,secret:process.env.AUTH_SECRET!})
     if (!encodedToken) return null;

    return encodedToken?.accessToken;
}