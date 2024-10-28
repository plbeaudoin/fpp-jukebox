'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useState } from 'react'


export function getPlaylist(supabase) {
  return supabase
    .from('Playlist')
    .select(
      `id,
       song_id,
       Song (id, title, artist, duration, image),
       position
    `
    )
    .order('position', { ascending: true })
    .throwOnError()
}


export const ReactQueryClientProvider = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  )
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export const updateSongPosition = async ({ songId, newPosition }) => {
  const { data, error } = await supabase
    .from('songs') // replace 'songs' with your actual table name
    .update({ position: newPosition })
    .eq('id', songId);

  if (error) throw new Error(error.message);
  return data;
};