import request from '../utils/request'

export const getarticleAPI = function (index, num) {
    return request.post('/post/getarticle', {
        index: index,
        num: num
    }).then(res => {
        return res.data
    }).catch(err => console.log(err))
}