export class Usuario {
    constructor(){
        public nombre:string,
        public email:string,
        public password?:string,
        public img?: string,
        public google?: boolean,
        public role?: string, // es opcional
        public uid?:string // es casi opcional hasta que lo creo
    }
}