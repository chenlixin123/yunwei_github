import request from '@/plugins/request';

export function search(data) {
    return request({
        url: '/api/search',
        method: 'post',
        data
    });
}
export function echartspie() {
    return request({
        url: '/api/echarts-pie',
        method: 'get'
    })
}
export function echarts1(data) {
    return request({
        url: '/api/echarts',
        method: 'post',
        data
    })
}