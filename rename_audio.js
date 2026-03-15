// 批量重命名 public/audio 下所有文件和文件夹，将中文和空格转为拼音和下划线
// 使用前请先安装依赖：npm install pinyin

const fs = require('fs');
const path = require('path');
const pinyin = require('pinyin').default;

// 将中文转为拼音，空格转下划线
function toPinyin(str) {
  // 转为拼音
  const pyArr = pinyin(str, { style: pinyin.STYLE_NORMAL });
  let pyStr = pyArr.flat().join('');
  // 替换空格为下划线
  pyStr = pyStr.replace(/\s+/g, '_');
  // 只保留字母、数字、下划线、点
  pyStr = pyStr.replace(/[^a-zA-Z0-9_\.]/g, '');
  return pyStr;
}

function renameRecursive(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const oldPath = path.join(dir, file);
    let newFile = toPinyin(file);
    const newPath = path.join(dir, newFile);
    // 先递归子目录
    if (fs.statSync(oldPath).isDirectory()) {
      renameRecursive(oldPath);
    }
    // 如果新旧文件名不同则重命名
    if (file !== newFile) {
      fs.renameSync(oldPath, newPath);
      console.log(`重命名: ${oldPath} -> ${newPath}`);
    }
  });
}

const audioDir = path.join(__dirname, 'public', 'audio');
renameRecursive(audioDir);
console.log('批量重命名完成！');
