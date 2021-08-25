# 一些记忆点

## flex

`flex: 1`代表`flex-grow: 1`、`flex-grow: 1`、`flex-shrink: auto`

当文本溢出显示省略号时，使用 flex 布局会导致占位较多的子元素去挤压别的子元素。

解决办法：`flex-shrink: 0`
