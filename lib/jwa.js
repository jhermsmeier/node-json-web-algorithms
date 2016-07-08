var JWA = module.exports

/**
 * Sign an input with a given algorithm
 * @param  {String} algorithm
 * @param  {Buffer} input
 * @param  {Buffer} key
 * @return {Buffer} signature
 */
JWA.sign = function( algorithm, input, key ) {

  algorithm = ( algorithm + '' ).toUpperCase()

  if( !(JWA[ algorithm ] instanceof JWA.SignatureAlgorithm) )
    throw new Error( 'Unsupported algorithm "' + algorithm + '"' )

  return JWA[ algorithm ].sign( input, key )

}

/**
 * Verify a signature with a given algorithm
 * @param  {String}  algorithm
 * @param  {Buffer}  signature
 * @param  {Buffer}  input
 * @param  {Buffer}  key
 * @return {Boolean}
 */
JWA.verify = function( algorithm, signature, input, key ) {

  algorithm = ( algorithm + '' ).toUpperCase()

  if( !(JWA[ algorithm ] instanceof JWA.SignatureAlgorithm) )
    throw new Error( 'Unsupported algorithm "' + algorithm + '"' )

  return JWA[ algorithm ].verify( signature, input, key )

}

/**
 * JWA SignatureAlgorithm
 * @constructor
 * @type {Function}
 */
JWA.SignatureAlgorithm = require( './signature' )

// NONE
JWA.PLAIN = new JWA.SignatureAlgorithm( 'PLAIN', 0 )

// HMAC
JWA.HS256 = new JWA.SignatureAlgorithm( 'HS', 256 )
JWA.HS384 = new JWA.SignatureAlgorithm( 'HS', 384 )
JWA.HS512 = new JWA.SignatureAlgorithm( 'HS', 512 )

// RSA-SSA
JWA.RS256 = new JWA.SignatureAlgorithm( 'RS', 256 )
JWA.RS384 = new JWA.SignatureAlgorithm( 'RS', 384 )
JWA.RS512 = new JWA.SignatureAlgorithm( 'RS', 512 )

// ECDSA
JWA.ES256 = new JWA.SignatureAlgorithm( 'ES', 256 )
JWA.ES384 = new JWA.SignatureAlgorithm( 'ES', 384 )
JWA.ES512 = new JWA.SignatureAlgorithm( 'ES', 512 )
