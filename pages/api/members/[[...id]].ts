import {NextApiRequest, NextApiResponse} from "next";
import {userDetails} from "@/app/types/types";

import DefaultImage from '../../../assets/images/userSocial0.png';
import {supabase} from "@/app/constants";
import {start} from "node:repl";
import {sort} from "next/dist/build/webpack/loaders/css-loader/src/utils";
import {type} from "node:os";
const validateUserDetail = (body: any) : boolean => {
    if (body.name
        && body.userName
        && body.isActive !== undefined
        && body.role
        && body.email
        && body.teams
    )
        return true;

    return false;
}

const getRowWithId = async (id: number) => {
    let {data, error} = await supabase
        .from('UserInfo')
        .select('*')
        .eq('id', id);

    return [data, error];
}
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    let {id, sortBy, page, limit, order, search} = req.query;
    let idNum = -1;
    if (typeof id === "string") {
        idNum = parseInt(id);
    } else if (typeof id === 'object') {
        idNum = parseInt(id[0])
    }

    if (req.method === 'POST') {
        try {
            if (validateUserDetail(req.body)) {
                const teams = req.body.teams;
                const {data, error} = await supabase
                    .from('UserInfo')
                    .insert([
                        {
                            id: Math.floor(Math.random() * 1000) + 150,
                            name: req.body.name,
                            userName: req.body.userName,
                            isActive: req.body.isActive,
                            role: req.body.role,
                            email: req.body.email,
                            teams__001: teams[0],
                            teams__002: (teams.length > 1) ? teams[1] : null,
                            teams__003: (teams.length > 2) ? teams[2] : null,
                            teams__004: (teams.length > 3) ? teams[3] : null,
                            teams__005: (teams.length > 4) ? teams[4] : null,
                            teams__006: (teams.length > 5) ? teams[5] : null,
                        },
                    ])
                    .select();

                if (data) {
                    res.status(200).send(data[0]);
                } else {
                    throw new Error(error?.message);
                }
            } else {
                throw new Error('Something erroneous happened. Please try again')
            }
        } catch (e:  any) {
            res.status(400).json({"error": e.message});
        }

        return;
    } else if (req.method === 'PUT') {
        let body = req.body;
        let userData: Record<string, any> = {};
        for (let [key, val] of Object.entries(body)) {
            userData[key] = val;
        }

        let {data, error} = await supabase
            .from('UserInfo')
            .update(userData)
            .eq('id', idNum);

        if (error) {
            res.status(400).json(error);
        } else {
            getRowWithId(idNum).then(([updatedData, selectError]) => {
                res.status(200).json(updatedData);
            })
        }
    } else if (req.method === 'DELETE') {
        const [oldData, selectError] = await getRowWithId(idNum);

        if (selectError) {
            res.status(400).json(selectError);
        } else {
            let {data, error} = await supabase
                .from('UserInfo')
                .delete()
                .eq('id', idNum);

            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(oldData);
            }
        }
    }

    else if (req.method === 'GET') {
        if (id) {
            getRowWithId(idNum).then(([data, error]) => {
                if (data) {
                    res.status(200).json(data);
                } else {
                    res.status(400).json(error);
                }
            })
        } else {
            let {data, error} = await supabase
                .from('UserInfo')
                .select('*')

            if (data) {
                handleGetRequest(req, res, data);
            } else {
                res.status(400).json(error);
            }
        }
    }
}

const handleGetRequest = (req: NextApiRequest, res: NextApiResponse, data: any[]) => {
    let {id, sortBy, page, limit, order, search} = req.query;
    let responseData: Record<string, any>[] = data;

    if (page && limit) {
        let pageNum = -1;
        let limitNum = -1;

        if (typeof page === 'string' && typeof limit === 'string') {
            pageNum = parseInt(page);
            limitNum = parseInt(limit);
        } else {
            pageNum = parseInt(page[0]);
            limitNum = parseInt(limit[0]);
        }

        let endIndex = pageNum * limitNum;
        let startIndex = (pageNum - 1) * limitNum;

        if (startIndex >= 0 && endIndex >= 0)
        responseData = data.slice(startIndex, endIndex);
    }

    if (sortBy) {
        let sortByStr: any = null;
        let orderStr: any = null;

        if (typeof sortBy === 'string') {
            sortByStr = sortBy;
            orderStr = order;
        } else {
            sortByStr = sortBy[0];
            if (order) {
                orderStr = order[0];
            } else {
                orderStr = null;
            }
        }

        let value = responseData[0][sortByStr];
        if (typeof value === 'string') {
            console.log("Before sort!")
            console.log(responseData);
            responseData = responseData.sort((a, b) => {
                if (orderStr && orderStr === 'desc') {
                    return b[sortByStr].localeCompare(a[sortByStr]);
                } else {
                    return a[sortByStr].localeCompare(b[sortByStr]);
                }
            })
            console.log("After sort!")
            console.log(responseData);
        } else if (typeof value === 'number') {
            responseData = responseData.sort((a, b) => {
                if (order && order[0] === 'desc') {
                    return b[sortBy[0]] - (a[sortBy[0]]);
                } else {
                    return a[sortBy[0]] - (b[sortBy[0]]);
                }
            })
        }
    }

    if (search) {
        let searchStr = '';

        if (typeof search === 'string') {
            searchStr = search;
        } else {
            searchStr = search[0];
        }

        responseData = responseData.filter((row) => {
            for (const key in row) {
                if (typeof row[key] === 'string' && row[key].toUpperCase().includes(searchStr.toUpperCase())) {
                    return true;
                }
            }

            return false;
        })
    }

    res.status(200).json({
        items: JSON.stringify(responseData),
        count: responseData.length
    })

}