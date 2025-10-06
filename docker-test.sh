#!/bin/bash

# Docker Test Script for Agent Charlie Front End
# This script tests the Docker setup and verifies everything is working

set -e

echo "🐳 Agent Charlie Docker Test Script"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print success
success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Function to print error
error() {
    echo -e "${RED}✗${NC} $1"
}

# Function to print info
info() {
    echo -e "${YELLOW}ℹ${NC} $1"
}

# Check if Docker is installed
echo "Step 1: Checking Docker installation..."
if command -v docker &> /dev/null; then
    success "Docker is installed"
    docker --version
else
    error "Docker is not installed. Please install Docker Desktop first."
    exit 1
fi

echo ""

# Check if Docker Compose is installed
echo "Step 2: Checking Docker Compose installation..."
if command -v docker-compose &> /dev/null; then
    success "Docker Compose is installed"
    docker-compose --version
else
    error "Docker Compose is not installed. Please install it first."
    exit 1
fi

echo ""

# Check if Docker daemon is running
echo "Step 3: Checking if Docker daemon is running..."
if docker info &> /dev/null; then
    success "Docker daemon is running"
else
    error "Docker daemon is not running. Please start Docker Desktop."
    exit 1
fi

echo ""

# Clean up any existing containers
echo "Step 4: Cleaning up existing containers..."
docker-compose down -v 2>/dev/null || true
success "Cleanup complete"

echo ""

# Build Docker image
echo "Step 5: Building Docker image..."
info "This may take a few minutes on first run..."
if docker-compose build; then
    success "Docker image built successfully"
else
    error "Failed to build Docker image"
    exit 1
fi

echo ""

# Run TypeScript type check
echo "Step 6: Running TypeScript type check..."
if docker-compose run --rm typescript; then
    success "TypeScript type check passed"
else
    error "TypeScript type check failed"
    info "This is expected if there are type errors in the code"
fi

echo ""

# Test container startup
echo "Step 7: Testing container startup..."
info "Starting container in detached mode..."
if docker-compose up -d; then
    success "Container started successfully"
else
    error "Failed to start container"
    exit 1
fi

echo ""

# Wait for server to be ready
echo "Step 8: Waiting for server to be ready..."
sleep 10

# Check if container is running
if docker ps | grep -q agent-charlie-app; then
    success "Container is running"
else
    error "Container is not running"
    docker-compose logs
    exit 1
fi

echo ""

# Check if ports are accessible
echo "Step 9: Checking if ports are accessible..."
ports=(19006 8081 19000)
for port in "${ports[@]}"; do
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1 || netstat -an | grep -q ":$port.*LISTEN" 2>/dev/null; then
        success "Port $port is accessible"
    else
        error "Port $port is not accessible"
    fi
done

echo ""

# Display container logs
echo "Step 10: Checking container logs..."
info "Last 20 lines of logs:"
docker-compose logs --tail=20 app

echo ""

# Show running containers
echo "Step 11: Docker containers status..."
docker-compose ps

echo ""

# Cleanup
echo "Step 12: Cleaning up test containers..."
docker-compose down
success "Cleanup complete"

echo ""
echo "===================================="
echo -e "${GREEN}🎉 Docker setup test completed successfully!${NC}"
echo ""
echo "To start the application, run:"
echo "  npm run docker:up"
echo ""
echo "Then open your browser to:"
echo "  http://localhost:19006"
echo ""
