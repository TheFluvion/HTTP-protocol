export interface User {
    ID: number
    name: string
}

export interface FullUser extends User {
    photoUrl: string
    realName: string
    birthday: string | Date
    profileDescription: string
}

export const INITIAL_USER: User = {
    ID: 0,
    name: '',
};
