export class Token {
    constructor(token:string,expiration:Date){
        this.token=token;
        this.expiration=expiration;
    }
    token:string;
    expiration:Date;
    roles:string[];
}
