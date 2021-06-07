
function Handlers () {

    const fs = require( 'fs' );
    const { pipeline } = require('stream')
    const util = require( 'util' );
    const pump = util.promisify(pipeline);
    const path = require('path')

    this.getDocs =  function ( query ) {

        let response;

        if ( "filter" in query ) { 
            
            let file_list = { "files": [] };

            files = fs.readdirSync( "./uploads/" )
    
            files.forEach( function ( file ) {
                
                if ( query.filter == "" ) { 
                    file_list.files.push( file ); 
                } else if ( file.includes(query.filter) ) { 
                    file_list.files.push( file ); 
                }
                
            })

            response = file_list;
    
            
        } else {
            response = "There's no filter"
        }

        
        return response;
        
    }

    this.postDoc = async function ( request ) {
        const options = {};
        const data = await request.file( options )
        await pump( data.file, fs.createWriteStream( "./uploads/" + data.filename ) )

        return { success: true }
    }

}

let handler_module = new Handlers;

module.exports = handler_module;