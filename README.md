# openIndu Portal

> **Language:** English | [中文](README_ZH.md)

The openIndu community website frontend, built with React + Vite + Tailwind CSS, containerized for deployment on Kubernetes.

## Tech Stack

- **Frontend framework**: React 18 + TypeScript
- **Build tooling**: Vite 6
- **Styling**: Tailwind CSS 4
- **Containerization**: Docker + Nginx
- **Orchestration**: Kubernetes

## Project Structure

```
openIndu-portal/
├── src/
│   ├── app/           # Application components
│   │   ├── components/
│   │   └── pages/
│   ├── styles/        # Style files
│   └── main.tsx       # Entry point
├── deploy/
│   └── kubernetes/    # K8s deployment config
│       ├── deployment.yaml
│       ├── service.yaml
│       ├── ingress.yaml
│       └── deploy.sh
├── Dockerfile
├── build.sh           # Image build script
├── nginx.conf
└── package.json
```

## Local Development

### Prerequisites

- Node.js 20+
- npm or pnpm

### Install Dependencies

```bash
npm install
```

### Start Dev Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

## Docker Build

### Build Image

```bash
# Use git commit hash as tag
./build.sh

# Specify a version tag
./build.sh -t v0.0.1

# Also tag as latest
./build.sh -l

# Build and push to Alibaba Cloud Container Registry
./build.sh --push -u <username> -p <password>
```

### Run Container Locally

```bash
docker run -p 8080:80 crpi-f7ll8pm177asmofl.cn-chengdu.personal.cr.aliyuncs.com/openindu/openindu-portal:latest
```

Visit http://localhost:8080

## Kubernetes Deployment

### Prerequisites

- Kubernetes cluster (v1.20+)
- kubectl configured and connected to the cluster
- nginx-ingress-controller installed

### Quick Deploy

```bash
cd deploy/kubernetes

# Apply all resources
kubectl apply -f deployment.yaml -f service.yaml -f ingress.yaml -n openindu-portal

# Or use the deploy script
./deploy.sh
```

### Verify Deployment

```bash
# Check pod status
kubectl get pods -n openindu-portal -l app=openindu-portal

# Check service
kubectl get svc -n openindu-portal

# Check ingress
kubectl get ingress -n openindu-portal

# Tail logs
kubectl logs -n openindu-portal -l app=openindu-portal -f
```

### Current Deployment Config

| Setting | Value |
|---------|-------|
| Namespace | openindu-portal |
| Replicas | 2 |
| Image | crpi-f7ll8pm177asmofl.cn-chengdu.personal.cr.aliyuncs.com/openindu/openindu-portal |
| CPU request/limit | 100m / 500m |
| Memory request/limit | 128Mi / 256Mi |
| Domain | www.openindu.com |

### Common Ops Commands

```bash
# Scale
kubectl scale deployment openindu-portal -n openindu-portal --replicas=3

# Restart
kubectl rollout restart deployment/openindu-portal -n openindu-portal

# Rollback
kubectl rollout undo deployment/openindu-portal -n openindu-portal

# Shell into container
kubectl exec -it -n openindu-portal deployment/openindu-portal -- /bin/sh

# Delete deployment
kubectl delete -f deploy/kubernetes/ -n openindu-portal
```

## Image Registry

Images are hosted on Alibaba Cloud Container Registry (Chengdu region):

```
crpi-f7ll8pm177asmofl.cn-chengdu.personal.cr.aliyuncs.com/openindu/openindu-portal
```

## License

Apache-2.0
