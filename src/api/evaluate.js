import axios from 'axios'

export function getEvaluate() {
    const url = '/api/getEvaluate'

    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}