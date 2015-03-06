releases: pre-build build
	grunt


pre-build:
	mkdir -p build


build: build/server build/viewer
	cp -nr src/* $@
	cd $@ && npm install


build/server:
	npm install GochoMugo/docvy-server#develop
	mv node_modules/docvy-server $@


build/viewer:
	npm install GochoMugo/docvy-viewer#develop
	mv node_modules/docvy-viewer $@


src: src/viewer src/server


src/viewer:
	ln -sf "$$(dirname $$PWD)/docvy-viewer/dist" $$PWD/$@


src/server:
	ln -sf "$$(dirname $$PWD)/docvy-server" $$PWD/$@

