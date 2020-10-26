PHONY: build-back build-front build push-back push-front push deploy-back deploy-front deploy config-back ingress undeploy

ingress:
	kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.40.2/deploy/static/provider/cloud/deploy.yaml

build-back:
	docker build -t localhost:5000/backend ./backend
build-front:
	docker build -t localhost:5000/frontend ./frontend
build: build-back build-front

push-back:
	docker push localhost:5000/backend
push-front:
	docker push localhost:5000/frontend
push: push-back push-front

deploy-back:
	kubectl apply -f ./backend/manifests/dev/backend.deployment.yml
	kubectl apply -f ./backend/manifests/dev/backend.service.yml
deploy-front:
	kubectl apply -f ./frontend/manifests/dev/frontend.deployment.yml
	kubectl apply -f ./frontend/manifests/dev/frontend.service.yml
	# kubectl apply -f ./frontend/manifests/dev/frontend.ingress.yml
deploy: deploy-back deploy-front

undeploy:
	kubectl delete deployment backend
	kubectl delete deployment frontend
	kubectl delete svc dateapplication
	kubectl delete svc frontend-service

# TODO: Add config-map support
config-back:
	kubectl apply -f ./backend/manifests/dev/
