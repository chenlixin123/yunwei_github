import request from '@/plugins/request';
//车场管理

//车场下拉框列表
export function Administration_selectList() {
    return request({
        url: '/admin/biz/prefecture/selectList',
        method: "post",
    })
}

//车场功能总览列表
export function Administration_om_list(params) {
    return request({
        url: '/admin/biz/prefecture/om/list',
        method: 'post',
        params
    });
}
//编辑车场
export function Administration_prefecture_om_update(params) {
    return request({
        url: '/admin/biz/prefecture/om/update',
        method: 'post',
        params
    });
}
//车场启用禁用
export function Administration_om_update_status(params) {
    return request({
        url: '/admin/biz/prefecture/om/update-status',
        method: 'post',
        params
    });
}
//车场设备总览列表
export function Administration_om_device_list(params) {
    return request({
        url: '/admin/biz/prefecture/om/device/list',
        method: 'post',
        params
    });
}

//
//同步
export function Administration_biz_prefecture_om_sync(params) {
    return request({
        url: '/admin/biz/prefecture/om/sync',
        method: 'get',
        params
    });
}

//地图管理列表
export function Administration_biz_prefecture_map_list(params) {
    return request({
        url: '/admin/biz/prefecture/om/map/list',
        method: 'post',
        params
    });
}

//地图token下拉框
export function Administration_biz_prefecture_mode_list(params) {
    return request({
        url: '/admin/biz/prefecture/om/mode/list',
        method: 'get',
        params
    });
}

//更新地图token
export function Administration_biz_prefecture_mode_update(params) {
    return request({
        url: '/admin/biz/prefecture/om/mode/update',
        method: 'post',
        params
    });
}

//车场平面图列表
export function Administration_biz_prefecture_plane_list(params) {
    return request({
        url: '/admin/biz/prefecture/om/plane/list',
        method: 'get',
        params
    });
}

//新增平面图
export function Administration_biz_prefecture_plane_save(params) {
    return request({
        url: '/admin/biz/prefecture/om/plane/save',
        method: 'post',
        params
    });
}

//更新平面图
export function Administration_biz_prefecture_plane_update(params) {
    return request({
        url: '/admin/biz/prefecture/om/plane/update',
        method: 'post',
        params
    });
}

//删除平面图
export function Administration_biz_prefecture_plane_delete(params) {
    return request({
        url: '/admin/biz/prefecture/om/plane/delete',
        method: 'get',
        params
    });
}





// 车位管理

//车位列表查询选项级联接口
export function Administration_om_floor_area_stall_list(params) {
    return request({
        url: '/admin/biz/stall/om/floor-area-stall-list',
        method: 'get',
        params
    });
}

//车位列表车道选择框
export function Administration_om_select(params) {
    return request({
        url: '/admin/biz/lane/info/om/select',
        method: 'post',
        params
    });
}
// 车位管理列表（分页）
export function Administration_rent_list(params) {
    return request({
        url: '/admin/biz/stall/om/list',
        method: 'post',
        params
    });
}
//新增车位
export function Administration_om_save(params) {
    return request({
        url: '/admin/biz/stall/om/save',
        method: 'post',
        params
    });
}

//编辑车位
export function Administration_om_update(params) {
    return request({
        url: '/admin/biz/stall/om/update',
        method: 'post',
        params
    });
}
//删除车位
export function Administration_om_delete(params) {
    return request({
        url: '/admin/biz/stall/om/delete',
        method: 'post',
        params
    });
}
//未绑定车位锁
export function Administration_stall_sn(params) {
    return request({
        url: '/admin/biz/stall/sn',
        method: 'post',
        params
    });
}
//自动降锁
export function Administration_om_auto_down_flag(params) {
    return request({
        url: '/admin/biz/stall/om/auto-down-flag',
        method: 'post',
        params
    });
}
//自动升锁
export function Administration_om_auto_up_flag(params) {
    return request({
        url: '/admin/biz/stall/om/auto-up-flag',
        method: 'post',
        params
    });
}
//车位相机自动升锁
export function Administration_om_camera_up_flag(params) {
    return request({
        url: '/admin/biz/stall/om/lot-camera-up-flag',
        method: 'post',
        params
    });
}
//车位锁感应自动升锁
export function Administration_om_induction_up_flag(params) {
    return request({
        url: '/admin/biz/stall/om/lock-induction-up-flag',
        method: 'post',
        params
    });
}

// 车道管理

// 车道列表
export function Administration_lane_om_list(params) {
    return request({
        url: '/admin/biz/lane/info/om/list',
        method: 'post',
        params
    });
}
//新增车道
export function Administration_lane_om_save(params) {
    return request({
        url: '/admin/biz/lane/info/om/save',
        method: 'post',
        params
    });
}
//更新车道
export function Administration_lane_om_update(params) {
    return request({
        url: '/admin/biz/lane/info/om/update',
        method: 'post',
        params
    });
}
//删除车道
export function Administration_lane_om_delete(params) {
    return request({
        url: '/admin/biz/lane/info/om/delete',
        method: 'post',
        params
    });
}
//自动降锁标识
export function Administration_lane_om_auto_down_flag(params) {
    return request({
        url: '/admin/biz/lane/info/om/auto-down-flag',
        method: 'post',
        params
    });
}
//自动升锁标识
export function Administration_lane_om_auto_up_flag(params) {
    return request({
        url: '/admin/biz/lane/info/om/auto-up-flag',
        method: 'post',
        params
    });
}

//车道编辑
//查询车道车位列表
export function Administration_lane_om_stall_list(params) {
    return request({
        url: '/admin/biz/stall/om/lane-stall/list',
        method: 'get',
        params
    });
}

//查询未绑定车道的车位列表
export function Administration_lane_om_stall_not_bind(params) {
    return request({
        url: 'admin/biz/stall/om/lane-stall/not-bind',
        method: 'get',
        params
    });
}

//新增车道车位绑定
export function Administration_lane_om_stall_bind(params) {
    return request({
        url: '/admin/biz/stall/om/lane-stall/bind',
        method: 'get',
        params
    });
}

//解除车道车位绑定
export function Administration_lane_om_stall_unbind(params) {
    return request({
        url: '/admin/biz/stall/om/lane-stall/unbind',
        method: 'get',
        params
    });
}


//查询车道相机列表
export function Administration_lane_om_camera_lane_list(params) {
    return request({
        url: '/admin/biz/lane/camera/info/om/lane-list',
        method: 'get',
        params
    });
}

//查询未绑定车道的相机列表
export function Administration_lane_om_camera_not_bind(params) {
    return request({
        url: '/admin/biz/lane/camera/info/om/not-bind',
        method: 'get',
        params
    });
}

//解除车道相机绑定
export function Administration_lane_om_camera_unbind(params) {
    return request({
        url: '/admin/biz/lane/camera/info/om/unbind',
        method: 'get',
        params
    });
}

//新增车道相机绑定
export function Administration_lane_om_camera_bind(params) {
    return request({
        url: '/admin/biz/lane/camera/info/om/bind',
        method: 'get',
        params
    });
}

//启用、禁用
export function Administration_lane_om_camera_update_flag(params) {
    return request({
        url: '/admin/biz/lane/camera/info/om/update-flag',
        method: 'get',
        params
    });
}


//编辑车道相机
export function Administration_lane_om_camera_update(params) {
    return request({
        url: '/admin/biz/lane/camera/info/om/update',
        method: 'post',
        params
    });
}
//车道相机列表中编辑获取信息屏下拉列表
export function Administration_lane_om_screen_select(params) {
    return request({
        url: '/admin/biz/lane/screen/info/om/select',
        method: 'get',
        params
    });
}


//车位导航屏

//车道导航信息屏列表

export function Administration_lane_om_screen_lane_list(params) {
    return request({
        url: '/admin/biz/lane/screen/info/om/lane-list',
        method: 'get',
        params
    });
}
//未绑定车道的相机列表
export function Administration_lane_om_screen_not_bind(params) {
    return request({
        url: '/admin/biz/lane/screen/info/om/not-bind',
        method: 'get',
        params
    });
}
//解除车道导航信息屏的绑定
export function Administration_lane_om_screen_unbind(params) {
    return request({
        url: '/admin/biz/lane/screen/info/om/unbind',
        method: 'get',
        params
    });
}
//新增车道导航信息屏绑定
export function Administration_lane_om_screen_bind(params) {
    return request({
        url: '/admin/biz/lane/screen/info/om/bind',
        method: 'get',
        params
    });
}
//启用、禁用
export function Administration_lane_om_screen_update_flag(params) {
    return request({
        url: '/admin/biz/lane/screen/info/om/update-flag',
        method: 'get',
        params
    });
}
//更新车道导航信息屏
export function Administration_lane_om_screen_update(params) {
    return request({
        url: '/admin/biz/lane/screen/info/om/update',
        method: 'post',
        params
    });
}

//更新车道导航信息屏-联动相机下拉列表
export function Administration_lane_om_camera_select(params) {
    return request({
        url: '/admin/biz/lane/camera/info/om/select',
        method: 'get',
        params
    });
}


//出入口管理


//出入口相机编码选择框
export function Administration_camera_info_select(params) {
    return request({
        url: '/admin/biz/camera/info/om/select',
        method: 'get',
        params
    });
}

// 查询出入口列表
export function Administration_gate_info_list(params) {
    return request({
        url: '/admin/biz/gate/info/om/list',
        method: 'post',
        params
    });
}

// 出入口选择框
export function Administration_gate_list(params) {
    return request({
        url: '/admin/biz/gate/info/om/gate-list',
        method: 'get',
        params
    });
}

// 新增出入口
export function Administration_gate_save(params) {
    return request({
        url: '/admin/biz/gate/info/om/save',
        method: 'post',
        params
    });
}

// 编辑出入口
export function Administration_gate_update(params) {
    return request({
        url: '/admin/biz/gate/info/om/update',
        method: 'post',
        params
    });
}

// 删除出入口
export function Administration_gate_delete(params) {
    return request({
        url: '/admin/biz/gate/info/om/delete',
        method: 'post',
        params
    });
}

//设备管理-出入口相机

//出入口相机-已绑定列表
export function Administration_camera_list(params) {
    return request({
        url: '/admin/biz/camera/info/om/list',
        method: 'post',
        params
    });
}

//出入口相机-启用禁用标识
export function Administration_camera_update_flag(params) {
    return request({
        url: '/admin/biz/camera/info/om/update-flag',
        method: 'get',
        params
    });
}
//出入口相机-新增
export function Administration_camera_save(params) {
    return request({
        url: '/admin/biz/camera/info/om/save',
        method: 'post',
        params
    });
}

//出入口相机-编辑
export function Administration_camera_info_update(params) {
    return request({
        url: '/admin/biz/camera/info/om/update',
        method: 'post',
        params
    });
}

//出入口相机-未绑定列表中删除
export function Administration_camera_info_unbind_delete(params) {
    return request({
        url: '/admin/biz/camera/info/om/unbind-delete',
        method: 'get',
        params
    });
}

//出入口相机-已绑定列表中删除
export function Administration_camera_info_bind_delete(params) {
    return request({
        url: '/admin/biz/camera/info/om/bind-delete',
        method: 'get',
        params
    });
}

//设备管理-车道导航信息屏

//车道导航信息屏-列表
export function Administration_screen_info_list(params) {
    return request({
        url: '/admin/biz/lane/screen/info/om/list',
        method: 'post',
        params
    });
}

//车道导航信息屏-新增
export function Administration_screen_info_save(params) {
    return request({
        url: '/admin/biz/lane/screen/info/om/save',
        method: 'post',
        params
    });
}

//车道导航信息屏-未绑定删除
export function Administration_screen_info_delete(params) {
    return request({
        url: '/admin/biz/lane/screen/info/om/delete',
        method: 'get',
        params
    });
}


//设备管理-车道相机
//车道相机-列表
export function Administration_camera_info_list(params) {
    return request({
        url: '/admin/biz/lane/camera/info/om/list',
        method: 'post',
        params
    });
}

//车道相机-未绑定车道相机列表中删除
export function Administration_camera_info_delete(params) {
    return request({
        url: '/admin/biz/lane/camera/info/om/delete',
        method: 'get',
        params
    });
}

//车道相机-未绑定车道相机列表中新增
export function Administration_camera_info_save(params) {
    return request({
        url: '/admin/biz/lane/camera/info/om/save',
        method: 'post',
        params
    });
}


//信息屏模板

//模板功能组管理


//信息屏模板-模板功能组列表
export function Administration_group_info_list(params) {
    return request({
        url: '/admin/biz/template/group/info/om/list',
        method: 'post',
        params
    });
}

//信息屏模板-模板功能组下拉列表
export function Administration_group_info_select_list(params) {
    return request({
        url: '/admin/biz/template/group/info/om/select-list',
        method: 'get',
        params
    });
}

//信息屏模板-新增模板功能组
export function Administration_group_info_save(params) {
    return request({
        url: '/admin/biz/template/group/info/om/save',
        method: 'post',
        params
    });
}

//信息屏模板-更新模板功能组
export function Administration_group_info_update(params) {
    return request({
        url: '/admin/biz/template/group/info/om/update',
        method: 'post',
        params
    });
}

//信息屏模板-删除模板功能组
export function Administration_group_info_delete(params) {
    return request({
        url: '/admin/biz/template/group/info/om/delete',
        method: 'post',
        params
    });
}

//信息屏模板-新增基础模板编码
export function Administration_group_info_save_template_group(params) {
    return request({
        url: '/admin/biz/template/group/info/om/save-template-group',
        method: 'post',
        params
    });
}

//信息屏模板-更新基础模板编码
export function Administration_group_info_update_template_group(params) {
    return request({
        url: '/admin/biz/template/group/info/om/update-template-group',
        method: 'post',
        params
    });
}

//信息屏模板-删除基础模板编码
export function Administration_group_info_delete_template_group(params) {
    return request({
        url: '/admin/biz/template/group/info/om/delete-template-group',
        method: 'post',
        params
    });
}

//信息屏模板-通过模板功能组code值获取基础模板列表
export function Administration_group_info_find_list_code(params) {
    return request({
        url: '/admin/biz/template/group/info/om/find-list-by-code',
        method: 'get',
        params
    });
}

// 基础模板管理

//信息屏模板-基础模板列表
export function Administration_biz_template_info_list(params) {
    return request({
        url: '/admin/biz/template/info/om/list',
        method: 'post',
        params
    });
}

//信息屏模板-新增基础模板
export function Administration_template_info_save(params) {
    return request({
        url: '/admin/biz/template/info/om/save',
        method: 'post',
        params
    });
}

//信息屏模板-更新基础模板
export function Administration_template_info_update(params) {
    return request({
        url: '/admin/biz/template/info/om/update',
        method: 'post',
        params
    });
}

//信息屏模板-删除基础模板
export function Administration_template_info_delete(params) {
    return request({
        url: '/admin/biz/template/info/om/delete',
        method: 'post',
        params
    });
}

//信息屏模板-新增组件信息
export function Administration_template_info_save_component(params) {
    return request({
        url: '/admin/biz/template/info/om/save-component',
        method: 'post',
        params
    });
}

//信息屏模板-更新组件信息
export function Administration_template_info_update_component(params) {
    return request({
        url: '/admin/biz/template/info/om/update-component',
        method: 'post',
        params
    });
}

//信息屏模板-删除组件信息
export function Administration_template_info_delete_component(params) {
    return request({
        url: '/admin/biz/template/info/om/delete-component',
        method: 'post',
        params
    });
}

//信息屏模板-根据模板编码获取基础模板
export function Administration_template_info_find_by_code(params) {
    return request({
        url: '/admin/biz/template/info/om/find-by-code',
        method: 'post',
        params
    });
}

//信息屏模板-根据模板编码获取组件列表
export function Administration_template_info_find_list_by_code(params) {
    return request({
        url: '/admin/biz/template/info/om/find-list-by-code',
        method: 'get',
        params
    });
}

//信息屏模板-获取基础模板下拉列表
export function Administration_template_info_select_list(params) {
    return request({
        url: '/admin/biz/template/info/om/select-list',
        method: 'get',
        params
    });
}

// 设备管理-反寻系统

// 反寻系统列表
export function Administration_reverse_list(params) {
    return request({
        url: '/admin/biz/reverse/system/om/list',
        method: 'post',
        params
    });
}

// 新增反寻系统
export function Administration_reverse_save(params) {
    return request({
        url: '/admin/biz/reverse/system/om/save',
        method: 'post',
        params
    });
}

// 更新反寻系统
export function Administration_reverse_update(params) {
    return request({
        url: '/admin/biz/reverse/system/om/update',
        method: 'post',
        params
    });
}

// 删除反寻系统
export function Administration_reverse_delete(params) {
    return request({
        url: '/admin/biz/reverse/system/om/delete',
        method: 'post',
        params
    });
}

// 新增反寻车位
export function Administration_save_reverse_stall(params) {
    return request({
        url: '/admin/biz/reverse/system/om/save-reverse-stall',
        method: 'post',
        params
    });
}

// 更新反寻车位
export function Administration_update_reverse_stall(params) {
    return request({
        url: '/admin/biz/reverse/system/om/update-reverse-stall',
        method: 'post',
        params
    });
}


// 删除反寻车位
export function Administration_delete_reverse_stall(params) {
    return request({
        url: '/admin/biz/reverse/system/om/delete-reverse-stall',
        method: 'post',
        params
    });
}

// 反寻车位列表
export function Administration_reverse_stall_list(params) {
    return request({
        url: '/admin/biz/reverse/system/om/reverse-stall-list',
        method: 'post',
        params
    });
}

// 反寻系统开启-关闭
export function Administration_reverse_system_update_flagt(params) {
    return request({
        url: '/admin/biz/reverse/system/om/update-flag',
        method: 'get',
        params
    });
}

// 反寻车位-批量导入
export function Administration_reverse_system_batchSave(data) {
    return request({
        url: '/admin/biz/reverse/system/batchSave',
        method: 'post',
        data
    });
}

// 车场管理-场中场管理

//场中场列表
export function Administration_admin_park_floor_list(params) {
    return request({
        url: '/admin/biz/park/floor/om/list',
        method: 'post',
        params
    });
}

//场中场新增
export function Administration_admin_park_floor_save(params) {
    return request({
        url: '/admin/biz/park/floor/om/save',
        method: 'post',
        params
    });
}

//场中场编辑
export function Administration_admin_park_floor_update(params) {
    return request({
        url: '/admin/biz/park/floor/om/update',
        method: 'post',
        params
    });
}

//场中场删除
export function Administration_admin_park_floor_delete(params) {
    return request({
        url: '/admin/biz/park/floor/om/delete',
        method: 'post',
        params
    });
}


//批量导入
export function Administration_admin_park_floor_batchSave(data) {
    return request({
        url: '/admin/biz/park/floor/om/batchSave',
        method: 'post',
        data
    });
}

//场中场车位列表
export function Administration_admin_park_floor_stall_list(params) {
    return request({
        url: '/admin/biz/park/floor/om/park-floor-stall-list',
        method: 'post',
        params
    });
}

//启用-禁用
export function Administration_admin_park_floor_update_flag(params) {
    return request({
        url: '/admin/biz/park/floor/om/update-flag',
        method: 'get',
        params
    });
}

//场中场车位删除
export function Administration_admin_park_floor_delete_stall(params) {
    return request({
        url: '/admin/biz/park/floor/om/delete-park-floor-stall',
        method: 'post',
        params
    });
}

//设备管理--车场诱导屏

//车场诱导屏列表
export function Administration_admin_biz_screen_info_om_list(params) {
    return request({
        url: '/admin/biz/screen/info/om/list',
        method: 'post',
        params
    });
}


//车场诱导屏新增
export function Administration_admin_biz_screen_info_om_save(params) {
    return request({
        url: '/admin/biz/screen/info/om/save',
        method: 'post',
        params
    });
}

//车场诱导屏编辑
export function Administration_admin_biz_screen_info_om_update(params) {
    return request({
        url: '/admin/biz/screen/info/om/update',
        method: 'post',
        params
    });
}

//车场诱导屏删除（已绑定）
export function Administration_admin_biz_screen_info_om_clear_screen_info(params) {
    return request({
        url: '/admin/biz/screen/info/om/clear-screen-info',
        method: 'get',
        params
    });
}

//车场诱导屏删除（未绑定）
export function Administration_admin_biz_screen_info_om_delete_screen_info(params) {
    return request({
        url: '/admin/biz/screen/info/om/delete-screen-info',
        method: 'get',
        params
    });
}

//车场诱导屏关闭-开启
export function Administration_admin_biz_screen_info_om_update_flag(params) {
    return request({
        url: '/admin/biz/screen/info/om/update-flag',
        method: 'get',
        params
    });
}

//楼层下拉列表
export function Administration_admin_biz_park_floor_om_list(params) {
    return request({
        url: '/admin/biz/park/floor/om/floor-list',
        method: 'get',
        params
    });
}

//设备日志列表
export function Administration_admin_biz_device_log_om_list(params) {
    return request({
        url: '/admin/biz/device/log/om/list',
        method: 'post',
        params
    });
}

//设备管理-车场诱导屏分辨率下拉框
export function Administration_admin_base_dict_group_list(params) {
    return request({
        url: '/admin/base/dict/group_list',
        method: 'post',
        params
    });
}



































//模拟接口
// 车场管理列表
export function Administration_CarAdministrations_list(data) {
    return request({
        url: '/api/CarAdministrations/list',
        method: 'post',
        data
    })
}

//excel模板下载地址前缀
let excel_url = {
    excel: 'https://api.linkmoretech.cn', //线上
    //车位管理 批量导入授权
    batchSave: 'admin/biz/fixed/rent/batchSave',
    //用户管理   批量导入用户
    user_batchSave: '/admin/biz/fixed/userinfo/batchSave',
}
export default {
    excel_url: excel_url
}