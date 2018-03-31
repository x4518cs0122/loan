import axios from 'axios'

export function getNotice() {
    const url = '/api/notices'
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}