const pre = '/mock/'
export default {
    path: '/mock',
    title: '模拟数据',
    header: 'system',
    icon: 'ios-folder',
    children: [{
        path: `${pre}mocks`,
        hideSider: true,
        title: '模拟数据管理'
    }, {
        path: `${pre}mock-assembly`,
        hideSider: true,
        title: '模拟组件'
    }, {
        path: `${pre}mock-assembly1`,
        hideSider: true,
        title: 'Echarts组件'
    }, {
        path: `${pre}mock-iview`,
        hideSider: true,
        title: 'iview组件'
    }, {
        path: `${pre}mock-iframe`,
        hideSider: true,
        title: 'iframe组件'
    }, {
        path: `${pre}mock-custom`,
        hideSider: true,
        title: 'custom组件'
    }]
}