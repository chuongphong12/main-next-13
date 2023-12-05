export function getYoutubeId(url: string) {
    let ID;
    let formatedUrl = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (formatedUrl[2] !== undefined) {
        ID = formatedUrl[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    }
    else {
        ID = formatedUrl;
    }
    return ID;
}