import {firstNamesArr, lastNamesArr, roles, supabase} from "@/app/constants";
import {StaticImageData} from "next/image";

import userSocial0 from '../../assets/images/userSocial0.png';
import userSocial1 from '../../assets/images/userSocial1.png';
import userSocial2 from '../../assets/images/userSocial2.png';
import userSocial3 from '../../assets/images/userSocial3.png';
import userSocial4 from '../../assets/images/userSocial4.png';
import {userDetails} from "@/app/types/types";
import {guidGenerator} from "@/app/utils";

const images = [userSocial0, userSocial1, userSocial2, userSocial3, userSocial4];

export const prepareData = async () => {
    let {data, error} = await supabase
        .from('UserInfo')
        .select('*')

    let userData: userDetails[] = [];
    if (data) {
        for (const row of data) {
            let teams: string[] = [];

            for (let i = 1; i <= 6; i++) {
                const key = `teams__00${i}`;
                if (row[key]) {
                    teams.push(row[key]);
                }
            }

            let userDetail: userDetails = {
                name: row.name,
                userName: row.userName,
                avatar: row.avatar,
                status: row.isActive,
                role: row.role,
                email: row.email,
                teams: teams
            }

            userData.push(userDetail);
        }
    }

    return userData;
}