
build: components
	@component build --dev

components:
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean