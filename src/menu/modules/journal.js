const pre = '/Journal/';

export default {
    path: '/Journal',
    title: '日志',
    header: 'system',
    icon: 'md-document',
    children: [{
            path: `${pre}Car_journal`,
            hideSider: true,
            title: '车位日志'
        },
        {
            path: `${pre}system_journal`,
            hideSider: true,
            title: '系统日志',
        },
    ]

}