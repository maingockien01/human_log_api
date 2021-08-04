import { Event, StatValue } from "../../models"

export class CreateLogDTO {
    event: Event;
    statValues: [StatValue];
}

export class UpdateLogDTO {
    _id: string;
    event?: Event;
    statValues?: [StatValue];
}

export class DeleteLogDTO {
    _id: string;
}

export class GetLogById {
    _id: string;
}