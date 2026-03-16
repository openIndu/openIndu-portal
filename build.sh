#!/bin/bash

# =============================================================================
# Docker Image Build Script for openIndu-portal
# =============================================================================
# This script builds a Docker image for the openIndu-portal application.
# Optionally, it can also push the image to Alibaba Cloud Container Registry (ACR).
#
# Usage:
#   ./build.sh [OPTIONS]
#
# Options:
#   -t, --tag <tag>         Specify image tag (default: git commit short hash)
#   -l, --latest            Also tag as 'latest'
#   --push                  Push image to ACR (requires login)
#   -u, --username <user>   ACR username (for push)
#   -p, --password <pass>   ACR password (for push)
#   -h, --help              Show this help message
#
# Examples:
#   ./build.sh                                 # Build image only
#   ./build.sh -t v0.0.1                       # Build with version tag
#   ./build.sh -l                              # Build and tag as latest
#   ./build.sh --push -u user -p pass          # Build and push to ACR
#   ./build.sh --push -u user -p pass -l       # Build, push with latest tag
# =============================================================================

set -e  # Exit on any error

# =============================================================================
# Configuration
# =============================================================================
REGISTRY="crpi-f7ll8pm177asmofl.cn-chengdu.personal.cr.aliyuncs.com"
IMAGE_NAME="openindu/openindu-portal"

# =============================================================================
# Color Output
# =============================================================================
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# =============================================================================
# Help Function
# =============================================================================
show_help() {
    echo "Docker Image Build Script for openIndu-portal"
    echo ""
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -t, --tag <tag>         Specify image tag (default: git commit short hash)"
    echo "  -l, --latest            Also tag as 'latest'"
    echo "  --push                  Push image to ACR (requires login)"
    echo "  -u, --username <user>   ACR username (for push)"
    echo "  -p, --password <pass>   ACR password (for push)"
    echo "  -h, --help              Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                                 # Build image only"
    echo "  $0 -t v0.0.1                       # Build with version tag"
    echo "  $0 -l                              # Build and tag as latest"
    echo "  $0 --push -u user -p pass          # Build and push to ACR"
    echo "  $0 --push -u user -p pass -l       # Build, push with latest tag"
    echo ""
    echo "Image URL format:"
    echo "  ${REGISTRY}/${IMAGE_NAME}:<tag>"
}

# =============================================================================
# Parse Arguments
# =============================================================================
ACR_USERNAME=""
ACR_PASSWORD=""
TAG=""
TAG_LATEST=false
PUSH_IMAGE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--tag)
            TAG="$2"
            shift 2
            ;;
        -l|--latest)
            TAG_LATEST=true
            shift
            ;;
        --push)
            PUSH_IMAGE=true
            shift
            ;;
        -u|--username)
            ACR_USERNAME="$2"
            shift 2
            ;;
        -p|--password)
            ACR_PASSWORD="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            log_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# =============================================================================
# Pre-flight Checks
# =============================================================================

log_info "Running pre-flight checks..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    log_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
    log_error "Docker daemon is not running. Please start Docker."
    log_info "Try: sudo systemctl start docker"
    exit 1
fi

log_success "Docker is running"

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree &> /dev/null; then
    log_error "Not in a git repository. Please run this script from the project root."
    exit 1
fi

# Get git commit short hash for default tag
GIT_COMMIT_SHORT=$(git rev-parse --short HEAD)

# Set tag (use git commit hash if not specified)
if [ -z "$TAG" ]; then
    TAG="$GIT_COMMIT_SHORT"
    log_info "Using git commit hash as tag: $TAG"
fi

# =============================================================================
# Build Image
# =============================================================================

IMAGE_URL="${REGISTRY}/${IMAGE_NAME}:${TAG}"

log_info "Building Docker image..."
log_info "Image: ${IMAGE_URL}"
echo ""

# Enable BuildKit for better caching and performance
export DOCKER_BUILDKIT=1

# Build the image
docker build \
    --tag "${IMAGE_URL}" \
    --build-arg BUILDKIT_INLINE_CACHE=1 \
    .

if [ $? -ne 0 ]; then
    log_error "Docker build failed"
    exit 1
fi

log_success "Docker image built successfully: ${IMAGE_URL}"

# =============================================================================
# Tag for latest (if requested)
# =============================================================================

if [ "$TAG_LATEST" = true ]; then
    LATEST_URL="${REGISTRY}/${IMAGE_NAME}:latest"
    log_info "Tagging as latest..."
    docker tag "${IMAGE_URL}" "${LATEST_URL}"
    log_success "Tagged: ${LATEST_URL}"
fi

# =============================================================================
# Push to Registry (optional)
# =============================================================================

if [ "$PUSH_IMAGE" = true ]; then
    # Login if credentials provided
    if [ -n "$ACR_USERNAME" ] && [ -n "$ACR_PASSWORD" ]; then
        log_info "Logging in to Alibaba Cloud Container Registry..."
        echo "$ACR_PASSWORD" | docker login --username "$ACR_USERNAME" --password-stdin "$REGISTRY"
        if [ $? -ne 0 ]; then
            log_error "Failed to login to ACR"
            exit 1
        fi
        log_success "Logged in to ACR as $ACR_USERNAME"
    else
        log_warn "No ACR credentials provided. Assuming already logged in."
        log_info "To login, use: -u <username> -p <password>"
    fi

    log_info "Pushing to Alibaba Cloud Container Registry..."
    echo ""

    # Push the main tag
    docker push "${IMAGE_URL}"

    if [ $? -ne 0 ]; then
        log_error "Failed to push image: ${IMAGE_URL}"
        exit 1
    fi

    log_success "Pushed: ${IMAGE_URL}"

    # Push latest tag if requested
    if [ "$TAG_LATEST" = true ]; then
        docker push "${LATEST_URL}"
        if [ $? -ne 0 ]; then
            log_error "Failed to push latest tag"
            exit 1
        fi
        log_success "Pushed: ${LATEST_URL}"
    fi
fi

# =============================================================================
# Summary
# =============================================================================

echo ""
log_success "============================================"
if [ "$PUSH_IMAGE" = true ]; then
    log_success "Build and push completed successfully!"
else
    log_success "Build completed successfully!"
fi
log_success "============================================"
echo ""
log_info "Image URL: ${IMAGE_URL}"
if [ "$TAG_LATEST" = true ]; then
    log_info "Latest URL: ${LATEST_URL}"
fi
echo ""
log_info "To run locally:"
echo "  docker run -p 8080:80 ${IMAGE_URL}"
if [ "$PUSH_IMAGE" != true ]; then
    echo ""
    log_info "To push to ACR, add --push option:"
    echo "  $0 --push -u <username> -p <password>"
fi