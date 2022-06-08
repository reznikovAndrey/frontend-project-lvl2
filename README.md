# Difference generator

### Hexlet tests and linter status:
[![Actions Status](https://github.com/reznikovAndrey/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/reznikovAndrey/frontend-project-lvl2/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/593aa5a0e8635dfa1d63/maintainability)](https://codeclimate.com/github/reznikovAndrey/frontend-project-lvl2/maintainability) [![Eslint check](https://github.com/reznikovAndrey/frontend-project-lvl2/workflows/linter-and-tests-check/badge.svg)](https://github.com/reznikovAndrey/frontend-project-lvl2/actions) [![Test Coverage](https://api.codeclimate.com/v1/badges/593aa5a0e8635dfa1d63/test_coverage)](https://codeclimate.com/github/reznikovAndrey/frontend-project-lvl2/test_coverage)

Difference generator - command line iterface program which will show differencies between two files in 3 formats:
- Stylish - (like command `git diff`) - default format
- Plain
- JSON

## Installation
Clone project
```sh
git clone git@github.com:reznikovAndrey/frontend-project-lvl2.git
```

Go in project dir
```sh
cd frontend-project-lvl2
```

Install dependecies
```sh
make install
```

Install packet in your system
```sh
# sudo could required
npm link 
```

## Usage examples
### Flat `.json` files (stylish format)
[![asciicast](https://asciinema.org/a/xg1DBeVMhemFOht3j0xHvOB0o.svg)](https://asciinema.org/a/xg1DBeVMhemFOht3j0xHvOB0o)
### Flat `.yaml` files (stylish format)
[![asciicast](https://asciinema.org/a/z7jp163HDccCwJLVlj07zwlC1.svg)](https://asciinema.org/a/z7jp163HDccCwJLVlj07zwlC1)
### Nested `.yaml` and `.json` files (stylish format)
[![asciicast](https://asciinema.org/a/85wJMsxPTvpT8IuzRee8paK21.svg)](https://asciinema.org/a/85wJMsxPTvpT8IuzRee8paK21)
### Nested `.json` files (plain format)
[![asciicast](https://asciinema.org/a/Xb0k62HGR27FnXw59SRuJ7KWc.svg)](https://asciinema.org/a/Xb0k62HGR27FnXw59SRuJ7KWc)
### Nested `.json` files (json format)
[![asciicast](https://asciinema.org/a/THNgCcktiKwfeyPMwvbVqhgvy.svg)](https://asciinema.org/a/THNgCcktiKwfeyPMwvbVqhgvy)

### Authors:
- Andrey Reznikov
