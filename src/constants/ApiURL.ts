// Apicall to get the list of available employees.
export const fetchEmployees = () => fetch('/api/employees');

// Apicall to save a new employee.
export const saveEmployee = (data: any) =>
  fetch('/api/employees', {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  })

// Apicall to update the `State` of a given employee. Used in `List/EmployeeList.tsx`.
export const updateEmployee = (id: number, state: string) =>
  fetch(`/api/employees/${id}`, {
      headers: {
          'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({state})
  })
