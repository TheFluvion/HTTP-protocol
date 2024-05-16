export interface Form {
    user: string
    document: string
    username: string
    password: string
    client_id: string
}

export const INITIAL_FORM: Form = {
    user: '',
    document: '',
    username: '',
    password: '',
    client_id: '',
};
