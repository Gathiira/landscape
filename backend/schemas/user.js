export default {
    name:'user',
    title:'User',
    type:'document',
    fields : [
        {
            name:'userName',
            title:'UserName',
            type:'string',
        },
        {
            name:'phonenumber',
            title:'Phonenumber',
            type:'string',
            initialValue: null
        },
        {
            name:'email',
            title:'Email',
            type:'string',
            initialValue: null
        },
        {
            name:'image',
            title:'Image',
            type:'string',
        },
        {
            name:'isAdmin',
            title:'Admin',
            type:'boolean',
            initialValue: false
        },
        
    ]
}