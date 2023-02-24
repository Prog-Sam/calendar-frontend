import { getUsers } from "../services/userService";
import {generateQueryStringFromObject} from './queryUtil';

export async function removeVerification(user){
    let localUser = {...user};
    delete localUser['verification'];

    return localUser;
}

export async function findUsersByEmail(email) {
    let queryObject = {
        username: email
    }

    const {data} = await getUsers(generateQueryStringFromObject(queryObject));
    return data;
}