import { exec } from 'node:child_process'

export function startUI(...args: any[]) {
  console.log(args)
  exec('pnpm run dev')
}
