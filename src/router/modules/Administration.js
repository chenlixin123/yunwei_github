import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'Administration-';

export default {
    path: '/Administration',
    name: 'Administration',
    redirect: {
        name: `${pre}CarAdministration`
    },
    meta,
    component: BasicLayout,
    children: [{
            path: 'CarAdministrations',
            name: `${pre}CarAdministrations`,
            meta: {
                ...meta,
                title: '车场管理',
                closable: false
            },
            component: () => import('@/pages/Administration/CarAdministrations')
        },
        {
            path: 'CarAdministrations/CarAdministration_edit',
            name: `${pre}CarAdministrations/CarAdministration_edit`,
            meta: {
                ...meta,
                title: '地图管理',
                closable: false
            },
            component: () => import('@/pages/Administration/CarAdministrations/CarAdministration_edit')
        },
        {
            path: 'CarAdministration',
            name: `${pre}CarAdministration`,
            meta: {
                ...meta,
                title: '车位管理',
                closable: true
            },
            component: () => import('@/pages/Administration/CarAdministration')
        },
        {
            path: 'CarAdministration/CarAdministration_excel',
            name: `${pre}CarAdministration/CarAdministration_excel`,
            meta: {
                ...meta,
                title: '导入excel',
                closable: true
            },
            component: () => import('@/pages/Administration/CarAdministration/CarAdministration_excel')
        }, {
            path: 'CarAdministration/CarAdministrations',
            name: `${pre}CarAdministration/CarAdministrations`,
            meta: {
                ...meta,
                title: '车位详情',
                closable: true
            },
            component: () => import('@/pages/Administration/CarAdministration/CarAdministrations')
        },
        {
            path: 'CarAdministration/CarAdministration_edit',
            name: `${pre}CarAdministration/CarAdministration_edit`,
            meta: {
                ...meta,
                title: '编辑信息',
                closable: true
            },
            component: () => import('@/pages/Administration/CarAdministration/CarAdministration_edit')
        },
        {
            path: 'AvenueAdministration',
            name: `${pre}AvenueAdministration`,
            meta: {
                ...meta,
                title: '车道管理',
                closable: true
            },
            component: () => import('@/pages/Administration/AvenueAdministration')
        },
        {
            path: 'UserAdministration/UserAdministration_excel',
            name: `${pre}UserAdministration/UserAdministration_excel`,
            meta: {
                ...meta,
                title: '用户批量导入',
                closable: true
            },
            component: () => import('@/pages/Administration/UserAdministration/UserAdministration_excel')
        },
        {
            path: 'equipmentAdministration',
            name: `${pre}equipmentAdministration`,
            meta: {
                ...meta,
                title: '设备管理',
                closable: true
            },
            component: () => import('@/pages/Administration/equipmentAdministration')
        },
        {
            path: 'equipmentAdministration/equipmentAdministration_edit',
            name: `${pre}equipmentAdministration/equipmentAdministration_edit`,
            meta: {
                ...meta,
                title: '反寻系统',
                closable: true
            },
            component: () => import('@/pages/Administration/equipmentAdministration/equipmentAdministration_edit')
        },
        {
            path: 'AvenueAdministration/AvenueAdministration_edit',
            name: `${pre}AvenueAdministration/AvenueAdministration_edit`,
            meta: {
                ...meta,
                title: '编辑车道',
                closable: true
            },
            component: () => import('@/pages/Administration/AvenueAdministration/AvenueAdministration_edit')
        },
        {
            path: 'Information_template',
            name: `${pre}Information_template`,
            meta: {
                ...meta,
                title: '信息屏模板',
                closable: true
            },
            component: () => import('@/pages/Administration/Information_template')
        },
        {
            path: 'in_outAdministration',
            name: `${pre}in_outAdministration`,
            meta: {
                ...meta,
                title: '出入口管理',
                closable: true
            },
            component: () => import('@/pages/Administration/in_outAdministration')
        },
        {
            path: 'device_log',
            name: `${pre}device_log`,
            meta: {
                ...meta,
                title: '设备日志'
            },
            component: () => import('@/pages/Administration/device_log')
        }
    ]
};