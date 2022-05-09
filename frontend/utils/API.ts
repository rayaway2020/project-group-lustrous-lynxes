import YoutubeMusicApi from 'youtube-music-api'

let API: any = null
const getAPIInstance = async () => {
  if (!API) {
    API = new YoutubeMusicApi()
    await API.initalize()
  }
  return API
}

export default getAPIInstance
