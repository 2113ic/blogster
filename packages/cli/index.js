import { Command } from 'commander'
import { server } from './src/server'
import { version } from './package.json'

const program = new Command()

program
  .name('blog')
  .version(version)
  .description('@icxy-blog/cli is awesome')

program.command('ui')
  .description('open in your browser')
  .action(server)

program.parse()
