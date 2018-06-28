/**
 * 角色种类: 军团长. 事业部boss 暂时模拟两个, 需要后端返回支持
 */
 export default {
   DIVISION: {  // 事业部负责人     001
     LEFT_SIDEBAR: {
       dashboard: '工作台',
       myStrategy: '军团策略',
       myArmy: '下属军团',
       dataTable: '数据报表',
       boutiqueBank: '精品库'
     },
     dashboard: 'army',
     myArmy_record: 'army',
     uniqueRouter: 'army',
     comment: true,   // 批注
     addTactics: false, // 追加策略
     remarks: false, // 备注
     publishStrategy: false, // 发布
     createAnalysisReport: false, // 创建分析报告
     editStrategy: false, // 编辑策略
     approval: false,  // 审批
     setUniqueStrategy: true,   // 设为精品
     showMeAllTabInboutiqueBankRecord: false,  // 精品库销售录音是否显示我的和全部tab切换
     createStrategy: false,   // 创建策略
     draft: false, // 草稿radio
     canscore: false, //  录音打分页是否容许操作
     // 消息中心是否显示 sop 反馈页签
     showSopInMessageCenter: true,
     // 抽查打分表不同身份是否显示我的全部维度
     showOwnOrAll: true,
     // 适用部门
     departent: true,
     // 查看图标分析
     lookChartAnalyse: true
   },
   MANAGER: {  // 军团长   002
     LEFT_SIDEBAR: {
       dashboard: '工作台',
       myStrategy: '我的策略',
       myArmy: '我的军团',
       dataTable: '数据报表',
       boutiqueBank: '精品库'
     },
     dashboard: 'army',
     myArmy_record: 'army',
     uniqueRouter: 'army',
     comment: false,  // 批注
     addTactics: true, // 追加策略
     remarks: false, // 备注
     publishStrategy: true,   // 发布
     createAnalysisReport: false,   // 创建分析报告
     editStrategy: true, // 编辑策略
     approval: false,   // 审批
     setUniqueStrategy: true,   // 设为精品
     showMeAllTabInboutiqueBankRecord: false,  // 精品库销售录音是否显示我的和全部tab切换
     createStrategy: true, // 创建策略
     draft: true, // 草稿radio
     canscore: false, //  录音打分页是否容许操作
     // 消息中心是否显示 sop 反馈页签
     showSopInMessageCenter: true,
     showOwnOrAll: true,
     // 查看图标分析
     lookChartAnalyse: true
   },
   SALE: {    //  销售主管   003
     LEFT_SIDEBAR: {
       dashboard: '工作台',
       myStrategy: '军团策略',
       myArmy: '我的军团',
       dataTable: '数据报表',
       boutiqueBank: '精品库'
     },
     dashboard: 'army',
     myArmy_record: 'army',
     uniqueRouter: 'army',
     comment: false,   // 批注
     addTactics: false, // 追加策略
     remarks: true, // 备注
     publishStrategy: false,  // 发布
     createAnalysisReport: false,  // 创建分析报告
     editStrategy: false, // 编辑策略
     approval: false,   // 审批
     setUniqueStrategy: true,   // 设为精品
     showMeAllTabInboutiqueBankRecord: false,  // 精品库销售录音是否显示我的和全部tab切换
     createStrategy: false,
     draft: false, // 草稿radio
     canscore: false, //  录音打分页是否容许操作
     // 消息中心是否显示 sop 反馈页签
     showSopInMessageCenter: true,
     showOwnOrAll: true,
     // 查看图标分析
     lookChartAnalyse: true
   },
  //  sop负责人
   SOPS: {
     LEFT_SIDEBAR: {  // sop    004
       dashboard: '工作台',
       myStrategy: '审批管理',
       myArmy: '录音管理',
       dataTable: '数据报表',
       boutiqueBank: '精品库'
     },
     dashboard: 'sop',
     myArmy_record: 'record',
     uniqueRouter: 'sop',
     comment: false,
     addTactics: false, // 追加策略
     remarks: true, // 备注
     publishStrategy: false,  // 发布
     createAnalysisReport: true, // 创建分析报告
     editStrategy: false, // 编辑策略
     approval: true,   // 审批
     setUniqueStrategy: true,   // 设为精品
     showMeAllTabInboutiqueBankRecord: true,  // 精品库销售录音是否显示我的和全部tab切换
     createStrategy: false,
     draft: false, // 草稿radio
     canscore: true, //  录音打分页是否容许操作
     // 消息中心是否显示 sop 反馈页签
     showSopInMessageCenter: true,
     showOwnOrAll: true,
     // 查看图标分析
     lookChartAnalyse: false
   },
  //  sop 专员    005
   SOP: {
     LEFT_SIDEBAR: {  // sop
       dashboard: '工作台',
       myStrategy: '审批管理',
       myArmy: '录音管理',
       dataTable: '数据报表',
       boutiqueBank: '精品库'
     },
     dashboard: 'sop',
     myArmy_record: 'record',
     uniqueRouter: 'sop',
     comment: false,  // 批注
     addTactics: false, // 追加策略
     remarks: true, // 备注
     publishStrategy: false,  // 发布
     createAnalysisReport: true, // 创建分析报告
     editStrategy: false, // 编辑策略
     approval: false,   // 审批
     setUniqueStrategy: true,   // 设为精品
     showMeAllTabInboutiqueBankRecord: true,  // 精品库销售录音是否显示我的和全部tab切换
     createStrategy: false,
     draft: false, // 草稿radio
     canscore: true, //  录音打分页是否容许操作
     // 消息中心是否显示 sop 反馈页签
     showSopInMessageCenter: true,
     showOwnOrAll: true,
     // 查看图标分析
     lookChartAnalyse: false
   },
  //  事业部 sop
   DSOP: {
     LEFT_SIDEBAR: {  // sop    006
       dashboard: '工作台',
       myStrategy: '审批管理',
       myArmy: '录音管理',
       dataTable: '数据报表',
       boutiqueBank: '精品库'
     },
     dashboard: 'sop',
     myArmy_record: 'record',
     uniqueRouter: 'sop',
     comment: false,   // 批注
     addTactics: false, // 追加策略
     remarks: true, // 备注
     publishStrategy: false,  // 发布
     createAnalysisReport: false, // 创建分析报告
     editStrategy: false, // 编辑策略
     approval: false,   // 审批
     setUniqueStrategy: true,   // 设为精品
     showMeAllTabInboutiqueBankRecord: false, // 精品库销售录音是否显示我的和全部tab切换
     createStrategy: false,
     draft: false, // 草稿radio
     canscore: false, //  录音打分页是否容许操作
     // 消息中心是否显示 sop 反馈页签
     showSopInMessageCenter: true,
     showOwnOrAll: false,
     // 查看图标分析
     lookChartAnalyse: false
   }
 }
