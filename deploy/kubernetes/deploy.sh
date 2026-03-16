#!/bin/bash
set -e

# ============================================================
# 阿里云镜像拉取与 Kubernetes 部署脚本
# ============================================================
# 用途: 从阿里云容器镜像服务拉取镜像并部署到 K8s 集群
# 使用: ./deploy.sh [选项]
#   --skip-login    跳过 docker login（已登录情况下使用）
#   --dry-run       仅显示要执行的命令，不实际执行
# ============================================================

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置变量
REGISTRY="crpi-f7ll8pm177asmofl.cn-chengdu.personal.cr.aliyuncs.com"
IMAGE_NAME="openindu/openindu-portal"
IMAGE_TAG="ac49a1f"
FULL_IMAGE="${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
NAMESPACE="openindu-portal"
SECRET_NAME="aliyun-registry-secret"
DEPLOYMENT_NAME="openindu-portal"

# 解析命令行参数
SKIP_LOGIN=false
DRY_RUN=false

for arg in "$@"; do
    case $arg in
        --skip-login)
            SKIP_LOGIN=true
            shift
            ;;
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --help)
            echo "使用方法: $0 [选项]"
            echo "选项:"
            echo "  --skip-login    跳过 docker login（已登录情况下使用）"
            echo "  --dry-run       仅显示要执行的命令，不实际执行"
            exit 0
            ;;
    esac
done

# 辅助函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

run_cmd() {
    if [ "$DRY_RUN" = true ]; then
        echo "[DRY-RUN] $1"
        return 0
    fi
    eval "$1"
}

# 检查前置条件
check_prerequisites() {
    log_info "检查前置条件..."

    # 检查 kubectl
    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl 未安装，请先安装 kubectl"
        exit 1
    fi

    # 检查 kubectl 配置
    if ! kubectl cluster-info &> /dev/null; then
        log_error "无法连接到 Kubernetes 集群，请检查 kubeconfig 配置"
        exit 1
    fi

    log_success "前置条件检查通过"
}

# 创建命名空间
create_namespace() {
    log_info "检查命名空间 ${NAMESPACE}..."

    if kubectl get namespace "$NAMESPACE" &> /dev/null; then
        log_success "命名空间 ${NAMESPACE} 已存在"
    else
        log_info "创建命名空间 ${NAMESPACE}..."
        run_cmd "kubectl create namespace $NAMESPACE"
        log_success "命名空间 ${NAMESPACE} 创建成功"
    fi
}

# 登录阿里云镜像仓库（可选，用于本地拉取测试）
login_registry() {
    if [ "$SKIP_LOGIN" = true ]; then
        log_info "跳过 docker login"
        return
    fi

    # 检查 docker 是否可用
    if ! command -v docker &> /dev/null; then
        log_warning "Docker 未安装，跳过本地镜像拉取（K8s 集群将直接拉取镜像）"
        return
    fi

    log_info "登录阿里云容器镜像服务..."
    echo -e "${YELLOW}请输入阿里云容器镜像服务凭证${NC}"
    echo "用户名格式: 您的阿里云账号全名"
    read -p "用户名: " USERNAME
    read -sp "密码: " PASSWORD
    echo

    if [ -z "$USERNAME" ] || [ -z "$PASSWORD" ]; then
        log_error "用户名和密码不能为空"
        exit 1
    fi

    run_cmd "echo '$PASSWORD' | docker login --username '$USERNAME' --password-stdin '$REGISTRY'"

    if [ $? -eq 0 ]; then
        log_success "登录成功"
    else
        log_error "登录失败，请检查凭证"
        exit 1
    fi
}

# 拉取镜像（可选，用于本地测试）
pull_image() {
    # 检查 docker 是否可用
    if ! command -v docker &> /dev/null; then
        log_info "Docker 未安装，跳过本地镜像拉取（K8s 集群将直接拉取镜像）"
        return
    fi

    log_info "拉取镜像 ${FULL_IMAGE}..."
    run_cmd "docker pull $FULL_IMAGE"

    if [ $? -eq 0 ]; then
        log_success "镜像拉取成功"
    else
        log_error "镜像拉取失败"
        exit 1
    fi
}

# 创建 imagePullSecret
create_image_pull_secret() {
    log_info "创建/更新 imagePullSecret..."
    log_warning "K8s 需要此凭证来拉取私有镜像"

    echo -e "${YELLOW}请输入阿里云容器镜像服务凭证${NC}"
    echo "用户名: 您的阿里云账号全名"
    read -p "用户名: " SECRET_USERNAME
    read -sp "密码: " SECRET_PASSWORD
    echo
    read -p "邮箱 (可选，可直接回车跳过): " SECRET_EMAIL

    if [ -z "$SECRET_USERNAME" ] || [ -z "$SECRET_PASSWORD" ]; then
        log_error "用户名和密码不能为空"
        exit 1
    fi

    # 删除已存在的 secret（如果有）
    if kubectl get secret "$SECRET_NAME" -n "$NAMESPACE" &> /dev/null; then
        log_info "删除已存在的 secret..."
        run_cmd "kubectl delete secret $SECRET_NAME -n $NAMESPACE"
    fi

    # 创建新的 secret
    local cmd="kubectl create secret docker-registry $SECRET_NAME \
        --namespace=$NAMESPACE \
        --docker-server=$REGISTRY \
        --docker-username='$SECRET_USERNAME' \
        --docker-password='$SECRET_PASSWORD'"

    if [ -n "$SECRET_EMAIL" ]; then
        cmd="$cmd --docker-email='$SECRET_EMAIL'"
    fi

    run_cmd "$cmd"

    if [ $? -eq 0 ]; then
        log_success "imagePullSecret 创建成功"
    else
        log_error "imagePullSecret 创建失败"
        exit 1
    fi
}

# 部署应用
deploy_application() {
    log_info "部署应用..."

    SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

    # 检查 deployment.yaml 是否存在
    if [ ! -f "$SCRIPT_DIR/deployment.yaml" ]; then
        log_error "找不到 deployment.yaml 文件"
        exit 1
    fi

    # 应用 deployment
    run_cmd "kubectl apply -f $SCRIPT_DIR/deployment.yaml -n $NAMESPACE"

    if [ $? -eq 0 ]; then
        log_success "Deployment 应用成功"
    else
        log_error "Deployment 应用失败"
        exit 1
    fi

    # 应用 service
    if [ -f "$SCRIPT_DIR/service.yaml" ]; then
        log_info "应用 Service..."
        run_cmd "kubectl apply -f $SCRIPT_DIR/service.yaml -n $NAMESPACE"
    fi

    # 应用 ingress
    if [ -f "$SCRIPT_DIR/ingress.yaml" ]; then
        log_info "应用 Ingress..."
        run_cmd "kubectl apply -f $SCRIPT_DIR/ingress.yaml -n $NAMESPACE"
    fi
}

# 等待部署完成
wait_for_deployment() {
    log_info "等待部署完成..."

    if [ "$DRY_RUN" = true ]; then
        echo "[DRY-RUN] kubectl rollout status deployment/$DEPLOYMENT_NAME -n $NAMESPACE"
        return
    fi

    kubectl rollout status deployment/"$DEPLOYMENT_NAME" -n "$NAMESPACE" --timeout=300s

    if [ $? -eq 0 ]; then
        log_success "部署完成"
    else
        log_error "部署超时或失败"
        exit 1
    fi
}

# 验证部署
verify_deployment() {
    log_info "验证部署状态..."

    echo ""
    echo "=== Pod 状态 ==="
    kubectl get pods -n "$NAMESPACE" -l app="$DEPLOYMENT_NAME"

    echo ""
    echo "=== Service 状态 ==="
    kubectl get svc -n "$NAMESPACE"

    echo ""
    echo "=== Ingress 状态 ==="
    kubectl get ingress -n "$NAMESPACE"

    echo ""
    echo "=== 部署详情 ==="
    kubectl describe deployment "$DEPLOYMENT_NAME" -n "$NAMESPACE" | grep -A 5 "Pod Template"

    log_success "验证完成"
}

# 显示使用说明
show_usage_info() {
    echo ""
    echo "============================================================"
    echo "部署完成！"
    echo "============================================================"
    echo ""
    echo "常用命令:"
    echo "  # 查看 Pod 日志"
    echo "  kubectl logs -n $NAMESPACE -l app=$DEPLOYMENT_NAME -f"
    echo ""
    echo "  # 查看 Pod 详情"
    echo "  kubectl describe pod -n $NAMESPACE -l app=$DEPLOYMENT_NAME"
    echo ""
    echo "  # 进入 Pod"
    echo "  kubectl exec -it -n $NAMESPACE deployment/$DEPLOYMENT_NAME -- /bin/sh"
    echo ""
    echo "  # 扩缩容"
    echo "  kubectl scale deployment $DEPLOYMENT_NAME -n $NAMESPACE --replicas=3"
    echo ""
    echo "  # 回滚"
    echo "  kubectl rollout undo deployment/$DEPLOYMENT_NAME -n $NAMESPACE"
    echo ""
    echo "  # 删除部署"
    echo "  kubectl delete -f $SCRIPT_DIR/ -n $NAMESPACE"
    echo "============================================================"
}

# 主函数
main() {
    echo ""
    echo "============================================================"
    echo "  阿里云镜像拉取与 Kubernetes 部署脚本"
    echo "============================================================"
    echo ""
    echo "目标镜像: ${FULL_IMAGE}"
    echo "目标命名空间: ${NAMESPACE}"
    echo ""

    if [ "$DRY_RUN" = true ]; then
        log_warning "DRY-RUN 模式: 仅显示命令，不实际执行"
    fi

    check_prerequisites
    create_namespace
    login_registry
    pull_image
    create_image_pull_secret
    deploy_application
    wait_for_deployment
    verify_deployment
    show_usage_info
}

main