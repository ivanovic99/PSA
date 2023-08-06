export type AuthState = {
   loggedIn: boolean,
   id: number | null,
   isAdmin: boolean,
   email: string | null,
   username: string | null,
   name: string | null,
   lastname: string | null,
   age: number | null,
   nationality: string | null,
   adress: string | null,
   phone: string | null,
}

export type InitialState = {
   value: AuthState
}

