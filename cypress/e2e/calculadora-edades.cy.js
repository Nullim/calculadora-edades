const URL = '127.0.0.1:8080';

context('Calculadora Edades', () => {
  
  before(() => {
    cy.visit(URL);
  });

  describe('Usa la calculadora', () => {
    it('Se asegura que la cantidad de integrantes solo acepte numeros', () => {
      cy.get('#cantidad-integrantes-familia').click().then(($input) => {
        cy.wrap($input).type('prueba');
        cy.get('#ingreso').click().then(() => {
          expect($input).to.have.class('error');
        });
      });
    });

    it('Se asegura que la cantidad de integrantes tenga al menos un numero', () => {
      cy.visit(URL);
      cy.get('#cantidad-integrantes-familia').click().then(($input) => {
        cy.get('#ingreso').click().then(() => {
          expect($input).to.have.class('error');
        });
      });
    });

    it('Se asegura que la cantidad de integrantes tenga menos de 4 digitos', () => {
      cy.visit(URL);
      cy.get('#cantidad-integrantes-familia').click().then(($input) => {
        cy.wrap($input).type('9999');
        cy.get('#ingreso').click().then(() => {
          expect($input).to.have.class('error');
        });
      });
    });

    it('Se asegura que los campos de edades existan', () => {
      cy.visit(URL);
      cy.get('#cantidad-integrantes-familia').click().then(($input) => {
        cy.wrap($input).type('1');
        cy.get('#ingreso').click().then(() => {
          cy.get('#integrantes').should('exist')
        });
      });
    });

    it('Se asegura que las edades solo acepten numeros', () => {
      cy.visit(URL);
      cy.get('#cantidad-integrantes-familia').click().then(($input) => {
        cy.wrap($input).type('2');
        cy.get('#ingreso').click().then(() => {
          cy.get('#integrante-1').click().then(($primerEdad) => {
            cy.wrap($primerEdad).type('a');
            cy.get('#calcular').click().then(() => {
              cy.get('#edad-1').should('have.class', 'error1');
            });
          });

          cy.get('#integrante-2').click().then(() => {
            cy.get('#calcular').click().then(() => {
              cy.get('#edad-2').should('have.class', 'error1');
            });
          });

          cy.get('#integrante-2').click().then(($segundaEdad) => {
            cy.wrap($segundaEdad).type(',/-.');
            cy.get('#calcular').click().then(() => {
              cy.get('#edad-2').should('have.class', 'error1');
            });
          });
        });
      });
    });

    it('Se asegura que las edades tengan al menos un numero', () => {
      cy.visit(URL);
      cy.get('#cantidad-integrantes-familia').click().then(($input) => {
        cy.wrap($input).type('1');
        cy.get('#ingreso').click().then(() => {
          cy.get('#calcular').click().then(() => {
            cy.get('#edad-1').should('have.class', 'error1')
          });
        });
      });
    });

    it('Se asegura que las edades tengan menos de 5 numeros', () => {
      cy.visit(URL);
      cy.get('#cantidad-integrantes-familia').click().then(($input) => {
        cy.wrap($input).type('1');
        cy.get('#ingreso').click().then(() => {
          cy.get('#integrante-1').click().then(($primerEdad) => {
            cy.wrap($primerEdad).type('99999');
            cy.get('#calcular').click().then(() => {
              cy.get('#edad-1').should('have.class', 'error1')
            });
          });
        });
      });
    });

    it('Utiliza la calculadora de la manera intencionada', () => {
      cy.visit(URL);
      cy.get('#cantidad-integrantes-familia').click().then(($input) => {
        cy.wrap($input).type('1');
        cy.get('#ingreso').click().then(() => {
          cy.get('#integrante-1').click().then(($primerEdad) => {
            cy.wrap($primerEdad).type('45');
            cy.get('#calcular').click().then(() => {
              cy.get('#analisis').should('not.have.class', 'oculto');
            });
            it('Se asegura que los campos desaparezcan cuando se aprete el boton reiniciar', () => {
              cy.get('#resetear').click().then(() => {
                cy.get('#calcular').should('have.class', 'oculto');
                cy.get('#integrantes').should('be.empty');
              });
            });
          });
        });
      });
    });
    it('Se asegura que los campos desaparezcan cuando se aprete el boton reiniciar', () => {
      cy.visit(URL);
      cy.get('#cantidad-integrantes-familia').click().then(($input) => {
        cy.wrap($input).type('1');
        cy.get('#ingreso').click().then(() => {
          cy.get('#integrante-1').click().then(($primerEdad) => {
            cy.wrap($primerEdad).type('45');
            cy.get('#calcular').click().then(() => {
              cy.get('#resetear').click().then(() => {
                cy.get('#calcular').should('have.class', 'oculto');
                cy.get('#integrantes').invoke('text').invoke('trim').should('equal', '')
              });
            }); 
          });
        });
      });
    });
  });
});
