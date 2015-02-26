releases:
	make build
	grunt


build: build/server build/viewer
	cp -nr src/* $@
	cd $@ && npm install


build/server:
	npm install docvy-server
	mv node_modules/docvy-server $@


build/viewer:
	npm install docvy-viewer
	mv node_modules/docvy-viewer $@


src: src/viewer src/server


src/viewer:
	ln -sf "$$(dirname $$PWD)/docvy-viewer/dist" $$PWD/$@


src/server:
	ln -sf "$$(dirname $$PWD)/docvy-server" $$PWD/$@


.PHONY: src/viewer src/server
