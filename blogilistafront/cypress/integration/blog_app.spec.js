describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        const user = {
            username: 'testik',
            name: 'Testi Käyttäjä',
            password: 'kalainen'
        };
        cy.request('POST', 'http://localhost:3001/api/users', user);
        cy.visit('http://localhost:3000');

    });

    it('Login form is shown', function () {
        cy.contains('Please, log in to application');
    });

    it('user can log in with correct username and password', function () {
        cy.get('#username').type('testik');
        cy.get('#password').type('kalainen');
        cy.get('#login-button').click();
        cy.contains('Testi Käyttäjä logged in');
    });

    it('login fails with incorrect username and/or password', function () {
        cy.get('#username').type('testik');
        cy.get('#password').type('palainen');
        cy.get('#login-button').click();
        cy.contains('wrong credientials');
    });

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'testik', password: 'kalainen' });
        });

        it('A blog can be created', function () {
            cy.get('#open-form').click();
            cy.get('#title').type('New Title');
            cy.get('#author').type('New Author');
            cy.get('#url').type('http://www.newurl.fi/uusiblogi');
            cy.get('#create-blog').click();
            cy.contains('New Title, author: New Author');
        });

        describe('and there is already blog in the list', function () {
            beforeEach(function () {
                cy.newBlog({ title: 'uusi blogi', author: 'uusi author', url: 'http://uudenbloginosoite.fi', likes: 0 });
                cy.visit('http://localhost:3000');
            });

            it('Clicking the like button will update number of likes', function () {
                cy.get('#view-blog').click();
                cy.get('#like-blog').click();
                cy.contains('likes: 1');
            });

            it('User can delete blog', function () {
                cy.get('#view-blog').click();
                cy.get('#delete-blog').click();
                cy.get('html').should('not.contain', 'New Title, author: New Author');
            });

        });

        describe('and there is already several blogs in the list', function () {
            beforeEach(function () {
                cy.newBlog({ title: 'eka blogi', author: 'eka author', url: 'http://ekanbloginosoite.fi', likes: 0 });
                cy.newBlog({ title: 'toka blogi', author: 'toka author', url: 'http://tokanbloginosoite.fi', likes: 2 });
                cy.newBlog({ title: 'kolmas blogi', author: 'kolmas author', url: 'http://kolmannenbloginosoite.fi', likes: 1 });
                cy.visit('http://localhost:3000');
            });

            it('List is ordered by number of likes blog has', function () {
                cy.visit('http://localhost:3000');
                cy.get('#blog')
                    .then(blogs => {
                        cy.wrap(blogs[0]).contains('likes: 2');
                        cy.wrap(blogs[1]).contains('likes: 1');
                        cy.wrap(blogs[2]).contains('likes: 0');
                    });

            });

        });
    });
});