export interface SignInCredential {
    email: string;
    password: string;
}

export interface userSignInReturn {
    token: string,
    userDetail: {
		_id: string,
		fullname: string,
		role: string,
		password: string,
		email: string,
	},
}