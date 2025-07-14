const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
require('@testing-library/jest-dom');

// Mock react-pdf and pdfjs to avoid ESM import issues in Jest
jest.mock('react-pdf', () => ({
  Document: () => null,
  Page: () => null,
  pdfjs: {
    GlobalWorkerOptions: {},
    version: '3.0.0',
  },
}));

// Mock IntersectionObserver for jsdom environment (fixes framer-motion and other component test errors)
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  disconnect() { return null; }
  unobserve() { return null; }
}; 