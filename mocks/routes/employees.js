const EMPLOYEES = [
    {
        id: 1,
        firstname: 'Alan',
        lastname: 'Reed',
        role: 'Secretary',
        state: 'added',
        picUrl: 'idpic.png'
    },
    {
        id: 2,
        firstname: 'Jane',
        lastname: 'Doe',
        role: 'Accounting',
        state: 'in-check',
        picUrl: 'owl.png'
    },
    {
        id: 3,
        firstname: 'Jannet',
        lastname: 'Kayt',
        role: 'Secretary',
        state: 'in-check',
        picUrl: 'idpic.png'
    },
];

const routes = [
    {
        id: 'get-employees',
        url: '/api/employees',
        method: 'GET',
        variants: [
            {
                id: 'success',
                response: {
                    status: 200,
                    body: EMPLOYEES
                }
            },
            {
                id: 'error',
                response: {
                    status: 400,
                    body: {
                        message: "Error"
                    }
                }
            }
        ]
    },
    {
        id: 'add-employee',
        url: '/api/employees',
        method: 'POST',
        variants: [
            {
                id: 'success',
                response: (req, res) => {
                    const employee = {
                        id: EMPLOYEES.length + 1,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        role: req.body.role,
                        state: 'added'
                    };

                    EMPLOYEES.push(employee);
                    console.log('Body request: ', req.body)

                    res.status(200)
                    res.send(employee);
                }
            },
            {
                id: 'error',
                response: {
                    status: 400,
                    body: {
                        message: "Error"
                    }
                }
            }
        ]
    },
    {
        id: 'update-employee',
        url: '/api/employees/:id',
        method: 'PATCH',
        variants: [
            {
                id: 'success',
                response: (req, res) => {
                    const employeeId = Number(req.params.id)
                    const employee = EMPLOYEES.find(item => item.id === employeeId)

                    employee.state = req.body.state
                    EMPLOYEES.splice(EMPLOYEES.findIndex(item => item.id === employeeId), 1, employee)

                    res.status(200)
                    res.send(employee)
                }
            },
            {
                id: 'error',
                response: {
                    status: 400,
                    body: {
                        message: "Error"
                    }
                }
            }
        ]
    },
]

module.exports = routes
