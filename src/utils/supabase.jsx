
import { useMemo } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

let client = createClient(supabaseUrl, supabaseKey)

function getSupabaseBrowserClient() {
  if (client) {
    return client
  }

  client = createBrowserClient(
    supabaseUrl,
    supabaseKey
  )

  return client
}

function useSupabaseBrowser() {
  return useMemo(getSupabaseBrowserClient, [])
}

export default useSupabaseBrowser