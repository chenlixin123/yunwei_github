import request from '@/plugins/request';


// 企业账号

//账号列表
export function admin_enterprise_list(params) {
    return request({
        url: '/admin/biz/enterprise/list',
        method: 'post',
        params
    });
}

//新增账号
export function admin_enterprise_save(params) {
    return request({
        url: '/admin/biz/enterprise/save',
        method: 'post',
        params
    });
}

// 编辑账号
export function admin_enterprise_update(params) {
    return request({
        url: '/admin/biz/enterprise/update',
        method: 'post',
        params
    });
}

// 账号删除
export function admin_enterprise_delete(params) {
    return request({
        url: '/admin/biz/enterprise/delete',
        method: 'post',
        params
    });
}

// 企业账号启用-禁用
export function admin_enterprise_update_flag(params) {
    return request({
        url: '/admin/biz/enterprise/update-flag',
        method: 'get',
        params
    });
}

//系统账号

// 列表
export function admin_security_person_list(params) {
    return request({
        url: '/admin/security/person/list',
        method: 'post',
        params
    });
}

// 新增系统账号
export function admin_security_person_save(params) {
    return request({
        url: '/admin/security/person/save',
        method: 'post',
        params
    });
}

// 编辑系统账号
export function admin_security_person_update(params) {
    return request({
        url: '/admin/security/person/update',
        method: 'post',
        params
    });
}

// 系统账号删除
export function admin_security_person_delete(params) {
    return request({
        url: '/admin/security/person/delete-by-id',
        method: 'post',
        params
    });
}

//角色列表
export function admin_security_person_role_list(params) {
    return request({
        url: '/admin/security/person/role_list',
        method: 'post',
        params
    });
}

//账号拥有的角色列表
export function admin_security_person_role_person_list(params) {
    return request({
        url: '/admin/security/person/person_role_list',
        method: 'post',
        params
    });
}

//启用-禁用
export function admin_security_person_updata_flag(params) {
    return request({
        url: '/admin/security/person/update-flag',
        method: 'get',
        params
    });
}