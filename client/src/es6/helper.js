
function getUrlPrefix() {
    // console.log(window.location.pathname);
    // NOT localhost, get url prefix
    if (window.location.host.indexOf('localhost:') < 0) {
        var pathname = window.location.pathname;
        var port = pathname.split('/')[1];
        if ($.isNumeric(port)) {
            return '/' + port;
        }
    }
    return '';
}

export const urlPrefix = getUrlPrefix();

// return true if the key is undefined or empty
// normally, web is running in test mode
export function isEmpty(key) {
    return key == "None" || key == undefined || key == "" || key == {} || key == [];
};

export function urlFor(url) {
    return url.indexOf('/') == 0 ? (urlPrefix + url) : (urlPrefix + '/' + url);
};
