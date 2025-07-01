// here in this file I can declare global variables

import { Connection } from "mongoose";


// Here we're actually adding some new values or variables in the global which is available in the entire node ecosystem
declare global {
    var mongoose : {
            conn : Connection | null,
            promise : Promise<Connection> | null 
    }
}


export {}