module.exports = {
    routes: [
        { // Path defined with an URL parameter
            method: 'GET',
            path: '/students/available', 
            handler: 'student.findAvailable',
        },
        {
            method: 'GET',
            path: '/students/findByName',
            handler: 'student.findByName',
        },
        {
            method: 'POST',
            path: '/students/findByFilters',
            handler: 'student.findByFilters',
        },

    ]
};
