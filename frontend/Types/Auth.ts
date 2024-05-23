export interface SignInCredential {
    email: string;
    password: string;
}

export interface userSignInReturn {
    token: string,
    id: string
}