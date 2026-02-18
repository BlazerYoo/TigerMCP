import { defineConfig } from 'wxt';

export default defineConfig({
    manifest: {
        'js': ['entrypoints/content.js'],
        'matches': ['https://chatgpt.com/*'],
    }, 
});