import { initDatabase } from '../src/db/init.js';

try {
  initDatabase();
  console.log('Database initialization completed successfully');
  process.exit(0);
} catch (error) {
  console.error('Error initializing database:', error);
  process.exit(1);
} 