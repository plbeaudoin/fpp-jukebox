'use client';

import { getPlaylist } from "../../lib/db";
import useSupabaseBrowser from "../../utils/supabase";
import { useQuery, useSubscription } from "@supabase-cache-helpers/postgrest-react-query";
import SongItem from "./song";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion

export default function Songs() {
  const supabase = useSupabaseBrowser();
  const { data: playlist, isLoading, isError, error, refetch } = useQuery(getPlaylist(supabase))


  const [indexRow, setIndexRow] = useState(false);

  const { status } = useSubscription(
    supabase,
    "realtime:public:Playlist",
    {
      event: "*",
      schema: "public",
      table: "Playlist",
    },
    ["id"],
    {
      callback: (payload) => {
        console.log("Subscription event payload:", payload);
        // refetch();
      },
    }
  );

  const handleItemClick = (selectedIndex) => {
    setIndexRow(indexRow === selectedIndex ? false : selectedIndex);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError || !playlist) return <div>Error: {error?.message}</div>;

  return (
    <ul className="flex flex-col gap-4">
      <AnimatePresence>
        {playlist.map((row, idx) => (
          <motion.li
            key={row.id}
            layoutId={`song-${row.id}`}
            initial={{ opacity: 0, y: 20 }}  // Start with a slight fade and upward offset
            animate={{ opacity: 1, y: 0 }}  // Animate to full opacity and original position
            exit={{ opacity: 0, y: -20 }}  // Animate out with a fade and upward offset
            transition={{ duration: 0.3 }}  // Set duration for smoothness
          >
            <motion.div layout="position">
              <SongItem
                row={row}
                isSelected={indexRow === row.id}
                isFirst={idx === 0}
                handleSelected={() => handleItemClick(row.id)}
              />
            </motion.div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
