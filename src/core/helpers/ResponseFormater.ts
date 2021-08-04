export interface ResponseFormater {
    format(data): string;
    getContentType(): string;
}

export enum ContentType {
    JSON = 'application/json',
    CSV = 'application/csv',
    XML = 'application/xml',
}

export const getResponseFormater = (
    contentType: string,
    availableFormaters: ResponseFormater[],
): ResponseFormater => {
    let returnFormater: ResponseFormater;
    availableFormaters.map((formater) => {
        console.log(`Content-Type: ${contentType} - formater: ${formater.getContentType()} - ${contentType.includes(formater.getContentType())}`)

        if (contentType.includes(formater.getContentType())) {
            returnFormater = formater;
        }
    });

    return returnFormater;
};

class JsonFormater implements ResponseFormater {
    format(data): string {
        return JSON.stringify(data);
    }

    getContentType() {
        return ContentType.JSON;
    }
}

//Export singleton instances
export const jsonFormater: ResponseFormater = new JsonFormater();
