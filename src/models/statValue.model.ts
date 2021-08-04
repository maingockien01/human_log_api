import { Stat } from "./stat.model";

export class StatValue {

    statId: string;
    value: string | StatValue[];
}