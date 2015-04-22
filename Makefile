releases: pre-build build
	grunt


pre-build:
	sudo pip install -r script/ci-requirements.txt
	mkdir -p build


build: build/server build/viewer
	script/meta-gen.js
	cp -nr src/* $@
	cd $@ && npm install


build/server:
	npm install docvy/server#develop
	mv node_modules/server $@


build/viewer:
	npm install docvy/viewer#develop
	cd node_modules/viewer && npm install && grunt dist
	mv node_modules/viewer/dist $@


links: src
src: src/viewer src/server src/meta


src/viewer:
	ln -sf "$$(dirname $$PWD)/viewer/dist" $$PWD/$@


src/server:
	ln -sf "$$(dirname $$PWD)/server" $$PWD/$@


src/meta:
	ln -sf "$$PWD/build/meta" $$PWD/$@


ci-push: releases
	script/ci-release.py


.PHONY: links ci-push
