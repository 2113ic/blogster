import { Command } from 'commander'
import { version } from './package.json'
import { startUI } from './src/start'

const program = new Command()

program
  .name('blog')
  .version(version)
  .description('@icxy-blog/cli is awesome')

program.command('ui')
  .description('open in your browser')
  .action(startUI)

program.parse()
