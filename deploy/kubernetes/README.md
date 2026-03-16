# Kubernetes Deployment

This directory contains Kubernetes manifests for deploying the openIndu Portal.

## Prerequisites

- Kubernetes cluster (v1.20+)
- kubectl configured to access your cluster
- nginx-ingress-controller installed (for Ingress)
- Container registry with the built image

## Quick Start

### 1. Build and Push Docker Image

```bash
# Build the image
docker build -t openindu-portal:latest .

# Tag for your registry (example)
docker tag openindu-portal:latest your-registry.com/openindu-portal:latest

# Push to registry
docker push your-registry.com/openindu-portal:latest
```

### 2. Update Image Reference (if using private registry)

Edit `deployment.yaml` and update the image:

```yaml
image: your-registry.com/openindu-portal:latest
```

### 3. Deploy to Kubernetes

```bash
# Apply all manifests
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml

# Or apply all at once
kubectl apply -f .
```

### 4. Verify Deployment

```bash
# Check deployment status
kubectl get deployments

# Check pods
kubectl get pods -l app=openindu-portal

# Check services
kubectl get svc openindu-portal

# Check ingress
kubectl get ingress openindu-portal
```

## Configuration

### Resource Limits

Default resource configuration in `deployment.yaml`:

| Resource | Request | Limit |
|----------|---------|-------|
| CPU | 100m | 500m |
| Memory | 128Mi | 256Mi |

Adjust as needed for your environment.

### Replicas

Default: 2 replicas. Modify in `deployment.yaml`:

```yaml
spec:
  replicas: 3  # Change as needed
```

### Ingress Host

Update the host in `ingress.yaml`:

```yaml
spec:
  rules:
    - host: your-domain.com  # Change this
```

### TLS/SSL

Uncomment and configure the TLS section in `ingress.yaml`:

```yaml
tls:
  - hosts:
      - your-domain.com
    secretName: openindu-portal-tls
```

Create the TLS secret:

```bash
kubectl create secret tls openindu-portal-tls \
  --cert=path/to/tls.crt \
  --key=path/to/tls.key
```

## Scaling

### Manual Scaling

```bash
kubectl scale deployment openindu-portal --replicas=4
```

### Horizontal Pod Autoscaler (HPA)

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: openindu-portal-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: openindu-portal
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

## Troubleshooting

```bash
# View pod logs
kubectl logs -l app=openindu-portal -f

# Describe deployment
kubectl describe deployment openindu-portal

# Check events
kubectl get events --sort-by='.lastTimestamp'
```

## Cleanup

```bash
kubectl delete -f .
```