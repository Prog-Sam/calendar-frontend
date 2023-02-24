export function generateQueryStringFromObject(query){
    let queryString = '?';
    for(const property in query){
        if(!query[property]) continue;
        queryString = queryString.concat(property + '=' + query[property]);
        queryString = queryString.concat('&')
    }

    return(queryString);
}