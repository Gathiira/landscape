export default {
    name:'pin',
    title:'Pin',
    type:'document',
    fields : [
        {
            name:'title',
            title:'Title',
            type:'string',
        },
        {
            name:'about',
            title:'About',
            type:'string',
        },
        {
            name:'category',
            title:'Category',
            type: 'array',
            of: [{type: 'string'}]
        },
        {
            name:'image',
            title:'Image',
            type:'image',
            options : {
                hotspot: true
            }
        },
        {
            name:'postedBy',
            title:'PostedBy',
            type:'postedBy',
        },
        {
            name:'save',
            title:'Save',
            type:'array',
            of: [{type:"save"}]
        },
        {
            name:'comments',
            title:'Comments',
            type:'array',
            of: [{type:"comment"}]
        },
    ]
}