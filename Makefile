releases: pre-build build
	grunt


pre-build:
	pip install -r ci-requirements.txt
	mkdir -p build


build: build/server build/viewer
	cp -nr src/* $@
	cd $@ && npm install


build/server:
	npm install GochoMugo/docvy-server#develop
	mv node_modules/docvy-server $@


build/viewer:
	npm install GochoMugo/docvy-viewer#develop
	cd node_modules/docvy-viewer && npm install && grunt dist
	mv node_modules/docvy-viewer/dist $@


src: src/viewer src/server


src/viewer:
	ln -sf "$$(dirname $$PWD)/docvy-viewer/dist" $$PWD/$@


src/server:
	ln -sf "$$(dirname $$PWD)/docvy-server" $$PWD/$@


src/meta:
	ln -sf "$$PWD/build/meta" $$PWD/$@

