import { cwd, env } from 'node:process'
import { resolve } from 'node:path'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({
  path: resolve(cwd(), '../../.env.local'),
})

export default createClient(env.SUPABASE_URL, env.SUPABASE_KEY)
