# Kubernetes Intro

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Run a Docker Registry Locally](#run-a-docker-registry-locally)
  - [Enable Kubernetes on Docker Desktop for Mac/Windows](#enable-kubernetes-on-docker-desktop-for-macwindows)
  - [(Optional) Download the VSCode Kubernetes Extension](#optional-download-the-vscode-kubernetes-extension)
- [How to Deploy an Application](#how-to-deploy-an-application)
  - [Containerize Your Application](#containerize-your-application)
  - [Write a Kubernetes Deployment](#write-a-kubernetes-deployment)
  - [Write a Kubernetes Service](#write-a-kubernetes-service)
  - [Deploy](#deploy)
    - [Apply the Deployment and Service Manifests](#apply-the-deployment-and-service-manifests)
    - [Check if Service is Running](#check-if-service-is-running)
  - [🎉 Congratulations 🎉](#-congratulations-)
- [Cleanup](#cleanup)
- [Useful Commands](#useful-commands)
  - [Set your default namespace so you don't accidentally push to `default`](#set-your-default-namespace-so-you-dont-accidentally-push-to-default)
  - [View your current contexts (you probably have docker-desktop and a cloud provider)](#view-your-current-contexts-you-probably-have-docker-desktop-and-a-cloud-provider)
  - [Switch to the docker-desktop context](#switch-to-the-docker-desktop-context)
  - [Run an Ubuntu container in the cluster to debug](#run-an-ubuntu-container-in-the-cluster-to-debug)
- [FAQ](#faq)
  - [I enabled Kubernetes in Docker for Desktop (Mac), but I can't access my NodePort. What do I do?](#i-enabled-kubernetes-in-docker-for-desktop-mac-but-i-cant-access-my-nodeport-what-do-i-do)

Watch celebreties expalin Kubernetes!

[![Celebrities Explain DevOps](https://img.youtube.com/vi/QxvmO-QlxJQ/0.jpg)](https://www.youtube.com/watch?v=QxvmO-QlxJQ)

## Prerequisites

- Have [Docker Desktop](https://www.docker.com/products/docker-desktop) installed

## Getting Started

### Run a Docker Registry Locally

First things first, startup your own local Docker Registry on localhost:5000 by doing:

```sh
docker-compose up
```

### Enable Kubernetes on Docker Desktop for Mac/Windows

1. Click the Docker Desktop icon in the tray and select "preferences"
2. Click Kubernetes
3. Check "Enable Kubernetes"
4. Click "Apply & Restart"

### (Optional) Download the VSCode Kubernetes Extension

If you use VS Code, download the [Kubernetes extension](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools).
It provides you with documentation on hover for each of the fields in a Kubernetes manifest.

## How to Deploy an Application

### Containerize Your Application

1. Write a Dockerfile for your app.
2. Build and tag your image and remember to:
    1. Prefix it with the domain name/port if you want to deploy to a registry that isn't docker.io.
    2. Version it with a git tag or the commit hash.
3. `docker push` the built image to a container registry.

### Write a Kubernetes Deployment

1. Copy the [frontend.deployment.yml](./frontend/manifests/dev/frontend.deployment.yml)
for now since it is pretty basic and has comments describing it.
2. In the deployment.yml, make sure the container image name is set to the same name of the image
that was sent to the container registry via `docker push`.
3. Ensure that there is a label called `app` and it has a name representing this deployment.

> Note: VS Code users who've installed the Kubernetes extension have access to
> snippets for generating Kubernetes yaml manifests.

### Write a Kubernetes Service

1. Copy the [frontend.service.yml](./frontend/manifests/dev/frontend.service.yml).
2. Ensure that the selector has the `app` label that was given to the deployment.

### Deploy

#### Apply the Deployment and Service Manifests

```sh
kubectl apply -f your-app.deployment.yml
kubectl apply -f your-app.service.yml
```

#### Check if Service is Running

```sh
kubectl get svc
```

### 🎉 Congratulations 🎉

Your application is deployed! You may now access it on your own host.

## Cleanup

Let's delete the Kubernetes objects that were created in the above steps.

The service can be deleted by doing:

```sh
kubectl delete service yourservicename
```

> Note: If you are unsure of the service name, you can use `kubectl get svc` to find it.

You can delete the deployment by doing:

```sh
kubectl delete deployment yourdeploymentname
```

> Note: If you are unsure of the deployment name, you can use `kubectl get deployments` to find it.

## Useful Commands

[Kubernetes Cheatsheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

### Set your default namespace so you don't accidentally push to `default`

This is useful when you have a shared cluster in the cloud, and you have an assigned
namespace that you wish to use.

```sh
kubectl config set-context --current --namespace=joe
```

Verify it!

```sh
kubectl config view | grep namespace
```

### View your current contexts (you probably have docker-desktop and a cloud provider)

```sh
kubectl config get-contexts
```

### Switch to the docker-desktop context

```sh
kubectl config use-context docker-desktop
```

### Run an Ubuntu container in the cluster to debug

```sh
kubectl run -i --tty --rm debug --image=ubuntu --restart=Never -- bash
```

## FAQ

### I enabled Kubernetes in Docker for Desktop (Mac), but I can't access my NodePort. What do I do?

Restart your computer.
