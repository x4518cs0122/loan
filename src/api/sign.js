import axios from 'axios'

export function getSignContent() {
    const url = '/api/sign'
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}