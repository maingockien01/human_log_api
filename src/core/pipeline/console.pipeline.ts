import { Pipeline } from "./interface";

export class ConsolePipeline<E> implements Pipeline<E> {
    private elementId: number;
    constructor (private elementName: string) {this.elementId = 0};

    write(element: E) : string {
        console.log(`Write [${this.elementName}] ${this.elementId}`)

        return '' + this.elementId++;
        
    }
    remove(elementId: string) {
        console.log(`Remove [${this.elementName}] ${elementId}`)

    }
    hookUser (userId: string, elementId: string) {
        console.log(`Hook: [User] ${userId} [${this.elementName}] ${elementId}`)
    }
}