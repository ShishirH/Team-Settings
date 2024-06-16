import {StaticImageData} from "next/image";

export interface Styles {
    [key: string]: React.CSSProperties;
}

export type userDetails = {
    name: string;
    handle: string;
    imageURL: StaticImageData;
    status: string;
    role: string;
    email: string;
    teams: string[];
}
