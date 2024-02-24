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

program.parse()
