import Image from "next/image";
import { useUpdateMutation } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "../../utils/supabase";

export default function SongItem({ row, isSelected, handleSelected, isFirst, isLast }) {
  const { id, Song } = row;
  const { image, title, artist, duration } = Song || {};
  const supabase = useSupabaseBrowser();

  const mutation = useUpdateMutation(supabase.from('Playlist'), ["id"], "position");

  const handleTop = () => {
    const newPosition = 0;
    mutation.mutate({ id, position: newPosition },
      {
        onSuccess: (data) => {
          console.log("Update succeeded:", data);
        },
        onError: (error) => {
          console.error("Update failed:", error);
        },
      });
  };

  const handleMoveUp = () => {
    if (!isFirst) {
      const newPosition = row.position - 1.1;
      mutation.mutate({ id, position: newPosition },
        {
          onSuccess: (data) => {
            console.log("Update succeeded:", data);
          },
          onError: (error) => {
            console.error("Update failed:", error);
          },
        });
    }
  };

  const handleMoveDown = () => {
    if (!isLast) {
      const newPosition = row.position + 1.1;
      console.log(id, newPosition)
      mutation.mutate({ id, position: newPosition },
        {
          onSuccess: (data) => {
            console.log("Update succeeded:", data);
          },
          onError: (error) => {
            console.error("Update failed:", error);
          },
        });
    }
  };

  return (
    <div key={id} className="bg-white/10 p-4 rounded-xl" onClick={() => handleSelected()}>
      <div className="flex gap-4 items-center justify-between pointer-events-none">
        <Image
          src={image ? `/${image}` : '/placeholder.png'}
          alt={title || "Song"}
          width={75}
          height={75}
          className="rounded"
          priority
        />
        <div className="flex flex-col w-full leading-5">
          <div className="font-bold text-lg leading-5">{title || "Untitled"}</div>
          <div className="font-regular text-white/50">{artist || "Unknown Artist"}</div>
        </div>
        <div className="pr-2 text-xs">{duration || "N/A"}</div>
      </div>
      
        <div className={"flex justify-center gap-2 pt-4 mx-auto w-full " + (isSelected ? " block " : "hidden")}>
          <button onClick={(e) => {
            e.stopPropagation();
            handleTop();
          }}className={`bg-white rounded-xl p-2 flex font-medium items-center ${isFirst ? "bg-white/20 text-black/50" : "text-black shadow active:bg-white/90 active:scale-95"}`} disabled={isFirst}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-red-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
            </svg>
            Suivant
          </button>
          <div className="flex">
            <button onClick={(e) => {
            e.stopPropagation();
            handleMoveUp();
          }} className={`bg-white rounded-l-xl p-2 flex font-medium items-center ${isFirst ? "bg-white/20 text-black/50" : "text-black shadow active:bg-white/90 active:scale-95"}`} disabled={isFirst}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-red-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
              </svg>
              Monter
            </button>
            <div className="w-px"></div>
            <button onClick={(e) => {
            e.stopPropagation();
            handleMoveDown();
          }} className={`bg-white rounded-r-xl p-2 flex font-medium items-center ${isLast ? "bg-white/20 text-black/50" : "text-black shadow active:bg-white/90 active:scale-95"}`} disabled={isLast}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-red-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
              </svg>
              Descendre
            </button>
          </div>
        </div>
    </div>
  );
}
