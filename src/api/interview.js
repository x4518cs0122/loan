import axios from 'axios'

export function getInterview() {
    const url = '/api/issues'
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}