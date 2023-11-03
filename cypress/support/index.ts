/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line import/no-unresolved
import '@cypress/code-coverage/support';

declare global {
  namespace Cypress {
    interface Chainable {
      getCY(value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
