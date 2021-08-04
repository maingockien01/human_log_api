export class Stat {
    _id?: string;
    name: string;
    context?: string;
    default?: String;
    valueType: ValueType;
};

export enum ValueType {
    STRING,
    NUMBER,
    TIMESTAMP,
} 
