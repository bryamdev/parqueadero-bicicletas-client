import { Estado } from "./estado.model";
import { Usuario } from "./usuario.model";

export class Puesto{
    public id: number;
    public ubicacion: string;
    public usuario: Usuario;
    public estado: Estado;
    public horaEntrada: Date;

    constructor(){
        
    }
}