# openIndu Portal

OpenIndu 门户前端应用，基于 React + Vite + Tailwind CSS 构建，容器化部署到 Kubernetes 集群。

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 6
- **样式**: Tailwind CSS 4
- **容器化**: Docker + Nginx
- **编排**: Kubernetes

## 项目结构

```
openIndu-portal/
├── src/
│   ├── app/           # 应用组件
│   │   ├── components/
│   │   └── pages/
│   ├── styles/        # 样式文件
│   └── main.tsx       # 入口文件
├── deploy/
│   └── kubernetes/    # K8s 部署配置
│       ├── deployment.yaml
│       ├── service.yaml
│       ├── ingress.yaml
│       └── deploy.sh
├── Dockerfile
├── build.sh           # 镜像构建脚本
├── nginx.conf
└── package.json
```

## 本地开发

### 环境要求

- Node.js 20+
- npm 或 pnpm

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## Docker 构建

### 构建镜像

```bash
# 使用 git commit hash 作为 tag
./build.sh

# 指定版本 tag
./build.sh -t v0.0.1

# 同时打 latest 标签
./build.sh -l

# 构建并推送到阿里云镜像仓库
./build.sh --push -u <用户名> -p <密码>
```

### 本地运行容器

```bash
docker run -p 8080:80 crpi-f7ll8pm177asmofl.cn-chengdu.personal.cr.aliyuncs.com/openindu/openindu-portal:latest
```

访问 http://localhost:8080

## Kubernetes 部署

### 前置条件

- Kubernetes 集群 (v1.20+)
- kubectl 已配置并连接集群
- nginx-ingress-controller 已安装

### 快速部署

```bash
cd deploy/kubernetes

# 应用所有资源
kubectl apply -f deployment.yaml -f service.yaml -f ingress.yaml -n openindu-portal

# 或使用部署脚本
./deploy.sh
```

### 验证部署

```bash
# 查看 Pod 状态
kubectl get pods -n openindu-portal -l app=openindu-portal

# 查看服务
kubectl get svc -n openindu-portal

# 查看 Ingress
kubectl get ingress -n openindu-portal

# 查看日志
kubectl logs -n openindu-portal -l app=openindu-portal -f
```

### 当前部署配置

| 配置项 | 值 |
|--------|-----|
| 命名空间 | openindu-portal |
| 副本数 | 2 |
| 镜像 | crpi-f7ll8pm177asmofl.cn-chengdu.personal.cr.aliyuncs.com/openindu/openindu-portal |
| CPU 请求/限制 | 100m / 500m |
| 内存请求/限制 | 128Mi / 256Mi |
| 域名 | www.openindu.com |

### 常用运维命令

```bash
# 扩缩容
kubectl scale deployment openindu-portal -n openindu-portal --replicas=3

# 重启部署
kubectl rollout restart deployment/openindu-portal -n openindu-portal

# 回滚
kubectl rollout undo deployment/openindu-portal -n openindu-portal

# 进入容器
kubectl exec -it -n openindu-portal deployment/openindu-portal -- /bin/sh

# 删除部署
kubectl delete -f deploy/kubernetes/ -n openindu-portal
```

## 镜像仓库

镜像托管于阿里云容器镜像服务（成都区域）：

```
crpi-f7ll8pm177asmofl.cn-chengdu.personal.cr.aliyuncs.com/openindu/openindu-portal
```

## License

MIT