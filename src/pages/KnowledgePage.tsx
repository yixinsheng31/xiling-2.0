import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faSearch } from '@fortawesome/free-solid-svg-icons';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  date: string;
  src: string;
}

// 只保留曲谱分类和新图片
const galleryItems: GalleryItem[] = [
  { id: 1, title: "大山调曲谱", category: "曲谱", date: "2025-07-18", src: `${process.env.PUBLIC_URL}/images/大山调曲谱.jpg` },
  { id: 2, title: "流水调曲谱", category: "曲谱", date: "2025-07-18", src: `${process.env.PUBLIC_URL}/images/流水调曲谱.jpg` },
  { id: 3, title: "牙妹调曲谱", category: "曲谱", date: "2025-07-18", src: `${process.env.PUBLIC_URL}/images/牙妹调曲谱.jpg` },
  { id: 4, title: "哟噢调曲谱", category: "曲谱", date: "2025-07-18", src: `${process.env.PUBLIC_URL}/images/哟噢调曲谱.jpg` },
];

// 分类仅保留“曲谱”
const categories = [
  { id: 1, name: "曲谱" },
];

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("曲谱");

  const filteredGalleryItems = galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center mb-8">
        <FontAwesomeIcon icon={faImage} className="text-primary text-2xl mr-3" />
        <h2 className="text-2xl md:text-3xl font-bold">图片资料库</h2>
      </div>

      {/* 搜索和分类 */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-2/3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            placeholder="搜索图片..."
            disabled
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === cat.name ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors duration-200 whitespace-nowrap`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 图片列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGalleryItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <img src={item.src} alt={item.title} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.category} | {item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;