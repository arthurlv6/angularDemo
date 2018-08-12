export interface IUser {
    id: string;
    name: string;
    title: string;
    email: string;
    phone: string;
    roles: Role[];
}
export class Role {
    id:string;
    name: string;
}
