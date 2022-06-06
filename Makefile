install:
	npm ci

lint:
	npx eslint .

test:
	npx --experimental-vm-modules jest