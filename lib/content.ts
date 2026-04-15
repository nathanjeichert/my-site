import fs from 'fs';
import path from 'path';
import { ShowsContent } from '@/types/content';

const contentDirectory = path.join(process.cwd(), 'content');

export function getShowsContent(): ShowsContent {
  const filePath = path.join(contentDirectory, 'shows.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}
