import { Guid } from "guid-typescript";

export class Pass{
    guidId:Guid;
    name:string;
    password:string;

    constructor() {
        this.guidId = Guid.create();
    }
}