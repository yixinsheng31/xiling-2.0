import React from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBook, faMusic, faFilePdf, faLightbulb, faHome, faBars, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const navItems: { path: string; label: string; icon: IconDefinition }[] = [
  { path: '/', label: '首页', icon: faHome },
  { path: '/audio', label: '音频', icon: faMusic },
  { path: '/documents', label: '文档', icon: faFilePdf },
  { path: '/knowledge', label: '知识库', icon: faLightbulb },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  // 判断当前是否为 /player 路由
  const isPlayer = location.pathname === '/player';
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 bg-white shadow-md transition-all duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FontAwesomeIcon icon={faBook} className="text-primary text-2xl" />
            <h1 className="text-xl md:text-2xl font-bold text-primary">西岭山歌资料库</h1>
          </div>
          {/* 桌面导航 */}
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }: { isActive: boolean }) =>
                  `flex items-center ${isActive ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'} transition-all duration-200 py-1`
                }
              >
                <FontAwesomeIcon icon={item.icon} className="mr-1" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
          {/* 移动端菜单按钮 */}
          <button className="md:hidden text-gray-600 text-xl" id="mobile-menu-button">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        {/* 移动端菜单 */}
        <div className="md:hidden hidden bg-white w-full border-t" id="mobile-menu">
          <div className="container mx-auto px-4 py-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }: { isActive: boolean }) =>
                  `block py-2 ${isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'} transition-colors duration-200 flex items-center`
                }
                onClick={() => {
                  const mobileMenu = document.getElementById('mobile-menu');
                  if (mobileMenu) mobileMenu.classList.add('hidden');
                }}
              >
                <FontAwesomeIcon icon={item.icon} className="mr-1" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className={`flex-grow container mx-auto px-4 ${isPlayer ? '' : 'py-8'}`}>
        {children}
      </main>

      {/* 页脚 */}
      <footer className="bg-dark text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FontAwesomeIcon icon={faBook} className="text-primary text-xl" />
                <h3 className="text-xl font-bold">西岭山歌资料库</h3>
              </div>
              <p className="text-gray-400 text-sm">这里收集了来自南开大学的同学们精心整理的音频、对当地非遗传承人的采访文档和其它知识资料。</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">快速链接</h3>
              <ul className="space-y-2 text-gray-400">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      className="hover:text-primary transition-colors duration-300 flex items-center"
                    >
                      <FontAwesomeIcon icon={item.icon} className="mr-1" />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">联系我</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-primary" />
                  <a href="mailto:sheng3131@outlook.com" className="hover:text-primary transition-colors duration-300">sheng3131@outlook.com</a>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faGithub} className="mr-2 text-primary" />
                  <a
                    href="https://github.com/yixinsheng31"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors duration-300"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>© 2025 西岭山歌资料库. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;