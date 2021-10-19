const Manager = require('../lib/Manager.js');

test('creates a manager object', () => {
    const manager = new Manager('Toni Hicks', '156', 'toni@tonimail.com', 'Clark 201');
    
    expect(manager.name).toBe('Toni Hicks');
    expect(manager.id).toBe('156');
    expect(manager.email).toBe('toni@tonimail.com');
    expect(manager.officeNumber).toBe('Clark 201');
});

test("gets manager's role", () => {
    const manager = new Manager('Toni Hicks', '156', 'toni@tonimail.com', 'Clark 201');

    expect(manager.getRole()).toEqual(expect.stringContaining('Manager'));
})