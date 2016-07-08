# JSON Web Algorithms (JWA)
[![npm](https://img.shields.io/npm/v/json-web-algorithms.svg?style=flat-square)](https://npmjs.com/package/json-web-algorithms)
[![npm license](https://img.shields.io/npm/l/json-web-algorithms.svg?style=flat-square)](https://npmjs.com/package/json-web-algorithms)
[![npm downloads](https://img.shields.io/npm/dm/json-web-algorithms.svg?style=flat-square)](https://npmjs.com/package/json-web-algorithms)
[![build status](https://img.shields.io/travis/jhermsmeier/node-json-web-algorithms.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-json-web-algorithms)

JSON Web Algorithms (JWA) for JSON Object Signing and Encryption (JOSE)

## Install via [npm](https://npmjs.com)

```sh
$ npm install --save json-web-algorithms
```

## Signature Algorithms

### HMAC (Hash-based Message Authentication Code)

| Type  | Signature / MAC & Hash algorithm  |
|:-----:|:----------------------------------|
| HS256 | HMAC using SHA-256 hash algorithm |
| HS384 | HMAC using SHA-384 hash algorithm |
| HS512 | HMAC using SHA-512 hash algorithm |

### RSASSA (RSA Signature Scheme with Appendix)

| Type  | Signature / MAC & Hash algorithm    |
|:-----:|:------------------------------------|
| RS256 | RSASSA using SHA-256 hash algorithm |
| RS384 | RSASSA using SHA-384 hash algorithm |
| RS512 | RSASSA using SHA-512 hash algorithm |

### ECDSA (Elliptic Curve Digital Signature Algorithm)

| Type  | Signature / MAC & Hash algorithm                   |
|:-----:|:---------------------------------------------------|
| ES256 | ECDSA using P-256 curve and SHA-256 hash algorithm |
| ES384 | ECDSA using P-384 curve and SHA-384 hash algorithm |
| ES512 | ECDSA using P-521 curve and SHA-512 hash algorithm |

### PLAIN

| Type  | Signature / MAC & Hash algorithm           |
|:-----:|:-------------------------------------------|
| PLAIN | No digital signature or MAC value included |

## Usage

```js
var JOSE = require( 'jose' )
```

```js
// Sign something
var signature = JOSE.sign( 'HS256' input, key )
// Verify a signature
var isValid = JOSE.verify( 'HS256', signature, input, key )
```
