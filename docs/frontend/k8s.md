# Kubernetes

## 应用发布系统

K8S 仅仅负责容器的编排，实际上如果部署应用还需要外部 Pipeline 的支持，代码的构建，静态检查，镜像的打包由 Pipeline 完成.

![avatar](https://user-gold-cdn.xitu.io/2019/11/27/16eaa79c45c28be4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

目前国内用的比较多的发布系统常常由下面几个服务组成: GitLab/GitHub, Jenkins, Sonar, Harbor。
