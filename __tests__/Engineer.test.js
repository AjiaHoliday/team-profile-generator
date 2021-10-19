const Engineer = require('../lib/Engineer');

test('creates an engineer object', () => {
    const engineer = new Engineer('Clara Jones', '22', 'clara@claramail.com', 'ClaraJonesGit' );

    expect(engineer.name).toBe('Clara Jones');
    expect(engineer.id).toBe('22');
    expect(engineer.email).toBe('clara@claramail.com');
    expect(engineer.github).toBe('ClaraJonesGit')
});

test("gets engineer's github username", () => {
    const engineer = new Engineer('Clara Jones', '22', 'clara@claramail.com', 'ClaraJonesGit' );

    expect(engineer.getGithub()).toEqual(expect.stringContaining('ClaraJonesGit'));
})

test("gets engineer's role", () => {
    const engineer = new Engineer('Clara Jones', '22', 'clara@claramail.com', 'ClaraJonesGit' );

    expect(engineer.getRole()).toEqual(expect.stringContaining('Engineer'));
})