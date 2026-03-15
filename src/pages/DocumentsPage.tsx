import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileWord, faDownload } from '@fortawesome/free-solid-svg-icons';

// 示例数据结构
// ...existing code...
const documentItems = [
  // 歌词本 PDF
  {
    id: 1,
    title: '歌词1',
    category: '歌词本',
    fileType: 'pdf',
    src: `${process.env.PUBLIC_URL}/pdf/歌词1.pdf`,
    date: '2025-07-17',
    pages: '未知页数',
  },
  {
    id: 2,
    title: '歌词2',
    category: '歌词本',
    fileType: 'pdf',
    src: `${process.env.PUBLIC_URL}/pdf/歌词2.pdf`,
    date: '2025-07-17',
    pages: '未知页数',
  },
  // 采访记录 PDF
  {
    id: 3,
    title: '采访整理稿（戴亨莲）',
    category: '采访记录',
    fileType: 'pdf',
    src: `${process.env.PUBLIC_URL}/pdf/采访整理稿（戴亨莲）.pdf`,
    date: '2025-07-17',
    pages: '未知页数',
  },
  {
    id: 4,
    title: '采访整理稿（李友福）',
    category: '采访记录',
    fileType: 'pdf',
    src: `${process.env.PUBLIC_URL}/pdf/采访整理稿（李友福）.pdf`,
    date: '2025-07-17',
    pages: '未知页数',
  },
  {
    id: 5,
    title: '采访整理稿（罗教军）',
    category: '采访记录',
    fileType: 'pdf',
    src: `${process.env.PUBLIC_URL}/pdf/采访整理稿（罗教军）.pdf`,
    date: '2025-07-17',
    pages: '未知页数',
  },
  // 下面是示例 Word 文档（如有可继续补充）
  
  {
    id: 6,
    title: '其他文档下载',
    fileType: 'word',
    files: [
      {
        name: '2.山魂之声正版电子版本.doc',
        src: '/docs/2.山魂之声正版电子版本.doc',
      },
      {
        name: '大邑县诗词集 源文件.docx',
        src: '/docs/大邑县诗词集 源文件.docx',
      },
      {
        name: '《月亮昏昏月亮明》+《一把明珠撒窗外》歌词.docx',
        src: '/docs/《月亮昏昏月亮明》+《一把明珠撒窗外》歌词.docx',
      },
    ],
  },
];


// PDF 分类
const pdfCategories = ['歌词本', '采访记录'];

const fileTypeIcons: Record<string, any> = {
  pdf: faFilePdf,
  word: faFileWord,
};

const fileTypeBg: Record<string, string> = {
  pdf: 'bg-red-100 text-red-600',
  word: 'bg-blue-100 text-blue-600',
};

const DocumentsPage: React.FC = () => {
  const [previewDoc, setPreviewDoc] = useState<any>(null);

  // 所有 Word 文件
  const allDocxFiles = documentItems
    .filter(doc => doc.fileType === 'word' && doc.files)
    .flatMap(doc => doc.files!.map(file => ({
      ...file,
      docTitle: doc.title,
    })));

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8">文档资料库</h2>

      {/* PDF 分类展示 */}
      {pdfCategories.map(category => (
        <div key={category} className="mb-10">
          <h3 className="text-lg font-bold mb-4">{category} PDF</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentItems
              .filter(doc => doc.fileType === 'pdf' && doc.category === category)
              .map(doc => (
                <div
                  key={doc.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                  onClick={() => setPreviewDoc(doc)}
                >
                  <div className="p-4 flex flex-col h-full">
                    <div className="flex items-start">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${fileTypeBg[doc.fileType]}`}>
                        <FontAwesomeIcon icon={fileTypeIcons[doc.fileType]} className="text-xl" />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold">{doc.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{doc.category}</p>
                        <p className="text-xs text-gray-400 mt-1">{doc.date}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-4 flex-grow">这是一份{doc.category}相关的PDF文档。</p>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                      <span className="text-sm text-gray-500">{doc.pages}</span>
                      <button
                        type="button"
                        className="text-primary hover:underline text-sm flex items-center"
                        onClick={e => { e.stopPropagation(); window.open(doc.src, '_blank'); }}
                        aria-label="下载"
                      >
                        <FontAwesomeIcon icon={faDownload} className="mr-1" /> 下载
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Word 下载区 */}
      <div className="mb-10">
        <h3 className="text-lg font-bold mb-4">Word 文档下载区</h3>
        <ul className="space-y-2">
          {allDocxFiles.map((file, idx) => (
            <li key={idx} className="flex items-center">
              <FontAwesomeIcon icon={faFileWord} className="text-blue-600 mr-2" />
              <span className="mr-2 text-gray-700">{file.docTitle}：</span>
              <a
                href={file.src}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* PDF 预览弹窗（可选） */}
      {previewDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setPreviewDoc(null)}
            >
              关闭
            </button>
            <h2 className="text-xl font-bold mb-4">{previewDoc.title}</h2>
            <iframe
              src={previewDoc.src}
              title={previewDoc.title}
              className="w-full h-96 border"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;