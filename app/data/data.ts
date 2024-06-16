import {firstNamesArr, lastNamesArr, roles} from "@/app/constants";
import {StaticImageData} from "next/image";

import userSocial0 from '../../assets/images/userSocial0.png';
import userSocial1 from '../../assets/images/userSocial1.png';
import userSocial2 from '../../assets/images/userSocial2.png';
import userSocial3 from '../../assets/images/userSocial3.png';
import userSocial4 from '../../assets/images/userSocial4.png';
import {userDetails} from "@/app/types/types";

const images = [userSocial0, userSocial1, userSocial2, userSocial3, userSocial4];

export const userData: userDetails[] = Array.from({length : 100}).map((_, index) => {
    let randomNumber = Math.floor((Math.random() * firstNamesArr.length));
    let randomImage = Math.floor((Math.random() * 5))

    let userDetail: userDetails = {
        name: `${firstNamesArr[randomNumber]} ${lastNamesArr[randomNumber]}`,
        handle: `@${firstNamesArr[randomNumber]}`,
        imageURL: images[randomImage],
        status: 'Active',
        role: roles[randomNumber],
        email: `${firstNamesArr[randomNumber]}@untitledui.com`,
        teams: ['Design', 'Product', 'Marketing']
    }

    return userDetail;
})