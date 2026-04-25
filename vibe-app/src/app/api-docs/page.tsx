'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { swaggerSpec } from '@/lib/swagger';

export default function ApiDocsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="bg-gray-800 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">Vibe App API Explorer</h1>
        <p className="text-sm text-gray-300">Interactive Documentation & Testing Console</p>
      </div>
      <div className="container mx-auto py-8 px-4">
        <SwaggerUI spec={swaggerSpec} />
      </div>
    </main>
  );
}
