const Employee = require('../lib/Employee');

test('creates an employee object', () => {
    const employee = new Employee('Ajia Holiday', '16', 'ajia@ajiamail.com');

    expect(employee.name).toBe('Ajia Holiday');
    expect(employee.id).toBe('16');
    expect(employee.email).toBe('ajia@ajiamail.com');
});

test("gets employee's name", () => {
    const employee = new Employee('Ajia Holiday', '16', 'ajia@ajiamail.com');

    expect(employee.getName()).toEqual(expect.stringContaining('Ajia Holiday')); 
});

test("gets employee's ID", () => {
    const employee = new Employee('Ajia Holiday', '16', 'ajia@ajiamail.com');

    expect(employee.getId()).toEqual(expect.stringContaining('16')); 
});

test("gets employee's email", () => {
    const employee = new Employee('Ajia Holiday', '16', 'ajia@ajiamail.com');

    expect(employee.getEmail()).toEqual(expect.stringContaining('ajia@ajiamail.com')); 
});

test("gets employee's role", () => {
    const employee = new Employee('Ajia Holiday', '16', 'ajia@ajiamail.com');

    expect(employee.getRole()).toEqual(expect.stringContaining('Employee')); 
});