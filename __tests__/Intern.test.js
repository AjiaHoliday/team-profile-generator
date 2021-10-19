const Intern = require('../lib/Intern.js');

test ('creates an intern object', () => {
    const intern = new Intern('Felisha Pots', '121', 'felisha@felishamail.com', 'CSU');
    expect(intern.name).toBe('Felisha Pots');
    expect(intern.id).toBe('121');
    expect(intern.email).toBe('felisha@felishamail.com');
    expect(intern.school).toBe('CSU');
});

test("gets intern's school",() => {
    const intern = new Intern('Felisha Pots', '121', 'felisha@felishamail.com', 'CSU');

    expect(intern.getSchool()).toEqual(expect.stringContaining('CSU'));
});

test("gets inter's role", () => {
    const intern = new Intern('Felisha Pots', '121', 'felisha@felishamail.com', 'CSU');
    
    expect(intern.getRole()).toEqual(expect.stringContaining('Intern'));
});