import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    viewportHeight: 1000,
    viewportWidth: 1280,
  },
});
