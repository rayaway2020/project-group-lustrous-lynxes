import YoutubeMusicApi from 'youtube-music-api';

let API = null;
export const getAPIInstance = async () => {
    if (!API) {
        API = new YoutubeMusicApi();
        await API.initalize(); // should be the initialize
    }
    return API;
};
