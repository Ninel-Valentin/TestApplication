function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    return cookies.find(x => x.includes(`${cname}=`))?.split('=').pop() || null;
}

function deleteCookie(cname) {
    document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export { setCookie, getCookie, deleteCookie };