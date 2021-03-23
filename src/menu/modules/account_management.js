const pre = '/account_management/';

export default {
    path: '/account_management',
    title: '账号管理',
    header: 'home',
    icon: 'ios-folder',
    children: [{
        path: `${pre}Enterprise_account_management`,
        title: '企业账号',
        hideSider: true,
    }, {
        path: `${pre}system_account_management`,
        title: '系统账号',
        hideSider: true,
    }, ]

}