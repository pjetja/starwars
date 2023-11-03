describe('My First Test', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://swapi.tech/api/people?limit=82&page=0', {
      fixture: 'heroes.json',
    }).as('getHeroes');

    cy.intercept('GET', 'https://swapi.tech/api/starships?limit=36&page=0', {
      fixture: 'spaceships.json',
    }).as('getSpaceships');

    cy.fixture('hero.json').then((data) => {
      cy.intercept('GET', 'https://swapi.tech/api/people/*', (req) => {
        const id = JSON.parse(req.url.split('/').slice(-1)[0]);

        req.reply({
          body: { ...data, result: { ...data.result, uid: id } },
        });
      });
    });

    cy.fixture('spaceship.json').then((data) => {
      cy.intercept('GET', 'https://swapi.tech/api/starships/*', (req) => {
        const id = JSON.parse(req.url.split('/').slice(-1)[0]);

        req.reply({
          body: { ...data, result: { ...data.result, uid: id } },
        });
      }).as('getSpaceship');
    });
  });

  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Star Wars Card Game');
    cy.getCY('RoundSize1').click();
    cy.getCY('StartGame').click();
    cy.getCY('SelectDeck').click();
    cy.getCY('1PCardSelect').click();
  });
});
