import {StaticImageData} from "next/image";

export interface Styles {
    [key: string]: React.CSSProperties;
}

export type userDetails = {
    name: string;
    userName: string;
    avatar: string;
    status: boolean;
    role: string;
    email: string;
    teams: string[];
}
