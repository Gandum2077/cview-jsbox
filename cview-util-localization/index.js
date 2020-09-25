const language = $device.info.language

const strings = {
  "zh-Hans": {
    "DUPLICATE_VALUES": "取值重复",
    "DONE": "完成",
    "ADD": "添加",
    "SEARCH": "搜索",
    "PREVIOUS": "上一步",
    "NEXT": "下一步",
    "REMOVE": "移除",
    "EDIT": "编辑",
    "FINISHED": "完成",
    "INVALID_VALUES": "取值不合法",
    "CANCEL": "取消",
    "CLIPBOARD": "剪贴板",
    "OK": "好的"
  },
  "en": {
    "DUPLICATE_VALUES": "Duplicate values",
    "DONE": "Done",
    "ADD": "Add",
    "SEARCH": "Search",
    "PREVIOUS": "Previous",
    "NEXT": "Next",
    "REMOVE": "Remove",
    "EDIT": "Edit",
    "FINISHED": "Finished",
    "INVALID_VALUES": "Invalid values",
    "CANCEL": "Cancel",
    "CLIPBOARD": "Clipboard",
    "OK": "OK"
  }
}

function l10n(key) {
  if (!strings[language]) return key;
  const value = strings[language][key]
  return value || key
}

module.exports = {
  strings,
  l10n
}