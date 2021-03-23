const pre = '/Statistics/';

export default {
    path: '/Statistics',
    title: '统计',
    header: 'home',
    icon: 'md-stats',
    auth: ['admin'],
    children: [{
        path: `${pre}CarStatistics`,
        hideSider: true,
        title: '车场分析'
    }]
}