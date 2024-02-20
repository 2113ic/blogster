#!/usr/bin/env node
import { Command } from 'commander'
import { version } from './package.json'

const program = new Command()

program
  .name('blog')
  .description('@icxy-blog command line tools')
  .version(version)

program.command('login')
  .description('Connect to Supabase data & authorize login via GitHub')

program.command('logout')
  .description('Log out and clear authentication information')

program.command('ui')
  .description('Open the UI operation interface')
  .option('-o, --open', 'Automatically open in the browser')
  .option('-p, --port <port>', 'Specify the port number for the UI interface')

program.command('add')
  .description('Add a new article')
  .option('-d, --draft', 'Add as a draft')
  .option('-c, --category <category>', 'Specify the category of the article')

program.command('del <articleId>')
  .description('Delete an article')
  .option('-f, --force', 'Force deletion without confirmation prompt')

program.command('ls')
  .description('List all articles (excluding drafts)')
  .option('-a, --all', 'List all articles, including drafts')
  .option('-d, --draft', 'List only draft articles')
  .option('-c, --category <category>', 'Filter articles by category')

program.parse()
