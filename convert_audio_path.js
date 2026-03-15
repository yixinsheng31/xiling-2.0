// 更健壮的 AudioPage.tsx 路径批量转换脚本
// 需先 npm install pinyin

const fs = require('fs');
const path = require('path');
const pinyin = require('pinyin').default;

function toPinyin(str) {
  // 目录分割，逐级转拼音
  return str.split('/').map(seg => {
    // 保留扩展名
    const ext = seg.lastIndexOf('.') > 0 ? seg.slice(seg.lastIndexOf('.')) : '';
    const name = ext ? seg.slice(0, seg.lastIndexOf('.')) : seg;
    // 转拼音
    let py = pinyin(name, { style: 'normal' }).flat().join('');
    py = py.replace(/\s+/g, '_');
    py = py.replace(/[^a-zA-Z0-9_]/g, '');
    return py + ext;
  }).join('/');
}

const filePath = path.join(__dirname, 'src', 'pages', 'AudioPage.tsx');
let code = fs.readFileSync(filePath, 'utf-8');

// 匹配所有 src: `${process.env.PUBLIC_URL}/audio/xxx` 或 '/audio/xxx'
code = code.replace(/([`'"])(\$\{process\.env\.PUBLIC_URL\})?\/?\/audio\/([^`'"\)]+)([`'"])/g, (match, q1, pub, rel, q2) => {
  // rel 可能包含多级目录和文件名
  const newRel = toPinyin(rel);
  return `${q1}${pub ? pub + '/' : ''}audio/${newRel}${q2}`;
});

fs.writeFileSync(filePath, code, 'utf-8');
console.log('AudioPage.tsx 路径批量转换完成！');
