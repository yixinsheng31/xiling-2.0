import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return ( //console.log('NotFound component rendered')
    <div className="max-w-3xl mx-auto text-center py-16">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-500 mb-6">
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl" />
      </div>
      <h2 className="text-4xl font-bold text-gray-800 mb-4">404 - 页面未找到</h2>
      <p className="text-xl text-gray-600 mb-8">抱歉，您访问的页面不存在。</p>
      <Link to="/" className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl">
        <FontAwesomeIcon icon={faHome} className="mr-2" />
        返回首页
      </Link>
    </div>
  );
};

export default NotFound;    