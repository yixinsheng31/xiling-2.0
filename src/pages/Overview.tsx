import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faFilePdf, faLightbulb, faClock, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faStar, faCogs, faCloud, faImage } from '@fortawesome/free-solid-svg-icons';

// 定义颜色类型
type ColorType = 'blue' | 'green' | 'purple';

// 颜色映射对象，添加索引签名
const colorMap: Record<ColorType, {
  text: string;
  border: string;
  bg: string;
  icon: string;
}> = {
  blue: {
    text: 'text-blue-300',
    border: 'border-blue-500',
    bg: 'bg-blue-100',
    icon: 'text-blue-500',
  },
  green: {
    text: 'text-green-300',
    border: 'border-green-500',
    bg: 'bg-green-100',
    icon: 'text-green-500',
  },
  purple: {
    text: 'text-purple-300',
    border: 'border-purple-500',
    bg: 'bg-purple-100',
    icon: 'text-purple-500',
  },
};

const Overview = () => {
  const categoryStats: {
    id: number;
    title: string;
    count: number;
    icon: any;
    color: ColorType;
    path: string;
  }[] = [
    {
      id: 1,
      title: '音频资料',
      count: 24,
      icon: faMusic,
      color: 'blue',
      path: '/audio'
    },
    {
      id: 2,
      title: '文档资料',
      count: 56,
      icon: faFilePdf,
      color: 'green',
      path: '/documents'
    },
    {
      id: 3,
      title: '知识库',
      count: 18,
      icon: faLightbulb,
      color: 'purple',
      path: '/knowledge'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* 英雄区域 */}
      <section className="relative bg-gradient-to-br from-primary to-secondary text-white py-16 md:py-24 rounded-2xl overflow-hidden mb-12 shadow-lg">
        <div className="absolute inset-0 bg-dark/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold mb-4 text-shadow">欢迎来到西岭山歌数字化保护工作站</h2>
          <p className="text-[clamp(1rem,2vw,1.25rem)] max-w-2xl mb-8">这里收集了来自南开大学的同学们精心整理的音频、对当地非遗传承人的采访文档和其它知识资料。</p>
          <div className="flex flex-wrap gap-4">
            {categoryStats.map((cat) => (
              <Link
                key={cat.id}
                to={cat.path}
                className={`bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 border border-white/30 flex items-center`}
              >
                <FontAwesomeIcon icon={cat.icon} className={`mr-2 ${colorMap[cat.color].text}`} />
                <span>{cat.title}</span>
                <span className="ml-2 bg-white/20 rounded-full px-2 py-0.5 text-xs">{cat.count} 个资源</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 核心特色 */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <FontAwesomeIcon icon={faStar} className="text-primary text-3xl mb-3" />
            <h4 className="font-semibold mb-2">山歌音频采集</h4>
            <p className="text-gray-500 text-sm">收集整理西岭地区原生态山歌音频，助力非遗保护。</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <FontAwesomeIcon icon={faCogs} className="text-green-600 text-3xl mb-3" />
            <h4 className="font-semibold mb-2">文献数字归档</h4>
            <p className="text-gray-500 text-sm">文档资料数字化，便于检索与传承。</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <FontAwesomeIcon icon={faLightbulb} className="text-yellow-500 text-3xl mb-3" />
            <h4 className="font-semibold mb-2">知识库建设</h4>
            <p className="text-gray-500 text-sm">系统整理山歌知识，普及乡村文化。</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center">
            <FontAwesomeIcon icon={faCloud} className="text-blue-400 text-3xl mb-3" />
            <h4 className="font-semibold mb-2">安全云存储</h4>
            <p className="text-gray-500 text-sm">所有资料安全存储，随时访问。</p>
          </div>
        </div>
      </section>

      {/* 项目介绍 */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <FontAwesomeIcon icon={faLightbulb} className="text-primary mr-2" />
              关于项目
            </h3>
            <p className="text-lg mb-4">
              西岭山歌保护工作站由南开大学师生共同发起，致力于收集、整理和传播西岭地区的山歌文化。我们通过音频、文档和知识库等多种形式，保存和分享宝贵的非遗资源，助力乡村文化振兴。
              
            </p>

            <ul className="list-disc pl-6 text-gray-700">
              <li>山歌音频采集与整理</li>
              <li>文献资料数字化归档</li>
              <li>知识库建设与普及</li>
              <li>乡村文化宣传与推广</li>
            
            </ul>
            <p className="mt-4 text-gray-600">
              西岭山歌是发源于四川省大邑县西岭地区的川西汉族传统民歌。其作为大邑县人民"以歌代言"的最原始、最生动的传情达意的方式，既是地区与民族历史文化的结晶，也是当地地理特点、人民生活方式、地域与民族文化内涵的生动展示，人民情感与审美的集中表达，是研究西南地域文化基因与社会心理的重要活态样本。围绕西岭山歌开展保护与传承工作，可以助力对大邑县地域文化的保护与传承，进一步提升其文化活力与文化适应力。
面对西岭山歌的保护与传承问题，团队依托南开大学文学院与成都市大邑县共建“中国式现代化乡村工作站”，并于2025年7月在大邑县开展实地调研活动。在大邑县团委、大邑县文旅局、西岭山歌协会等相关单位的支持下，实践团队通过走访当地档案馆、文化馆、西岭山歌协会等部门，采访多位山歌传承人，实地采集山歌歌唱音频及山歌相关资料，采集了总数超100段，总时长超150min的山歌歌唱音频，整理了同十余位山歌传承人的采访内容，同时获取了大量西岭山歌相关原始文献资料。
团队最新调研成果经整理后将尽数发布于本网站，旨在搭建一座兼顾保护研究与宣传推广功能，集音频、歌词、文档资料、交互式检索为一体的山歌数据资料库，让西岭山歌永久保存、触手可及。
</p>


          </div>
          <div className="flex-1">
            <img
              src={`${process.env.PUBLIC_URL}/images/ecb948c5a12b2ab9c46c1430e93425a.jpg`}
              alt="项目宣传照"
              className="rounded-xl shadow-md object-cover w-full h-64"
            />
          </div>
        </div>
      </section>

      {/* 项目宣传照 */}
      <section className="mb-16">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <FontAwesomeIcon icon={faImage} className="text-primary mr-2" />
          项目宣传照
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <img src={`${process.env.PUBLIC_URL}/images/d1b6450a2256292f77cb99ecbe976a8.jpg`} alt="宣传照1" className="rounded-xl shadow-md object-cover w-full h-64" />
          <img src={`${process.env.PUBLIC_URL}/images/bf5f7118871f30d8fdf27d0b90f2d5e.jpg`} alt="宣传照2" className="rounded-xl shadow-md object-cover w-full h-64" />
          <img src={`${process.env.PUBLIC_URL}/images/ff05b25932ffad2f90334396fc3827c.jpg`} alt="宣传照3" className="rounded-xl shadow-md object-cover w-full h-64" />
        </div>
      </section>
    </div>
  );
}

export default Overview;