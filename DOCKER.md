# Docker Setup Guide - Agent Charlie Front End

This guide explains how to run and test the Agent Charlie Front End application using Docker.

## Prerequisites

- Docker Desktop (v20.10 or higher)
- Docker Compose (v2.0 or higher)

## Quick Start

### 1. Build the Docker Image

```bash
npm run docker:build
```

Or directly:
```bash
docker-compose build
```

### 2. Start the Development Server

```bash
npm run docker:up
```

Or directly:
```bash
docker-compose up
```

The application will be available at:
- **Web**: http://localhost:19006
- **Metro Bundler**: http://localhost:8081
- **Expo DevTools**: http://localhost:19000

### 3. Stop the Development Server

```bash
npm run docker:down
```

Or use `Ctrl+C` and then:
```bash
docker-compose down
```

## Available Docker Scripts

### Development

```bash
# Build Docker images
npm run docker:build

# Start all services
npm run docker:up

# Stop all services
npm run docker:down

# View logs
npm run docker:logs

# Access container shell
npm run docker:shell
```

### Testing & Type Checking

```bash
# Run TypeScript type checking
npm run docker:type-check

# Run tests (when implemented)
npm run docker:test
```

### Cleanup

```bash
# Remove containers, volumes, and clean up
npm run docker:clean
```

## Docker Services

### Main Application Service (`app`)

The primary development service that runs the Expo dev server.

**Ports:**
- `19006`: Expo web interface
- `8081`: Metro bundler
- `19000`: Expo dev tools
- `19001`: Expo dev server

**Command:**
```bash
docker-compose up app
```

### TypeScript Checker Service (`typescript`)

Runs TypeScript type checking without emitting files.

**Command:**
```bash
docker-compose run --rm typescript
```

**Output:**
- Shows TypeScript compilation errors
- Validates type safety across the project

### Test Service (`test`)

Runs the test suite (for future implementation).

**Command:**
```bash
docker-compose run --rm test
```

## Development Workflow

### Starting Development

1. **Build the image** (first time or after dependency changes):
   ```bash
   npm run docker:build
   ```

2. **Start the dev server**:
   ```bash
   npm run docker:up
   ```

3. **Open the app**:
   - Navigate to http://localhost:19006 in your browser
   - Use Expo Go app to scan QR code (if available)

### Making Changes

All code changes are automatically synced to the container via volume mounts. The Metro bundler will hot-reload your changes.

### Viewing Logs

```bash
# Follow logs from all services
docker-compose logs -f

# Follow logs from specific service
docker-compose logs -f app
```

### Debugging

Access the container shell for debugging:

```bash
npm run docker:shell
```

Inside the container, you can run:
```bash
# Check dependencies
npm list

# Run specific commands
npx expo --version

# View environment variables
printenv
```

## Environment Variables

The following environment variables are set in Docker:

```yaml
EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0  # Allow external connections
REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0  # Metro bundler hostname
NODE_ENV=development  # Development mode
```

To add custom environment variables:

1. Create a `.env` file in the project root
2. Add variables:
   ```
   API_URL=http://your-api.com
   API_KEY=your-key
   ```
3. Update `docker-compose.yml` to include them:
   ```yaml
   environment:
     - API_URL=${API_URL}
     - API_KEY=${API_KEY}
   ```

## Volume Mounts

The following directories are mounted as volumes:

- `.:/app` - Project root (all code changes synced)
- `/app/node_modules` - Node modules (isolated from host)
- `/app/.expo` - Expo cache (isolated from host)

This ensures:
- ✅ Hot reloading works
- ✅ Fast file sync
- ✅ No platform-specific dependency conflicts

## Networking

All services are connected via the `agent-charlie-network` bridge network, allowing them to communicate with each other.

To access the app from other devices on your network:

1. Find your host machine's IP address:
   ```bash
   # macOS/Linux
   ifconfig | grep "inet "

   # Windows
   ipconfig
   ```

2. Update `REACT_NATIVE_PACKAGER_HOSTNAME` in docker-compose.yml:
   ```yaml
   environment:
     - REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.100  # Your IP
   ```

3. Access from mobile device:
   ```
   http://192.168.1.100:19006
   ```

## Troubleshooting

### Port Already in Use

If you see "port already in use" errors:

```bash
# Find and kill processes using the ports
lsof -ti:19006 | xargs kill -9
lsof -ti:8081 | xargs kill -9

# Or change ports in docker-compose.yml
```

### Slow Performance

Docker on macOS/Windows can be slow. To improve performance:

1. Allocate more resources in Docker Desktop settings
2. Use `.dockerignore` to exclude unnecessary files (already configured)
3. Consider using Docker volumes instead of bind mounts for `node_modules`

### Container Won't Start

```bash
# View detailed logs
docker-compose logs app

# Rebuild from scratch
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Dependencies Out of Sync

```bash
# Rebuild with fresh dependencies
npm run docker:clean
npm run docker:build
```

### Cannot Access from Browser

1. Ensure Docker container is running:
   ```bash
   docker ps
   ```

2. Check if ports are properly mapped:
   ```bash
   docker port agent-charlie-app
   ```

3. Try accessing with explicit localhost:
   ```
   http://localhost:19006
   http://127.0.0.1:19006
   ```

## Production Build (Future)

For production builds, create a separate Dockerfile:

```dockerfile
# Dockerfile.prod
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -f Dockerfile.prod -t agent-charlie-prod .
docker run -p 80:80 agent-charlie-prod
```

## Best Practices

1. **Keep Docker images small**
   - Use `.dockerignore` to exclude unnecessary files
   - Use multi-stage builds for production

2. **Don't commit sensitive data**
   - Never commit `.env` files with secrets
   - Use Docker secrets or environment variables

3. **Regular cleanup**
   - Run `npm run docker:clean` periodically
   - Remove unused images: `docker image prune -a`

4. **Version control**
   - Pin dependency versions in package.json
   - Tag Docker images with version numbers

5. **Security**
   - Keep base images updated
   - Scan for vulnerabilities: `docker scan agent-charlie-app`

## CI/CD Integration

Example GitHub Actions workflow:

```yaml
name: Docker Build & Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build Docker image
        run: docker-compose build

      - name: Run TypeScript checks
        run: docker-compose run --rm typescript

      - name: Run tests
        run: docker-compose run --rm test
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Expo in Docker](https://docs.expo.dev/guides/using-expo-in-docker/)
- [React Native DevTools](https://reactnative.dev/docs/debugging)

## Support

For issues related to:
- **Docker setup**: See this guide
- **Application code**: See README.md and SETUP.md
- **Expo/React Native**: Check official documentation

---

**Happy Coding! 🐳🚀**
