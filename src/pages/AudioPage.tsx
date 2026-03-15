import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faDownload, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

interface AudioItem {
  id: number;
  title: string;
  category: string;
  duration: string;
  src: string;
}

const categories = [
  { id: 1, name: "全部" },
  { id: 2, name: "哟噢调" },
  { id: 3, name: "呀妹调" },
  { id: 4, name: "大山调" },
  { id: 5, name: "流水调" },
  { id: 6, name: "老调" },
  { id: 7, name: "女声" },
];

const defaultAudioItems: AudioItem[] = [
  // 戴亨莲
  { id: 1, title: '五月丹阳阴阴天', category: '老调', duration: '戴亨莲', src: `${process.env.PUBLIC_URL}/audio/daihenglian/wuyuedanyangyinyintian_laotiao.wav` },
  { id: 2, title: '你要唱就哎唱山歌', category: '老调', duration: '戴亨莲', src: `${process.env.PUBLIC_URL}/audio/daihenglian/niyaochangjiuaichangshange_laotiao.wav` },
  { id: 3, title: '山歌越唱越好听', category: '大山调', duration: '戴亨莲', src: `${process.env.PUBLIC_URL}/audio/daihenglian/shangeyuechangyuehaoting_dashantiao.wav` },
  { id: 4, title: '山魂', category: '哟噢调', duration: '戴亨莲', src: `${process.env.PUBLIC_URL}/audio/daihenglian/shanhun_yootiao.wav` },
  { id: 5, title: '打双麻窝送情哥', category: '流水调', duration: '戴亨莲', src: `${process.env.PUBLIC_URL}/audio/daihenglian/dashuangmawosongqingge_liushuitiao.wav` },
  { id: 6, title: '新打磨子槽对槽', category: '呀妹调', duration: '戴亨莲', src: `${process.env.PUBLIC_URL}/audio/daihenglian/xindamozicaoduicao_yamei.wav` },
  { id: 7, title: '神仙也看不透', category: '女声', duration: '戴亨莲', src: `${process.env.PUBLIC_URL}/audio/daihenglian/shenxianyekanbutou_nvsheng.wav` },

  // 杨建
  { id: 8, title: '三尺讲台', category: '哟噢调', duration: '杨建', src: `${process.env.PUBLIC_URL}/audio/yangjian/sanchijiangtai_yootiao.wav` },
  { id: 9, title: '哟噢调旋律', category: '哟噢调', duration: '杨建', src: `${process.env.PUBLIC_URL}/audio/yangjian/yootiaoxuanlv.wav` },
  { id: 10, title: '哥在窗前学鸟叫', category: '哟噢调', duration: '杨建', src: `${process.env.PUBLIC_URL}/audio/yangjian/gezaichuangqianxueniaojiao_yootiao.wav` },
  { id: 11, title: '大山调旋律', category: '大山调', duration: '杨建', src: `${process.env.PUBLIC_URL}/audio/yangjian/dashantiaoxuanlv.wav` },
  { id: 12, title: '天上落雨瓦沟流', category: '哟噢调', duration: '杨建', src: `${process.env.PUBLIC_URL}/audio/yangjian/tianshangluoyuwagouliu_yootiao.wav` },
  { id: 13, title: '山歌越唱越好听', category: '大山调', duration: '杨建', src: `${process.env.PUBLIC_URL}/audio/yangjian/shangeyuechangyuehaoting_dashantiao.wav` },
  { id: 14, title: '打双麻窝送情哥', category: '流水调', duration: '杨建', src: 'audio/yangjian/dashuangmawosongqingge_liushui.wav' },
  { id: 15, title: '拉木山歌（拉木号子）', category: '哟噢调', duration: '杨建', src: `${process.env.PUBLIC_URL}/audio/yangjian/lamushangelamuhaozi_yootiao.wav` },
  { id: 16, title: '流水调旋律', category: '流水调', duration: '杨建', src: `${process.env.PUBLIC_URL}/audio/yangjian/liushuitiaoxuanlv.wav` },
  { id: 17, title: '牙妹调旋律', category: '呀妹调', duration: '杨建', src: `${process.env.PUBLIC_URL}/audio/yangjian/yameitiaoxuanlv.wav` },
  { id: 18, title: '神仙也猜不透', category: '男声', duration: '杨建', src: `${process.env.PUBLIC_URL}/audio/yangjian/shenxianyecaibutou_nansheng.wav` },
  { id: 19, title: '老调旋律', category: '老调', duration: '杨建', src: `${process.env.PUBLIC_URL}/audio/yangjian/laotiaoxuanlv.wav` },
  { id: 20, title: '西岭背二哥', category: '呀妹调', duration: '杨建', src: `${process.env.PUBLIC_URL}/audio/yangjian/xilingbeierge_yameitiao.wav` },
  { id: 21, title: '风声雨声读书声', category: '呀妹调', duration: '杨建', src: `${process.env.PUBLIC_URL}/audio/yangjian/fengshengyushengdushusheng_yamei.wav` },
  { id: 22, title: '高山顶上摘黄杨', category: '哟噢调', duration: '杨建', src: `${process.env.PUBLIC_URL}/audio/yangjian/gaoshandingshangzhaihuangyang_yoo.wav` },

  // 罗华莉
  { id: 23, title: '唱起山歌有精神', category: '哟噢调', duration: '罗华莉', src: `${process.env.PUBLIC_URL}/audio/luohuali/changqishangeyoujingshen_yootiao.wav` },
  { id: 24, title: '山歌越唱越好听', category: '大山调', duration: '罗华莉', src: `${process.env.PUBLIC_URL}/audio/luohuali/shangeyuechangyuehaoting_dashantiao.wav` },
  { id: 25, title: '山魂', category: '哟噢调', duration: '罗华莉', src: `${process.env.PUBLIC_URL}/audio/luohuali/shanhun_yootiao.wav` },
  { id: 26, title: '新打磨子槽对槽', category: '呀妹调', duration: '罗华莉', src: `${process.env.PUBLIC_URL}/audio/luohuali/xindamozicaoduicao_yamei.wav` },

  // 罗教军
  { id: 27, title: '中央文件是真经', category: '哟噢调', duration: '罗教军', src: `${process.env.PUBLIC_URL}/audio/luojiaojun/zhongyangwenjianshizhenjing_yootiaojiexuan.wav` },
  { id: 28, title: '唱起山歌有精神', category: '哟噢调', duration: '罗教军', src: `${process.env.PUBLIC_URL}/audio/luojiaojun/changqishangeyoujingshen_yootiao.wav` },
  { id: 29, title: '新打磨子槽对槽', category: '呀妹调', duration: '罗教军', src: `${process.env.PUBLIC_URL}/audio/luojiaojun/xindamozicaoduicao_yamei.wav` },


  {
    id: 30,
    title: "一把明珠撒窗外",
    category: "",
    duration: "张元生",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/yibamingzhusachuangwai_zhangyuansheng.wav`
  },
  {
    id: 31,
    title: "五月端阳阴阴天",
    category: "牙儿调",
    duration: "合唱",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/wuyueduanyangyinyintian_yaertiao_hechang.wav`
  },
  {
    id: 32,
    title: "五月端阳阴阴天（合唱片段）",
    category: "",
    duration: "",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/wuyueduanyangyinyintianhechangpianduan.wav`
  },
  {
    id: 33,
    title: "五月端阳阴阴天（女声大合唱）",
    category: "哟噢调",
    duration: "",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/wuyueduanyangyinyintiannvshengdahechang_yootiao.wav`
  },
  {
    id: 34,
    title: "人人开心享太平",
    category: "哟噢调",
    duration: "郑地莲",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/renrenkaixinxiangtaiping_yootiao_zhengdilian.wav`
  },
  {
    id: 35,
    title: "你唱山歌我没来",
    category: "老调",
    duration: "幸章传",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/nichangshangewomeilai_laotiao_xingzhangchuan.wav`
  },
  {
    id: 36,
    title: "你要唱就唱山歌",
    category: "老调",
    duration: "张丽燕",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/niyaochangjiuchangshange_laotiao_zhangliyan.wav`
  },
  {
    id: 37,
    title: "再苦再累也受活",
    category: "哟噢+牙妹",
    duration: "合唱",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/zaikuzaileiyeshouhuo_yooyamei_hechang.wav`
  },
  {
    id: 38,
    title: "唱起山歌有精神",
    category: "吆噢调",
    duration: "张道玉",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/yaootiaochangqishangeyoujingshenzhangdaoyu.WAV`
  },
  {
    id: 39,
    title: "听说唐王坝有神仙",
    category: "哟噢调",
    duration: "张丽燕",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/tingshuotangwangbayoushenxian_yootiao_zhangliyan.wav`
  },
  {
    id: 40,
    title: "哥是天上一条龙",
    category: "哟噢+牙妹",
    duration: "合唱",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/geshitianshangyitiaolong_yooyamei_hechang.wav`
  },
  {
    id: 41,
    title: "哥是天上一条龙",
    category: "哟噢调",
    duration: "对唱",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/geshitianshangyitiaolong_yootiao_duichang.wav`
  },
  {
    id: 42,
    title: "哥的话儿光日白（日白歌）",
    category: "",
    duration: "合唱",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/gedehuaerguangribairibaige_hechang.wav`
  },
  {
    id: 43,
    title: "唱起山歌有精神",
    category: "哟噢调",
    duration: "张丽燕",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/changqishangeyoujingshen_yootiao_zhangliyan.wav`
  },
  {
    id: 44,
    title: "唱起山歌有精神",
    category: "哟噢调",
    duration: "张元生",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/changqishangeyoujingshen_yootiao_zhangyuansheng.wav`
  },
  {
    id: 45,
    title: "唱起山歌有精神",
    category: "哟噢调",
    duration: "王霞",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/changqishangeyoujingshen_yootiao_wangxia.wav`
  },
  {
    id: 46,
    title: "唱起山歌有精神",
    category: "牙妹调",
    duration: "郑地莲",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/changqishangeyoujingshen_yameitiao_zhengdilian_.wav`
  },
  {
    id: 47,
    title: "天上月儿明亮亮",
    category: "哟噢调",
    duration: "对唱",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/tianshangyueermingliangliang_yootiao_duichang.wav`
  },
  {
    id: 48,
    title: "天上落雨我不愁",
    category: "哟噢调",
    duration: "张元生",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/tianshangluoyuwobuchou_yootiao_zhangyuansheng.wav`
  },
  {
    id: 49,
    title: "天上落雨瓦沟流",
    category: "哟噢调",
    duration: "张丽燕",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/tianshangluoyuwagouliu_yootiao_zhangliyan.wav`
  },
  {
    id: 50,
    title: "太阳落山要滚岩",
    category: "老调",
    duration: "张丽燕",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/taiyangluoshanyaogunyan_laotiao_zhangliyan.wav`
  },
  {
    id: 51,
    title: "尖山山斗斗崖",
    category: "流水调",
    duration: "张元生",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/jianshanshandoudouya_liushuitiao_zhangyuansheng.wav`
  },
  {
    id: 52,
    title: "山歌唱了几十年",
    category: "老调",
    duration: "任绍荣",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/shangechanglejishinian_laotiao_renshaorong.wav`
  },
  {
    id: 53,
    title: "山歌越唱越好听",
    category: "大山调",
    duration: "任绍荣",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/shangeyuechangyuehaoting_dashantiao_renshaorong.wav`
  },
  {
    id: 54,
    title: "山歌越唱越好听",
    category: "大山调",
    duration: "张元生",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/shangeyuechangyuehaoting_dashantiao_zhangyuansheng.wav`
  },
  {
    id: 55,
    title: "山歌越唱越好听",
    category: "大山调",
    duration: "李从文",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/shangeyuechangyuehaoting_dashantiao_licongwen.wav`
  },
  {
    id: 56,
    title: "山魂",
    category: "",
    duration: "年轻",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/shanhun_nianqing.wav`
  },
  {
    id: 57,
    title: "山魂",
    category: "",
    duration: "王霞",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/shanhun_wangxia.wav`
  },
  {
    id: 58,
    title: "当年红军来西岭",
    category: "",
    duration: "李媛莉",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/dangnianhongjunlaixiling_liyuanli_.wav`
  },
  {
    id: 59,
    title: "当年红军来还山",
    category: "哟噢调",
    duration: "",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/dangnianhongjunlaihuanshan_yootiao.wav`
  },
  {
    id: 60,
    title: "情歌对唱",
    category: "哟噢调",
    duration: "张丽燕",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/qinggeduichang_yootiao_zhangliyan.wav`
  },
  {
    id: 61,
    title: "情歌对唱 山对山崖对崖",
    category: "",
    duration: "对唱",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/qinggeduichang_shanduishanyaduiya_duichang.wav`
  },
  {
    id: 62,
    title: "打双麻窝送情哥",
    category: "流水调",
    duration: "幸章传",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/dashuangmawosongqingge_liushuitiao_xingzhangchuan.wav`
  },
  {
    id: 63,
    title: "打双麻窝送情哥",
    category: "流水调",
    duration: "张元生",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/dashuangmawosongqingge_liushuitiao_zhangyuansheng_.wav`
  },
  {
    id: 64,
    title: "把酒欢歌",
    category: "新山歌",
    duration: "李媛莉",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/bajiuhuange_xinshange_liyuanli.wav`
  },
  {
    id: 65,
    title: "拉木头",
    category: "老调",
    duration: "李从文",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/lamutou_laotiao_licongwen.wav`
  },
  {
    id: 66,
    title: "收工回家",
    category: "流水调",
    duration: "幸章传",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/shougonghuijia_liushuitiao_xingzhangchuan.wav`
  },
  {
    id: 67,
    title: "新打磨子槽对槽",
    category: "",
    duration: "合唱",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/xindamozicaoduicao_hechang.wav`
  },
  {
    id: 68,
    title: "新打磨子槽对槽",
    category: "牙妹",
    duration: "任绍荣",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/xindamozicaoduicao_yamei_renshaorong.wav`
  },
  {
    id: 69,
    title: "月亮昏昏月亮明",
    category: "",
    duration: "张元生",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/yuelianghunhunyueliangming_zhangyuansheng.wav`
  },
  {
    id: 70,
    title: "横山农民丘朝先",
    category: "牙妹调",
    duration: "李从文",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/hengshannongminqiuzhaoxian_licongwen_yameitiao.wav`
  },
  {
    id: 71,
    title: "水有源头树有根",
    category: "哟噢调",
    duration: "张丽燕",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/shuiyouyuantoushuyougen_yootiao_zhangliyan.wav`
  },
  {
    id: 72,
    title: "玉米馍馍包猪油",
    category: "哟噢调",
    duration: "张丽燕",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/yumimomobaozhuyou_yootiao_zhangliyan.wav`
  },
  {
    id: 73,
    title: "玉米馍馍包猪油",
    category: "哟噢调",
    duration: "郑地莲",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/yumimomobaozhuyou_yootiao_zhengdilian.wav`
  },
  {
    id: 74,
    title: "甩块石头试水深",
    category: "牙妹调",
    duration: "对唱",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/shuaikuaishitoushishuishen_yameitiao_duichang.wav`
  },
  {
    id: 75,
    title: "百年华诞感党恩",
    category: "哟噢调",
    duration: "张丽燕",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/bainianhuadangandangen_yootiao_zhangliyan.wav`
  },
  {
    id: 76,
    title: "红军不怕远征难",
    category: "哟噢",
    duration: "李从文",
    src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/hongjunbupayuanzhengnan_yoo_licongwen.wav`
  },
    
  {
      id: 77,
      title: "红嘴鸳鸯",
      category: "牙儿调",
      duration: "合唱",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/hongzuiyuanyang_yaertiao_hechang.wav`
    },
    {
      id: 78,
      title: "绝句（两个黄鹂鸣翠柳）",
      category: "牙妹调",
      duration: "郑地莲",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/juejulianggehuanglimingcuiliu_yameitiao_zhengdilian.wav`
    },
    {
      id: 79,
      title: "绣双花鞋送情哥",
      category: "哟噢调",
      duration: "幸章传",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/xiushuanghuaxiesongqingge_yootiao_xingzhangchuan.wav`
    },
    {
      id: 80,
      title: "五月五是端阳",
      category: "老调",
      duration: "张道玉",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/laotiaowuyuewushiduanyangzhangdaoyu.WAV`
    },
    {
      id: 81,
      title: "太阳出来照红崖",
      category: "老调",
      duration: "张道玉",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/laotiaotaiyangchulaizhaohongyazhangdaoyu.WAV`
    },
    {
      id: 82,
      title: "西岭山下闪星星",
      category: "",
      duration: "张丽燕",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/xilingshanxiashanxingxing_zhangliyan.wav`
    },
    {
      id: 83,
      title: "西岭山歌唱得怪",
      category: "哟噢调",
      duration: "",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/xilingshangechangdeguai_yootiao_.wav`
    },
    {
      id: 84,
      title: "西岭山歌唱起来",
      category: "哟噢",
      duration: "张丽燕",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/xilingshangechangqilai_yoo_zhangliyan.wav`
    },
    {
      id: 85,
      title: "西岭山歌美名扬",
      category: "牙妹调",
      duration: "张丽燕",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/xilingshangemeimingyang_yameitiao_zhangliyan.wav`
    },
    {
      id: 86,
      title: "西岭背二哥",
      category: "",
      duration: "对唱",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/xilingbeierge_duichang.wav`
    },
    {
      id: 87,
      title: "西岭背二哥",
      category: "",
      duration: "男女对唱",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/xilingbeierge_nannvduichang.wav`
    },
    {
      id: 88,
      title: "西岭雪山一手多",
      category: "哟噢调",
      duration: "张元生",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/xilingxueshanyishouduo_yootiao_zhangyuansheng.wav`
    },
    {
      id: 89,
      title: "西岭雪山是灵山",
      category: "牙妹调",
      duration: "李媛莉",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/xilingxueshanshilingshan_yameitiao_liyuanli.wav`
    },
    {
      id: 90,
      title: "西岭雪山最迷人",
      category: "哟噢调",
      duration: "张秀丽",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/xilingxueshanzuimiren_yootiao_zhangxiuli.wav`
    },
    {
      id: 91,
      title: "西岭雪山歌声扬",
      category: "哟噢调",
      duration: "幸章传",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/xilingxueshangeshengyang_yootiao_xingzhangchuan.wav`
    },
    {
      id: 92,
      title: "野鸡叫唤惊抓抓",
      category: "哟噢调",
      duration: "郑地莲",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/yejijiaohuanjingzhuazhua_yootiao_zhengdilian.wav`
    },
    {
      id: 93,
      title: "阳雀叫唤向喊天",
      category: "哟噢",
      duration: "合唱",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/yangquejiaohuanxianghantian_yoo_hechang.wav`
    },
    {
      id: 94,
      title: "阳雀叫唤嘴朝天",
      category: "哟噢调",
      duration: "张丽燕",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/yangquejiaohuanzuizhaotian_yootiao_zhangliyan.wav`
    },
    {
      id: 95,
      title: "阳雀叫唤声连声",
      category: "哟噢调",
      duration: "张元生",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/yangquejiaohuanshengliansheng_yootiao_zhangyuansheng.wav`
    },
    {
      id: 96,
      title: "阳雀叫唤山汪汪",
      category: "牙妹调",
      duration: "郑地莲",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/yangquejiaohuanshanwangwang_yameitiao_zhengdilian.wav`
    },
    {
      id: 97,
      title: "阳雀翻山远传名",
      category: "牙妹调",
      duration: "对唱",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/yangquefanshanyuanchuanming_yameitiao_duichang.wav`
    },
    {
      id: 98,
      title: "隔河望见扫穿青",
      category: "牙妹调",
      duration: "张丽燕",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/gehewangjiansaochuanqing_yameitiao_zhangliyan.wav`
    },
    {
      id: 99,
      title: "风声雨声读书声",
      category: "牙妹调",
      duration: "张丽燕",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/fengshengyushengdushusheng_yameitiao_zhangliyan.wav`
    },
    {
      id: 100,
      title: "高山顶上一座堂",
      category: "老调",
      duration: "任绍蓉",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/gaoshandingshangyizuotang_laotiao_renshaorong.wav`
    },
    {
      id: 101,
      title: "高山顶上栽黄杨",
      category: "哟噢调",
      duration: "合唱",
      src: `${process.env.PUBLIC_URL}/audio/xilingshangeluyin_20257.15 西岭镇文化站/gaoshandingshangzaihuangyang_yootiao_hechang.wav`
    }
];
const AudioPage = () => {
  const [audios, setAudios] = useState<AudioItem[]>(defaultAudioItems);
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  // 上传音频处理
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      const newAudio: AudioItem = {
        id: audios.length + 1,
        title: file.name,
        category: '用户上传',
        duration: '--:--',
        src: url,
      };
      setAudios([newAudio, ...audios]);
    }
  };

  // 分类筛选
  const filteredAudios = selectedCategory === '全部'
    ? audios
    : audios.filter(audio => audio.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 版头 */}
      <header className="bg-primary text-white py-4 shadow">
        <div className="max-w-5xl mx-auto flex items-center">
          <FontAwesomeIcon icon={faMusic} className="text-2xl mr-3" />
          <span className="text-xl font-bold">西岭音频资料库</span>
        </div>
      </header>

      {/* 主体内容 */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4">
        <div className="flex items-center mb-8 mt-8">
          <FontAwesomeIcon icon={faMusic} className="text-primary text-2xl mr-3" />
          <h2 className="text-2xl md:text-3xl font-bold">音频资料</h2>
        </div>

        {/* 上传音频 */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">上传音频（仅本地预览）:</label>
          <input
            type="file"
            accept=".wav"
            onChange={handleUpload}
            className="block"
          />
        </div>

        {/* 分类按钮 */}
        <div className="mb-6 flex space-x-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === cat.name ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors duration-200 whitespace-nowrap`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 搜索栏 */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              placeholder="搜索音频..."
              // 可扩展搜索功能
            />
          </div>
        </div>

        {/* 音频列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAudios.map((audio) => (
            <div key={audio.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <FontAwesomeIcon icon={faMusic} className="text-xl" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold">{audio.title}</h3>
                    <p className="text-sm text-gray-500">{audio.category}</p>
                  </div>
                </div>
                <audio controls className="w-full mt-2">
                  <source src={audio.src} type="audio/wav" />
                  您的浏览器不支持音频播放。
                </audio>


                <div className="flex justify-between mt-4 text-sm">
                  <span className="text-gray-500">
                    <FontAwesomeIcon icon={faUser} className="mr-1" /> {audio.duration}
                  </span>
                  <button
                    type="button"
                    className="text-primary hover:underline flex items-center"
                    onClick={() => {
                      // 下载逻辑
                      if (audio.src && audio.src !== '#') {
                        const link = document.createElement('a');
                        link.href = audio.src;
                        link.download = audio.title;
                        link.click();
                      }
                    }}
                    aria-label="下载"
                  >
                    <FontAwesomeIcon icon={faDownload} className="mr-1" /> 下载
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 页尾 */}
      <footer className="bg-primary text-white py-4 mt-8">
        <div className="max-w-5xl mx-auto text-center text-sm">
          © 2025 西岭音频资料库 | 版权所有
        </div>
      </footer>
    </div>
  );
};

export default AudioPage;