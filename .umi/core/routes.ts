// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'D:/pantheru/myapp/blog/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('D:/pantheru/myapp/blog/node_modules/@umijs/preset-dumi/lib/theme/layout').default],
    "component": (props) => {
        const { default: getDemoRenderArgs } = require('D:/pantheru/myapp/blog/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/es/builtins/Previewer.js');
        const { default: demos } = require('@@/dumi/demos');
        const { usePrefersColor } = require('dumi/theme');

        
      const renderArgs = getDemoRenderArgs(props, demos);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
        }
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('D:/pantheru/myapp/blog/node_modules/@umijs/preset-dumi/lib/theme/layout').default, require('D:/pantheru/myapp/blog/node_modules/dumi-theme-default/es/layout.js').default],
    "routes": [
      {
        "path": "/",
        "component": require('D:/pantheru/myapp/blog/docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1624872532000,
          "title": "Rainee的知识库",
          "hero": {
            "title": "rainUee",
            "desc": "<div class=\"markdown\"><p>The best is yet to be.</p></div>",
            "logo": "/avatar.png",
            "actions": [
              {
                "text": "Action →",
                "link": "/frontend"
              }
            ],
            "image": "/logo.png"
          },
          "features": [
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png",
              "title": "About Me",
              "desc": "<div class=\"markdown\"><p>Balabala</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png",
              "title": "Feature",
              "desc": "<div class=\"markdown\"><p>Balabala</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png",
              "title": "Feature",
              "desc": "<div class=\"markdown\"><p>Balabala</p></div>"
            }
          ],
          "footer": "<div class=\"markdown\"><p>Open-source MIT Licensed | Copyright © 2020<br />Powered by <a href=\"https://d.umijs.org/\" target=\"_blank\">dumi<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"\" x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a></p></div>",
          "slugs": []
        },
        "title": "Rainee的知识库"
      },
      {
        "path": "/frontend/css",
        "component": require('D:/pantheru/myapp/blog/docs/frontend/CSS.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/frontend/CSS.md",
          "updatedTime": 1624886990632,
          "slugs": [
            {
              "depth": 1,
              "value": "CSS",
              "heading": "css"
            },
            {
              "depth": 2,
              "value": "面试题",
              "heading": "面试题"
            },
            {
              "depth": 3,
              "value": "怎么让一个 div 水平垂直居中",
              "heading": "怎么让一个-div-水平垂直居中"
            },
            {
              "depth": 3,
              "value": "已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改",
              "heading": "已知如下代码，如何修改才能让图片宽度为-300px-？注意下面代码不可修改"
            },
            {
              "depth": 3,
              "value": "比较 opacity: 0、visibility: hidden、display: none",
              "heading": "比较-opacity-0、visibility-hidden、display-none"
            },
            {
              "depth": 3,
              "value": "transition 和 animation 的区别",
              "heading": "transition-和-animation-的区别"
            }
          ],
          "title": "CSS",
          "nav": {
            "path": "/frontend",
            "title": "Frontend"
          }
        },
        "title": "CSS"
      },
      {
        "path": "/frontend/es6",
        "component": require('D:/pantheru/myapp/blog/docs/frontend/ES6.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/frontend/ES6.md",
          "updatedTime": 1624886990864,
          "slugs": [
            {
              "depth": 1,
              "value": "ES6",
              "heading": "es6"
            },
            {
              "depth": 2,
              "value": "标签模板",
              "heading": "标签模板"
            }
          ],
          "title": "ES6",
          "nav": {
            "path": "/frontend",
            "title": "Frontend"
          }
        },
        "title": "ES6"
      },
      {
        "path": "/frontend/java-script",
        "component": require('D:/pantheru/myapp/blog/docs/frontend/JavaScript.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/frontend/JavaScript.md",
          "updatedTime": 1624886981000,
          "slugs": [
            {
              "depth": 1,
              "value": "JavaScript",
              "heading": "javascript"
            },
            {
              "depth": 2,
              "value": "基础",
              "heading": "基础"
            },
            {
              "depth": 3,
              "value": "typeof",
              "heading": "typeof"
            },
            {
              "depth": 3,
              "value": "基本类型和引用类型",
              "heading": "基本类型和引用类型"
            },
            {
              "depth": 3,
              "value": "作用域",
              "heading": "作用域"
            },
            {
              "depth": 3,
              "value": "闭包",
              "heading": "闭包"
            },
            {
              "depth": 3,
              "value": "条件运算符",
              "heading": "条件运算符"
            },
            {
              "depth": 2,
              "value": "数组",
              "heading": "数组"
            },
            {
              "depth": 3,
              "value": "数组去重",
              "heading": "数组去重"
            },
            {
              "depth": 3,
              "value": "数组扁平化",
              "heading": "数组扁平化"
            },
            {
              "depth": 3,
              "value": "数组乱序",
              "heading": "数组乱序"
            },
            {
              "depth": 3,
              "value": "instanceof",
              "heading": "instanceof"
            },
            {
              "depth": 3,
              "value": "浅拷贝",
              "heading": "浅拷贝"
            },
            {
              "depth": 3,
              "value": "深拷贝",
              "heading": "深拷贝"
            },
            {
              "depth": 2,
              "value": "函数",
              "heading": "函数"
            },
            {
              "depth": 3,
              "value": "防抖",
              "heading": "防抖"
            },
            {
              "depth": 3,
              "value": "节流",
              "heading": "节流"
            },
            {
              "depth": 2,
              "value": "算法",
              "heading": "算法"
            },
            {
              "depth": 2,
              "value": "前端安全",
              "heading": "前端安全"
            },
            {
              "depth": 3,
              "value": "跨站脚本攻击（XSS）",
              "heading": "跨站脚本攻击（xss）"
            }
          ],
          "title": "JavaScript",
          "nav": {
            "path": "/frontend",
            "title": "Frontend"
          }
        },
        "title": "JavaScript"
      },
      {
        "path": "/frontend/k8s",
        "component": require('D:/pantheru/myapp/blog/docs/frontend/k8s.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/frontend/k8s.md",
          "updatedTime": 1624886981000,
          "slugs": [
            {
              "depth": 1,
              "value": "Kubernetes",
              "heading": "kubernetes"
            },
            {
              "depth": 2,
              "value": "应用发布系统",
              "heading": "应用发布系统"
            }
          ],
          "title": "Kubernetes",
          "nav": {
            "path": "/frontend",
            "title": "Frontend"
          }
        },
        "title": "Kubernetes"
      },
      {
        "path": "/frontend/to-do",
        "component": require('D:/pantheru/myapp/blog/docs/frontend/To-do.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/frontend/To-do.md",
          "updatedTime": 1624886981000,
          "slugs": [
            {
              "depth": 1,
              "value": "To-do",
              "heading": "to-do"
            },
            {
              "depth": 2,
              "value": "引用类型",
              "heading": "引用类型"
            },
            {
              "depth": 2,
              "value": "JavaScript 数组函数",
              "heading": "javascript-数组函数"
            },
            {
              "depth": 2,
              "value": "transform 和 animation 的区别",
              "heading": "transform-和-animation-的区别"
            },
            {
              "depth": 2,
              "value": "左右盒子",
              "heading": "左右盒子"
            },
            {
              "depth": 2,
              "value": "闭包",
              "heading": "闭包"
            },
            {
              "depth": 2,
              "value": "深拷贝和浅拷贝的区别",
              "heading": "深拷贝和浅拷贝的区别"
            },
            {
              "depth": 2,
              "value": "cookie 和 session 的区别",
              "heading": "cookie-和-session-的区别"
            },
            {
              "depth": 2,
              "value": "sessionstorage 和 locastorage",
              "heading": "sessionstorage-和-locastorage"
            },
            {
              "depth": 2,
              "value": "节流（多次变为隔一段时间一次）防抖（多次变为最后一次）",
              "heading": "节流（多次变为隔一段时间一次）防抖（多次变为最后一次）"
            },
            {
              "depth": 2,
              "value": "事件代理",
              "heading": "事件代理"
            },
            {
              "depth": 2,
              "value": "判断是否为空",
              "heading": "判断是否为空"
            },
            {
              "depth": 2,
              "value": "宏任务和微任务",
              "heading": "宏任务和微任务"
            },
            {
              "depth": 2,
              "value": "XSS",
              "heading": "xss"
            },
            {
              "depth": 3,
              "value": "将用户输入的东西作为脚本输出",
              "heading": "将用户输入的东西作为脚本输出"
            },
            {
              "depth": 3,
              "value": "解决办法",
              "heading": "解决办法"
            },
            {
              "depth": 2,
              "value": "transition 和 animation 的区别",
              "heading": "transition-和-animation-的区别"
            },
            {
              "depth": 2,
              "value": "待办",
              "heading": "待办"
            }
          ],
          "title": "To-do",
          "nav": {
            "path": "/frontend",
            "title": "Frontend"
          }
        },
        "title": "To-do"
      },
      {
        "path": "/frontend/vue",
        "component": require('D:/pantheru/myapp/blog/docs/frontend/Vue.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/frontend/Vue.md",
          "updatedTime": 1624886981000,
          "slugs": [
            {
              "depth": 1,
              "value": "Vue",
              "heading": "vue"
            },
            {
              "depth": 2,
              "value": "自检清单",
              "heading": "自检清单"
            },
            {
              "depth": 2,
              "value": "生命周期",
              "heading": "生命周期"
            },
            {
              "depth": 3,
              "value": "生命周期函数 hook",
              "heading": "生命周期函数-hook"
            },
            {
              "depth": 2,
              "value": "对 MVVM 的理解",
              "heading": "对-mvvm-的理解"
            },
            {
              "depth": 2,
              "value": "vue-router 与 location.href 的区别",
              "heading": "vue-router-与-locationhref-的区别"
            },
            {
              "depth": 2,
              "value": "diff 算法",
              "heading": "diff-算法"
            },
            {
              "depth": 2,
              "value": "为什么 Vue 组件中的 data 是一个函数原理(详细易懂)",
              "heading": "为什么-vue-组件中的-data-是一个函数原理详细易懂"
            },
            {
              "depth": 3,
              "value": "v-if 和 v-show 的区别",
              "heading": "v-if-和-v-show-的区别"
            }
          ],
          "title": "Vue",
          "nav": {
            "path": "/frontend",
            "title": "Frontend"
          }
        },
        "title": "Vue"
      },
      {
        "path": "/frontend",
        "meta": {},
        "exact": true,
        "redirect": "/frontend/css"
      }
    ],
    "title": "Rainee的知识库",
    "component": (props) => props.children
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
