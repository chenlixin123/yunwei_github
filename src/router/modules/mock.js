import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};
const pre = 'mock-';
export default {
    path: '/mock',
    name: 'mock',
    redirect: {
        name: `${pre}mocks`
    },
    meta,
    component: BasicLayout,
    children: [{
            path: 'mocks',
            name: `${pre}mocks`,
            meta: {
                ...meta,
                title: '模拟数据',
                closable: true
            },
            component: () => import('@/pages/mock/mocks')
        }, {
            path: 'mock-assembly',
            name: `${pre}mock-assembly`,
            meta: {
                ...meta,
                title: '模拟组件',
                closable: true
            },
            component: () => import('@/pages/mock/mock-assembly')
        },
        {
            path: 'mock-assembly1',
            name: `${pre}mock-assembly1`,
            meta: {
                ...meta,
                title: 'echarts组件',
                closable: true
            },
            component: () => import('@/pages/mock/mock-assembly1')
        },
        {
            path: 'mock-iview',
            name: `${pre}mock-iview`,
            meta: {
                ...meta,
                title: 'iview组件',
                closable: true
            },
            component: () => import('@/pages/mock/mock-iview')
        },
        {
            path: 'mock-iframe',
            name: `${pre}mock-iframe`,
            meta: {
                ...meta,
                title: 'iframe组件',
                closable: true
            },
            component: () => import('@/pages/mock/iframe')
        },
        {
            path: 'mock-custom',
            name: `${pre}mock-custom`,
            meta: {
                ...meta,
                title: 'custom组件',
                closable: true
            },
            component: () => import('@/pages/mock/custom')
        }
    ]
}