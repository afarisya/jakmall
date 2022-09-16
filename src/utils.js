import { routes } from "./routes";

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const getPageDataFromSessioStorage = (path) => {
    // get saved data from sessionStorage
    return JSON.parse(sessionStorage.getItem(path));
}

export const savePageDataToSessioStorage = (path, values) => {
    const data = JSON.stringify(values);
    if ( data === "{}" ) return;

    // save this page data to sessionStorage
    sessionStorage.setItem(path, data);

    return JSON.parse(sessionStorage.getItem(path));
}

export const removePageDataFromSessioStorage = (path) => {
    sessionStorage.removeItem(path);
}

export const removeAllPageDataFromSessioStorage = () => {
    routes.forEach(({path}) => {
        setDataOfPathInvalid(path);
        removePageDataFromSessioStorage(path);
    })
}

export const setDataOfPathValid = (path) => {
    sessionStorage.setItem(path+"_valid", true);
}
export const setDataOfPathInvalid = (path) => {
    sessionStorage.setItem(path+"_valid", false);
}

export const getPrevPath = (current_path) => {
    let prev_path = null;

    const index = routes.findIndex(({path}) => path === current_path);
    if ( index > 0 ) {
        const prev_index = index-1;
        prev_path = routes[prev_index].path
    }

    return prev_path;
}

export const getAllPrevPathsData = (current_path) => {
    let data = {};

    const index = routes.findIndex(({path}) => path === current_path);
    if ( index > 0 ) {
        const all_prev_paths = routes.map(({path}) => path).splice(0, index);
        all_prev_paths.forEach((path) => {
            let path_data = sessionStorage.getItem(path);
            if ( path_data !== "{}" ) {
                path_data = JSON.parse(path_data);
                data = {...data, ...path_data}    
            }    
        })
    }

    return data;
}

export const getNextPath = (current_path) => {
    let next_path = null;

    const index = routes.findIndex(({path}) => path === current_path);
    if ( index !== -1 ) {
        const next_index = index+1;
        if ( next_index <= routes.length-1 ) {
            next_path = routes[next_index].path
        }
    }

    return next_path;
}

export const isPreviousPageDataValid = (current_path) => {
    let isValid = false;

    const prev_path = getPrevPath(current_path);
    if ( prev_path !== null ) {
        isValid = sessionStorage.getItem(prev_path+"_valid");
        if ( isValid === null || isValid === undefined ) {
            isValid = false;
        } else {
            isValid = (isValid === "true");
        }
    } else {
        isValid = true
    }

    return isValid;
}
