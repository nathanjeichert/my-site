import fs from 'fs';
import path from 'path';
import { MusicContent, ShowsContent, AboutContent, SiteContent } from '@/types/content';

const contentDirectory = path.join(process.cwd(), 'content');

export function getMusicContent(): MusicContent {
  const filePath = path.join(contentDirectory, 'music.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function getShowsContent(): ShowsContent {
  const filePath = path.join(contentDirectory, 'shows.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function getAboutContent(): AboutContent {
  const filePath = path.join(contentDirectory, 'about.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export function getSiteContent(): SiteContent {
  const filePath = path.join(contentDirectory, 'site.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}