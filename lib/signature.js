var crypto = require( 'crypto' )
var asn1 = require( 'asn1.js' )
var BigNum = asn1.bignum

var ECDSASignature = asn1.define( 'ECDSA-Signature', function() {
  this.seq().obj(
    this.key( 'r' ).int(),
    this.key( 's' ).int()
  )
})

/**
 * SignatureAlgorithm
 * @constructor
 * @param {String} type
 * @param {Number} bits
 * @return {SignatureAlgorithm}
 */
function SignatureAlgorithm( type, bits ) {

  if( !(this instanceof SignatureAlgorithm) )
    return new SignatureAlgorithm( type, bits )

  if( typeof type !== 'string' )
    throw new TypeError( 'Argument "type" must be a string' )

  if( !Number.isFinite( bits ) )
    throw new TypeError( 'Argument "bits" must be a number' )

  if( !SignatureAlgorithm.type.hasOwnProperty( type ) )
    throw new Error( 'Unsupported type "' + type + '"' )

  this.type = type.toUpperCase()
  this.bits = bits | 0
  this.algorithm = SignatureAlgorithm.type[ this.type ]

  // ECDSA 512 uses 521 bits
  if( this.type === 'ES' && this.bits === 512 )
    this.bits = 521

}

/**
 * SignatureAlgorithm type algorithms
 * NOTE: OpenSSL only signs EC with SHA2
 * when specifying RSA and using an EC key
 * @type {Object}
 */
SignatureAlgorithm.type = {
  HS: 'SHA',
  RS: 'RSA-SHA',
  ES: 'RSA-SHA',
  PLAIN: null,
}

/**
 * SignatureAlgorithm prototype
 * @type {Object}
 */
SignatureAlgorithm.prototype = {

  constructor: SignatureAlgorithm,

  /**
   * Create a ECDSA signature for a given digest
   * @internal used by `.sign()`
   * @param  {Buffer} digest
   * @return {Buffer}
   */
  _signECDSA: function( digest ) {

    var signature = ECDSASignature.decode( digest, 'der' )
    var length = ( this.bits / 8 | 0 ) + ( this.bits % 8 !== 0 ? 1 : 0 )

    var r = new Buffer( signature.r.toString( 'hex', length ), 'hex' )
    var s = new Buffer( signature.s.toString( 'hex', length ), 'hex' )

    return Buffer.concat([ r, s ], r.length + s.length )

  },

  /**
   * Sign an input with a given key
   * @param  {Buffer} input
   * @param  {Buffer} key
   * @return {Buffer}
   */
  sign: function( input, key ) {

    if( !Buffer.isBuffer( input ) )
      throw new TypeError( 'Input must be a buffer' )

    if( this.type === 'PLAIN' )
      return new Buffer(0)

    if( !Buffer.isBuffer( key ) )
      throw new TypeError( 'Key must be a buffer' )

    var signature = this.type === 'HS' ?
      crypto.createHmac( this.algorithm + this.bits, key ) :
      crypto.createSign( this.algorithm + this.bits )

    signature.update( input )

    var digest = this.type === 'HS' ?
      signature.digest() :
      signature.sign( key )

    if( this.type === 'ES' )
      digest = this._signECDSA( digest )

    return digest

  },

  /**
   * Verify an HMAC signature
   * @internal used by `.verify()`
   * @param  {Buffer} signature
   * @param  {Buffer} input
   * @param  {Buffer} key
   * @return {Boolean}
   */
  _verifyHMAC: function( signature, input, key ) {

    var check = this.sign( input, key )

    return signature.toString( 'hex' ) ===
      check.toString( 'hex' )

  },

  /**
   * Verify an RSA signature
   * @internal used by `.verify()`
   * @param  {Buffer} signature
   * @param  {Buffer} input
   * @param  {Buffer} key
   * @return {Boolean}
   */
  _verifyRSA: function( signature, input, key ) {

    var verifier = crypto.createVerify( this.algorithm + this.bits )

    return verifier.update( input )
      .verify( key, signature )

  },

  /**
   * Verify an ECDSA signature
   * @internal used by `.verify()`
   * @param  {Buffer} signature
   * @param  {Buffer} input
   * @param  {Buffer} key
   * @return {Boolean}
   */
  _verifyECDSA: function( signature, input, key ) {

    var length = ( this.bits / 8 | 0 ) + ( this.bits % 8 !== 0 ? 1 : 0 )
    if( signature.length !== length * 2 )
      return false

    var sig = ECDSASignature.encode({
      r: new BigNum( signature.slice( 0, length ), 10, 'be' ).iabs(),
      s: new BigNum( signature.slice( length ), 10, 'be' ).iabs(),
    }, 'der' )

    return crypto.createVerify( this.algorithm + this.bits )
      .update( input )
      .verify( key, sig, 'base64' )

  },

  /**
   * Verify a signature against an input & key
   * @param  {Buffer} signature
   * @param  {Buffer} input
   * @param  {Buffer} key
   * @return {Boolean}
   */
  verify: function( signature, input, key ) {

    if( !Buffer.isBuffer( input ) )
      throw new TypeError( 'Input must be a buffer' )

    if( !Buffer.isBuffer( signature ) )
      throw new TypeError( 'Signature must be a buffer' )

    if( this.type === 'PLAIN' )
      return signature.length === 0

    if( !Buffer.isBuffer( key ) )
      throw new TypeError( 'Key must be a buffer' )

    switch( this.type ) {
      case 'HS': return this._verifyHMAC( signature, input, key )
      case 'RS': return this._verifyRSA( signature, input, key )
      case 'ES': return this._verifyECDSA( signature, input, key )
      default:
        throw new Error( 'Unsupported type "' + this.type + '"' )
    }

  },

}

// Exports
module.exports = SignatureAlgorithm
