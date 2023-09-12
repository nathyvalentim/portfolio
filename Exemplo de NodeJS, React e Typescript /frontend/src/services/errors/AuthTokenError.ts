export class AuthTokenError extends Error{
    constructor(){
        super('Error de autorizaçao do token.')
    }
}