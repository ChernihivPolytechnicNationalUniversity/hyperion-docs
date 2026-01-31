import { createOpenAPI } from 'fumadocs-openapi/server';
import * as fs from 'node:fs';
import * as path from 'node:path';

// For runtime OpenAPI loading, scan content directory for specs
const findAllOpenAPISpecs = (): string[] => {
  const contentDir = path.resolve(process.cwd(), '../../content');
  const specs: string[] = [];

  try {
    const entries = fs.readdirSync(contentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('_')) {
        const openapiDir = path.join(contentDir, entry.name, 'openapi');
        if (fs.existsSync(openapiDir)) {
          const yamlFiles = fs.readdirSync(openapiDir)
            .filter(f => f.endsWith('.yaml') || f.endsWith('.yml'))
            .map(f => path.join(openapiDir, f));
          specs.push(...yamlFiles);
        }
      }
    }
  } catch {
    // Fallback for build time when content may not be accessible
    console.warn('Could not scan for OpenAPI specs, using empty list');
  }

  return specs;
};

const specs = findAllOpenAPISpecs();

export const openapi = createOpenAPI({
  input: specs.length > 0 ? specs : [],
});
