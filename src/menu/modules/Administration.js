const pre = '/Administration/';

export default {
    path: '/Administration',
    title: '系统管理',
    header: 'home',
    icon: 'ios-folder',
    children: [{
            path: `${pre}CarAdministrations`,
            title: '车场管理',
            hideSider: true,
        }, {
            path: `${pre}CarAdministration`,
            title: '车位管理',
            hideSider: true,
        },
        {
            path: `${pre}CarAdministration/CarAdministration_excel`,
            title: '导入excel',
            auth: ['hidden'] // 不存在的鉴权，所以不会显示该菜单
        },
        {
            path: `${pre}CarAdministration/CarAdministrations`,
            title: '列表详情',
            auth: ['hidden'] // 不存在的鉴权，所以不会显示该菜单
        },
        {
            path: `${pre}CarAdministration/CarAdministration_edit`,
            title: '编辑信息',
            auth: ['hidden'] // 不存在的鉴权，所以不会显示该菜单
        },
        {
            path: `${pre}AvenueAdministration`,
            hideSider: true,
            title: '车道管理'
        },
        {
            path: `${pre}UserAdministration/UserAdministration_excel`,
            title: '用户批量导入',
            auth: ['hidden'] // 不存在的鉴权，所以不会显示该菜单
        },
        // {
        //     path: `${pre}Carstatus`,
        //     hideSider: true,
        //     title: '车位状态',
        // },
        {
            path: `${pre}Information_template`,
            hideSider: true,
            title: '信息屏模板',
            // auth: ['hidden']
        },
        {
            path: `${pre}in_outAdministration`,
            hideSider: true,
            title: '出入口管理',
            // auth: ['hidden']
        },
        {
            path: `${pre}equipmentAdministration`,
            hideSider: true,
            title: '设备管理'
        },
        {
            path: `${pre}equipmentAdministration/equipmentAdministration_edit`,
            hideSider: true,
            title: '反寻系统',
            auth: ['hidden'] // 不存在的鉴权，所以不会显示该菜单
        },
        {
            path: `${pre}AvenueAdministration/AvenueAdministration_edit`,
            hideSider: true,
            title: '编辑车道',
            auth: ['hidden'] // 不存在的鉴权，所以不会显示该菜单
        },
        {
            path: `${pre}device_log`,
            hideSider: true,
            title: '设备日志'
        }
    ]

}