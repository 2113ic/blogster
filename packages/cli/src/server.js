import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const clientPath = fileURLToPath(
  new URL('../../client/dist', import.meta.url),
)

export async function server() {
  const server = await createServer({
    root: clientPath,
    server: { port: 3000 },
  })
  await server.listen()

  server.printUrls()
  server.bindCLIShortcuts({ print: true })
}
