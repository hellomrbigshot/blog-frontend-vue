import axios from 'axios'
import qs from 'qs'
export const Common = {
    axios (url, params) {
        params = params || {}
        return axios.post(url, qs.stringify(params))
    }
}