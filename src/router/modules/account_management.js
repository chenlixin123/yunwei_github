import BasicLayout from '@/layouts/basic-layout';

const meta = {
    auth: true
};

const pre = 'account_management-';

export default {
    path: '/account_management',
    name: 'account_management',
    redirect: {
        name: `${pre}account_management`
    },
    meta,
    component: BasicLayout,
    children: [{
            path: 'Enterprise_account_management',
            name: `${pre}Enterprise_account_management`,
            meta: {
                ...meta,
                title: '企业账号',
                closable: false
            },
            component: () => import('@/pages/account_management/Enterprise_account_management')
        },
        {
            path: 'system_account_management',
            name: `${pre}system_account_management`,
            meta: {
                ...meta,
                title: '系统账号',
                closable: false
            },
            component: () => import('@/pages/account_management/system_account_management')
        },
    ]
};