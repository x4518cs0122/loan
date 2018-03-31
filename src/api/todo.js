import axios from 'axios'

export function getTodo() {
    const url = "/api/todos"
    return axios.get(url).then((res) => {
        return Promise.resolve(res.data)
    })
}