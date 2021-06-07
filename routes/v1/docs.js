const handlers = require( '../../handlers/v1/docs.js' );

function routes ( fastify, opts, done  ) {

  fastify.post( '/doc', opts, async function ( request, reply ) {

    reply.send( await handlers.postDoc( request ) );

  } )
  
  fastify.get( '/doc/all', opts,  async function ( request, reply ) {
   
    //console.log( "///", request.params.name )
    let query = request.query;
    let response = await handlers.getDocs( query )
    console.log( response )
    reply.send( response );

  } )

  done()

}

module.exports = routes;