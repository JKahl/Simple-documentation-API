const fastify = require( 'fastify' )( { logger: true } );

fastify.register( require( 'fastify-multipart' ) );
fastify.register(require('fastify-swagger'), {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Swagger Nazaríes API',
        description: 'Testing endpoints',
        version: '0.1.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'docs', description: 'Documents related end-points' },
      ]
    },
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true
  })
fastify.register( require( './routes/v1/docs.js' ) )

fastify.listen( 3000 )
fastify.ready().then(() => {
    fastify.swagger()
  }, (err) => {
    console.log('an error happened', err)
})