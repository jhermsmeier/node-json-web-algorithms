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

# Usage

```js
var JOSE = require( 'jose' )
```

```js
// Sign something
var signature = JOSE.sign( 'HS256' input, key )
// Verify a signature
var isValid = JOSE.verify( 'HS256', signature, input, key )
```

# API Reference

<a name="JWA"></a>

## JWA : <code>Object</code>
JSON Web Algorithms

**Kind**: global variable

* [JWA](#JWA) : <code>Object</code>
    * [.SignatureAlgorithm](#JWA.SignatureAlgorithm) : <code>function</code>
        * [new JWA.SignatureAlgorithm()](#new_JWA.SignatureAlgorithm_new)
    * [.sign(algorithm, input, key)](#JWA.sign) ⇒ <code>Buffer</code>
    * [.verify(algorithm, signature, input, key)](#JWA.verify) ⇒ <code>Boolean</code>

<a name="JWA.SignatureAlgorithm"></a>

### JWA.SignatureAlgorithm : <code>function</code>
**Kind**: static class of <code>[JWA](#JWA)</code>
<a name="new_JWA.SignatureAlgorithm_new"></a>

#### new JWA.SignatureAlgorithm()
JWA SignatureAlgorithm

<a name="JWA.sign"></a>

### JWA.sign(algorithm, input, key) ⇒ <code>Buffer</code>
Sign an input with a given algorithm

**Kind**: static method of <code>[JWA](#JWA)</code>
**Returns**: <code>Buffer</code> - signature

| Param | Type |
| --- | --- |
| algorithm | <code>String</code> |
| input | <code>Buffer</code> |
| key | <code>Buffer</code> |

<a name="JWA.verify"></a>

### JWA.verify(algorithm, signature, input, key) ⇒ <code>Boolean</code>
Verify a signature with a given algorithm

**Kind**: static method of <code>[JWA](#JWA)</code>

| Param | Type |
| --- | --- |
| algorithm | <code>String</code> |
| signature | <code>Buffer</code> |
| input | <code>Buffer</code> |
| key | <code>Buffer</code> |

<a name="SignatureAlgorithm"></a>

## SignatureAlgorithm
**Kind**: global class

* [SignatureAlgorithm](#SignatureAlgorithm)
    * [new SignatureAlgorithm(type, bits)](#new_SignatureAlgorithm_new)
    * _instance_
        * [._signECDSA(digest)](#SignatureAlgorithm+_signECDSA) ⇒ <code>Buffer</code>
        * [.sign(input, key)](#SignatureAlgorithm+sign) ⇒ <code>Buffer</code>
        * [._verifyHMAC(signature, input, key)](#SignatureAlgorithm+_verifyHMAC) ⇒ <code>Boolean</code>
        * [._verifyRSA(signature, input, key)](#SignatureAlgorithm+_verifyRSA) ⇒ <code>Boolean</code>
        * [._verifyECDSA(signature, input, key)](#SignatureAlgorithm+_verifyECDSA) ⇒ <code>Boolean</code>
        * [.verify(signature, input, key)](#SignatureAlgorithm+verify) ⇒ <code>Boolean</code>
    * _static_
        * [.type](#SignatureAlgorithm.type) : <code>Object</code>

<a name="new_SignatureAlgorithm_new"></a>

### new SignatureAlgorithm(type, bits)
SignatureAlgorithm


| Param | Type |
| --- | --- |
| type | <code>String</code> |
| bits | <code>Number</code> |

<a name="SignatureAlgorithm+_signECDSA"></a>

### signatureAlgorithm._signECDSA(digest) ⇒ <code>Buffer</code>
Create a ECDSA signature for a given digest

**Kind**: instance method of <code>[SignatureAlgorithm](#SignatureAlgorithm)</code>
**Internal**: used by `.sign()`

| Param | Type |
| --- | --- |
| digest | <code>Buffer</code> |

<a name="SignatureAlgorithm+sign"></a>

### signatureAlgorithm.sign(input, key) ⇒ <code>Buffer</code>
Sign an input with a given key

**Kind**: instance method of <code>[SignatureAlgorithm](#SignatureAlgorithm)</code>

| Param | Type |
| --- | --- |
| input | <code>Buffer</code> |
| key | <code>Buffer</code> |

<a name="SignatureAlgorithm+_verifyHMAC"></a>

### signatureAlgorithm._verifyHMAC(signature, input, key) ⇒ <code>Boolean</code>
Verify an HMAC signature

**Kind**: instance method of <code>[SignatureAlgorithm](#SignatureAlgorithm)</code>
**Internal**: used by `.verify()`

| Param | Type |
| --- | --- |
| signature | <code>Buffer</code> |
| input | <code>Buffer</code> |
| key | <code>Buffer</code> |

<a name="SignatureAlgorithm+_verifyRSA"></a>

### signatureAlgorithm._verifyRSA(signature, input, key) ⇒ <code>Boolean</code>
Verify an RSA signature

**Kind**: instance method of <code>[SignatureAlgorithm](#SignatureAlgorithm)</code>
**Internal**: used by `.verify()`

| Param | Type |
| --- | --- |
| signature | <code>Buffer</code> |
| input | <code>Buffer</code> |
| key | <code>Buffer</code> |

<a name="SignatureAlgorithm+_verifyECDSA"></a>

### signatureAlgorithm._verifyECDSA(signature, input, key) ⇒ <code>Boolean</code>
Verify an ECDSA signature

**Kind**: instance method of <code>[SignatureAlgorithm](#SignatureAlgorithm)</code>
**Internal**: used by `.verify()`

| Param | Type |
| --- | --- |
| signature | <code>Buffer</code> |
| input | <code>Buffer</code> |
| key | <code>Buffer</code> |

<a name="SignatureAlgorithm+verify"></a>

### signatureAlgorithm.verify(signature, input, key) ⇒ <code>Boolean</code>
Verify a signature against an input & key

**Kind**: instance method of <code>[SignatureAlgorithm](#SignatureAlgorithm)</code>

| Param | Type |
| --- | --- |
| signature | <code>Buffer</code> |
| input | <code>Buffer</code> |
| key | <code>Buffer</code> |

<a name="SignatureAlgorithm.type"></a>

### SignatureAlgorithm.type : <code>Object</code>
SignatureAlgorithm type algorithms
NOTE: OpenSSL only signs EC with SHA2
when specifying RSA and using an EC key

**Kind**: static property of <code>[SignatureAlgorithm](#SignatureAlgorithm)</code>
