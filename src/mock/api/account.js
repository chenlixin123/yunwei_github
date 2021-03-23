const userDB = [{
    username: 'admin',
    password: 'admin',
    uuid: 'admin-uuid',
    info: {
        name: 'Aresn',
        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
        access: ['admin']
    }
}];

export default [{
        path: '/api/login',
        method: 'post',
        handle({
            body
        }) {
            const user = userDB.find(e => e.username === body.username && e.password === body.password);
            if (user) {
                return {
                    code: 0,
                    msg: '登录成功',
                    data: {
                        ...user,
                        token: 'A68NUPaXVBJYRStwvd9frcUn8rlf30h6'
                    }
                }
            } else {
                return {
                    code: 401,
                    msg: '用户名或密码错误',
                    data: {}
                }
            }
        }
    },
    {
        path: '/api/register',
        method: 'post',
        handle({
            body
        }) {
            return {
                code: 0,
                msg: '注册成功',
                data: {
                    username: 'admin',
                    uuid: 'admin-uuid',
                    info: {
                        name: 'Aresn',
                        avatar: 'https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar',
                        access: ['admin']
                    },
                    token: 'A68NUPaXVBJYRStwvd9frcUn8rlf30h6'
                }
            }
        }
    },
    {
        path: '/api/echarts-pie',
        method: 'get',
        handle(

        ) {
            return {
                code: 0,
                mag: '返回成功',
                data: [{
                    name: '卡车',
                    value: '430',
                    size: 80,
                    position: ["30%", "50%"]

                }, {
                    name: '轿车',
                    value: '500',
                    size: 60,
                    position: ["50%", "50%"]
                }, {
                    name: '小推车',
                    value: '800',
                    size: 80,
                    position: ["70%", "40%"]
                }]

            }
        }
    },
    {
        path: '/api/echarts',
        method: 'post',
        handle(
            body
        ) {
            // console.log(body.body)
            if (body.body == 0 || body.body == 2) {
                // console.log('等于零')
                return {
                    code: 0,
                    msg: '返回成功',
                    data: [{
                        data1: [
                            12.0,
                            14.9,
                            17.0,
                            63.2,
                            65.6,
                            116.7,
                            175.6,
                            202.2,
                            72.6,
                            60.0,
                            10.4,
                            7.3
                        ],
                        data2: [
                            6.6,
                            9.9,
                            20.0,
                            60.4,
                            88.7,
                            60.7,
                            195.6,
                            202.2,
                            148.7,
                            60.8,
                            30.0,
                            20.3
                        ],
                        data3: [
                            32.0,
                            42.2,
                            53.3,
                            64.5,
                            76.3,
                            110.2,
                            70.3,
                            60.4,
                            40.0,
                            25.5,
                            19.0,
                            3.2
                        ],
                        name: [
                            "1月",
                            "2月",
                            "3月",
                            "4月",
                            "5月",
                            "6月",
                            "7月",
                            "8月",
                            "9月",
                            "10月",
                            "11月",
                            "12月"
                        ]
                    }]
                }
            } else {
                // console.log('不等于零')
                return {
                    code: 0,
                    msg: '返回成功',
                    data: [{
                        data1: [
                            22.0,
                            34.9,
                            47.0,
                            73.2,
                            95.6,
                            166.7,
                            125.6,
                            170.2,
                            100.6,
                            90.0,
                            50.4,
                            20.3
                        ],
                        data2: [
                            16.6,
                            19.9,
                            6.0,
                            30.4,
                            58.7,
                            30.7,
                            165.6,
                            180.2,
                            110.7,
                            80.8,
                            60.0,
                            30.3
                        ],
                        data3: [
                            22.0,
                            32.2,
                            43.3,
                            54.5,
                            66.3,
                            90.2,
                            60.3,
                            30.4,
                            40.0,
                            15.5,
                            29.0,
                            10.2
                        ],
                        name: [
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                            "11",
                            "12"
                        ]
                    }]
                }
            }

        }
    },
    {
        path: '/api/search',
        method: 'post',
        handle({
            body
        }) {
            let data1 = []
            let datas = {
                total: 0,
                name: '模拟数据',
                list: [{
                    floor: 'B2层',
                    type: 2,
                    rentStatus: 1,
                    company: '小猫科技',
                    plateNos: '京A12345,冀B12345',
                    endTime: 1857225599000,
                    remainDays: '115.3月',
                    userNumber: 2,
                    stallName: 'B2-001'
                }, {
                    floor: 'B2层',
                    type: 2,
                    rentStatus: 1,
                    plateNos: '京A12345,冀B12345',
                    remainDays: '119.3月',
                    endTime: 1857223599000,
                    userNumber: 2,
                    company: '小猫科技',
                    stallName: 'B2-002'
                }, {
                    floor: 'B2层',
                    type: 0,
                    rentStatus: 1,
                    company: '小猫科技',
                    stallName: 'B2-003'
                }, {
                    floor: 'B2层',
                    type: 0,
                    rentStatus: 1,
                    company: '小猫科技',
                    stallName: 'B2-004'
                }, {
                    floor: 'B2层',
                    type: 0,
                    rentStatus: 1,
                    company: '小猫科技',
                    stallName: 'B2-005'
                }, {
                    floor: 'B2层',
                    type: 2,
                    rentStatus: 2,
                    plateNos: '',
                    company: '',
                    stallName: 'B2-006'
                }, {
                    floor: 'B2层',
                    type: 0,
                    rentStatus: 2,
                    company: '',
                    stallName: 'B2-007'
                }, {
                    floor: 'B2层',
                    type: 2,
                    rentStatus: 3,
                    plateNos: '京A888888,冀B888888',
                    endTime: 1057225599000,
                    remainDays: '0月',
                    userNumber: 3,
                    company: '猫猫在线',
                    stallName: 'B2-008'
                }, {
                    floor: 'B2层',
                    type: 2,
                    rentStatus: 3,
                    plateNos: '京A888888,冀B888888',
                    endTime: 1157225599000,
                    remainDays: '0月',
                    userNumber: 3,
                    company: '猫猫在线',
                    stallName: 'B2-009'
                }, {
                    floor: 'B2层',
                    type: 2,
                    rentStatus: 3,
                    plateNos: '京A888888,冀B888888',
                    remainDays: '0月',
                    userNumber: 2,
                    endTime: 1057225599000,
                    company: '猫猫在线',
                    stallName: 'B2-010'
                }, {
                    floor: 'B2层',
                    type: 2,
                    rentStatus: 3,
                    plateNos: '京A888888,冀B888888',
                    remainDays: '0月',
                    endTime: 1057225599000,
                    userNumber: 5,
                    company: '猫猫在线',
                    stallName: 'B2-011'
                }, {
                    floor: 'B2层',
                    type: 2,
                    rentStatus: 3,
                    plateNos: '京A888888,冀B888888',
                    endTime: 1057225599000,
                    remainDays: '0月',
                    userNumber: 6,
                    company: '不加班有限公司',
                    stallName: 'B2-012'
                }, {
                    floor: 'B2层',
                    type: 2,
                    rentStatus: 3,
                    plateNos: '京A888888,冀B888888',
                    endTime: 1057225599000,
                    remainDays: '0月',
                    userNumber: 9,
                    company: '不加班有限公司',
                    stallName: 'B2-013'
                }, {
                    floor: 'B2层',
                    type: 2,
                    rentStatus: 3,
                    plateNos: '京A888888,冀B888888',
                    endTime: 1057225599000,
                    remainDays: '0月',
                    userNumber: 2,
                    company: '不加班有限公司',
                    stallName: 'B2-014'
                }, {
                    floor: 'B2层',
                    type: 0,
                    rentStatus: 3,
                    company: '不加班有限公司',
                    stallName: 'B2-015'
                }, {
                    floor: 'B2层',
                    type: 0,
                    rentStatus: 4,
                    company: '不加班有限公司',
                    stallName: 'B2-016'
                }, {
                    floor: 'B2层',
                    type: 0,
                    rentStatus: 4,
                    company: '不加班有限公司',
                    stallName: 'B2-017'
                }, {
                    floor: 'B2层',
                    type: 0,
                    rentStatus: 4,
                    company: '不加班有限公司',
                    stallName: 'B2-018'
                }, {
                    floor: 'B2层',
                    type: 0,
                    rentStatus: 4,
                    company: '不加班有限公司',
                    stallName: 'B2-019'
                }, {
                    floor: 'B2层',
                    type: 0,
                    rentStatus: 4,
                    company: '吃土专员',
                    stallName: 'B2-020'
                }, {
                    floor: 'B3层',
                    type: 0,
                    rentStatus: 4,
                    company: '吃土专员',
                    stallName: 'B3-021'
                }, {
                    floor: 'B3层',
                    type: 0,
                    rentStatus: 4,
                    company: '吃土专员',
                    stallName: 'B3-022'
                }, {
                    floor: 'B3层',
                    type: 0,
                    rentStatus: 4,
                    company: '吃土专员',
                    stallName: 'B3-023'
                }, {
                    floor: 'B3层',
                    type: 0,
                    rentStatus: 4,
                    company: '吃土专员',
                    stallName: 'B3-024'
                }, {
                    floor: 'B3层',
                    type: 0,
                    rentStatus: 4,
                    company: '吃土专员',
                    stallName: 'B3-025'
                }, {
                    floor: 'B3层',
                    type: 0,
                    rentStatus: 2,
                    company: '',
                    stallName: 'B3-026'
                }, {
                    floor: 'B3层',
                    type: 0,
                    rentStatus: 2,
                    stallName: 'B3-027'
                }, {
                    floor: 'B3层',
                    type: 0,
                    rentStatus: 2,
                    stallName: 'B3-028'
                }, {
                    floor: 'B3层',
                    type: 0,
                    rentStatus: 2,
                    stallName: 'B3-029'
                }, {
                    floor: 'B3层',
                    type: 0,
                    rentStatus: 2,
                    stallName: 'B3-030'
                }, {
                    floor: 'B3层',
                    type: 2,
                    rentStatus: 2,
                    plateNos: '',
                    stallName: 'B3-031'
                }, {
                    floor: 'B3层',
                    type: 2,
                    rentStatus: 2,
                    plateNos: '',
                    stallName: 'B3-032'
                }, {
                    floor: 'B3层',
                    type: 2,
                    rentStatus: 2,
                    plateNos: '',
                    stallName: 'B3-033'
                }, {
                    floor: 'B3层',
                    type: 2,
                    rentStatus: 2,
                    plateNos: '',
                    stallName: 'B3-034'
                }, {
                    floor: 'B3层',
                    type: 2,
                    rentStatus: 2,
                    plateNos: '',
                    stallName: 'B3-035'
                }, {
                    floor: 'B3层',
                    type: 2,
                    rentStatus: 2,
                    plateNos: '',
                    stallName: 'B3-036'
                }, {
                    floor: 'B3层',
                    type: 2,
                    rentStatus: 2,
                    plateNos: '',
                    stallName: 'B3-037'
                }, {
                    floor: 'B3层',
                    type: 2,
                    rentStatus: 2,
                    plateNos: '',
                    stallName: 'B3-038'
                }, {
                    floor: 'B3层',
                    type: 2,
                    rentStatus: 1,
                    plateNos: '京A666666,冀B666666',
                    endTime: 1857225599000,
                    remainDays: '1119.3月',
                    userNumber: 3,
                    company: '吃土专员',
                    stallName: 'B3-039'
                }, {
                    floor: 'B3层',
                    type: 2,
                    rentStatus: 1,
                    plateNos: '京A666666,冀B666666',
                    endTime: 3857225599000,
                    remainDays: '3119.3月',
                    userNumber: 3,
                    company: '吃土专员',
                    stallName: 'B3-040'
                }]
            }
            if (body.filterJson) {
                body.filterJson.filters.map((res, index) => {
                    if (res.property == 'floor') {
                        let ss = []
                        let dd = true
                        datas.list.map((item, index) => {
                            if (item.floor == res.value) {
                                dd = false
                                ss.push(item)
                                datas.list = ss
                            }
                        })
                        if (dd == true) {
                            datas.list = []
                        }
                    }
                    if (res.property == 'stallName') {
                        let ss = []
                        let dd = true
                        datas.list.map((item, index) => {
                            if (item.stallName == res.value) {
                                dd = false
                                ss.push(item)
                                datas.list = ss
                            }
                        })
                        if (dd == true) {
                            datas.list = []
                        }
                    }
                    if (res.property == 'type') {
                        let ss = []
                        let dd = true
                        datas.list.map((item, index) => {
                            if (item.type == res.value) {
                                dd = false
                                ss.push(item)
                                datas.list = ss
                            }
                        })
                        if (dd == true) {
                            datas.list = []
                        }
                    }
                    if (res.property == 'rentStatus') {
                        let ss = []
                        let dd = true
                        datas.list.map((item, index) => {
                            if (item.rentStatus == res.value) {
                                dd = false
                                ss.push(item)
                                datas.list = ss
                            }
                        })
                        if (dd == true) {
                            datas.list = []
                        }
                    }
                    if (res.property == 'rentStatus') {
                        let ss = []
                        let dd = true
                        datas.list.map((item, index) => {
                            if (item.rentStatus == res.value) {
                                dd = false
                                ss.push(item)
                                datas.list = ss
                            }
                        })
                        if (dd == true) {
                            datas.list = []
                        }
                    }
                })
                for (let i = 0; i < datas.list.length; i++) {
                    if (body.start <= i && (body.start + body.pageSize) > i) {
                        data1.push(datas.list[i])
                    }
                }
                datas.total = datas.list.length
                datas.list = data1
                return {
                    code: 0,
                    msg: '搜索成功',
                    data: datas
                }

            } else {
                for (let i = 0; i < datas.list.length; i++) {
                    if (body.start <= i && (body.start + body.pageSize) > i) {
                        data1.push(datas.list[i])
                    }
                }
                datas.total = datas.list.length
                datas.list = data1
                return {
                    code: 0,
                    msg: '搜索成功',
                    data: datas
                }
            }

        }
    },
    {
        path: '/api/CarAdministrations/list',
        method: 'post',
        handle({
            body
        }) {
            console.log(body)
            let data1 = []
            let datas = {
                total: 0,
                name: '模拟数据',
                list: [{
                        carname: 'SOHO尚都',
                        type: 1,
                        floor: 3,
                        vehicle_number: 20,
                        car_total: 657,
                        Administration_number: 400,
                        top_down: 1,
                        plan: 1,
                        three_dimensional: 1,
                        app: 1,
                        navigation: 1,
                        induction_screen: 1,
                        appointment: 1,
                        share: 1,
                        surplus: '80天',
                        switch: true
                    }, {
                        carname: 'JW万豪酒店',
                        type: 2,
                        floor: 2,
                        vehicle_number: 60,
                        car_total: 500,
                        Administration_number: 500,
                        top_down: 0,
                        plan: 0,
                        three_dimensional: 0,
                        app: 0,
                        navigation: 1,
                        induction_screen: 1,
                        appointment: 1,
                        share: 1,
                        surplus: '100天',
                        switch: true
                    },
                    {
                        carname: '嘉里中心',
                        type: 1,
                        floor: 4,
                        vehicle_number: 20,
                        car_total: 707,
                        Administration_number: 600,
                        top_down: 0,
                        plan: 0,
                        three_dimensional: 0,
                        app: 1,
                        navigation: 1,
                        induction_screen: 1,
                        appointment: 1,
                        share: 2,
                        surplus: '230天',
                        switch: false
                    },
                    {
                        carname: '国贸中心',
                        type: 1,
                        floor: 3,
                        vehicle_number: 20,
                        car_total: 657,
                        Administration_number: 400,
                        top_down: 1,
                        plan: 1,
                        three_dimensional: 1,
                        app: 1,
                        navigation: 0,
                        induction_screen: 0,
                        appointment: 0,
                        share: 0,
                        surplus: '150天',
                        switch: true
                    }
                ]
            }
            if (body.filterJson) {
                body.filterJson.filters.map((res, index) => {
                    if (res.property == "carname") {
                        let ss = []
                        let dd = true
                        datas.list.map((item, index) => {
                            if (item.carname == res.value) {
                                dd = false
                                ss.push(item)
                                datas.list = ss
                            }
                        })
                        if (dd == true) {
                            datas.list = []
                        }
                    }
                    if (res.property == 'data1') {
                        let ss = []
                        let dd = true
                        datas.list.map((item, index) => {
                            if (item.three_dimensional == 1) {
                                dd = false
                                ss.push(item)
                                datas.list = ss
                            }
                        })
                        if (dd == true) {
                            datas.list = []
                        }
                    }
                    if (res.property == 'data2') {
                        let ss = []
                        let dd = true
                        datas.list.map((item, index) => {
                            if (item.app == 1) {
                                dd = false
                                ss.push(item)
                                datas.list = ss
                            }
                        })
                        if (dd == true) {
                            datas.list = []
                        }
                    }

                    if (res.property == 'data3') {
                        let ss = []
                        let dd = true
                        datas.list.map((item, index) => {
                            if (item.navigation == 1) {
                                dd = false
                                ss.push(item)
                                datas.list = ss
                            }
                        })
                        if (dd == true) {
                            datas.list = []
                        }
                    }

                    if (res.property == 'data4') {
                        let ss = []
                        let dd = true
                        datas.list.map((item, index) => {
                            if (item.induction_screen == 1) {
                                dd = false
                                ss.push(item)
                                datas.list = ss
                            }
                        })
                        if (dd == true) {
                            datas.list = []
                        }
                    }
                    if (res.property == 'data5') {
                        let ss = []
                        let dd = true
                        datas.list.map((item, index) => {
                            if (item.appointment == 1) {
                                dd = false
                                ss.push(item)
                                datas.list = ss
                            }
                        })
                        if (dd == true) {
                            datas.list = []
                        }
                    }

                    if (res.property == 'data6') {
                        let ss = []
                        let dd = true
                        datas.list.map((item, index) => {
                            if (item.share == 1) {
                                dd = false
                                ss.push(item)
                                datas.list = ss
                            }
                        })
                        if (dd == true) {
                            datas.list = []
                        }
                    }

                })
                for (let i = 0; i < datas.list.length; i++) {
                    if (body.start <= i && (body.start + body.pageSize) > i) {
                        data1.push(datas.list[i])
                    }
                }
                datas.total = datas.list.length
                datas.list = data1
                return {
                    code: 0,
                    msg: '搜索成功',
                    data: datas
                }

            } else {
                for (let i = 0; i < datas.list.length; i++) {
                    if (body.start <= i && (body.start + body.pageSize) > i) {
                        data1.push(datas.list[i])
                    }
                }
                datas.total = datas.list.length
                datas.list = data1
                return {
                    code: 0,
                    msg: '搜索成功',
                    data: datas
                }
            }

        }
    }
]