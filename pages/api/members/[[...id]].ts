import {NextApiRequest, NextApiResponse} from "next";
import {userData} from "@/app/data/data";
import {userDetails} from "@/app/types/types";

import DefaultImage from '../../../assets/images/userSocial0.png';
import {supabase} from "@/app/constants";
const validateUserDetail = (body: any) : boolean => {
    if (body.name
        && body.handle
        && body.status
        && body.role
        && body.role.length > 1
        && body.email
        && body.teams
    )
        return true;

    return false;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const {id} = req.query;

    if (req.method === 'POST') {
        console.log(req.body)
        try {
            if (validateUserDetail(req.body)) {
                const {data, error} = await supabase
                    .from('UserInfo')
                    .insert([
                        {
                            name: req.body.name,
                            handle: req.body.handle,
                            status: req.body.status,
                            role: req.body.role,
                            email: req.body.email,
                            teams: req.body.teams,
                            imageURL: 'www.google.com',
                        },
                    ])
                    .select();


                if (data) {
                    res.status(200).send(data[0]);
                } else {
                    throw new Error('Something erroneous happened. Please try again')
                }
            } else {
                throw new Error('Something erroneous happened. Please try again')
            }
        } catch (e:  any) {
            res.status(400).json({"error": e.message});
        }

        return;
    }

    if (id) {
        let filteredArray = userData.filter((item) => item.id == id[0]);
        res.status(200).json(filteredArray);
        // res.status(200).send(id[0])
    } else {
        res.status(200).json({
            items: JSON.stringify(userData),
            count: userData.length
        })
    }
}