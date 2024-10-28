# FPP Jukebox

This a web app that you can install yourself to setup a playlist.  The next item in the playlist is fetched by a script in FPP (Falcon Player), which can be trigered by a button.

## Design

The web app is a serverless Next.js app that will fetch and update its data from Supabase. FPP will run a script to fetch the next song from Supabase.

The data model is primitive: songs are listed in `Song` and there's only one playlist, the content of the `Playlist` table.  The next song is the song with the lowest value in the column `position`.  When the webapp updates the position column, all rows are reordered by an SQL trigger to keep the position values valid.

## Getting Started

### Setup Supabase

This web app uses [Supabase](https://www.supabase.com) as the backend. You will need to create a free account, create a project and run the SQL inside the `database.sql` file.

You will need to enable Column-level priviledges (accessible as a Feature Preview by tapping on your user at the bottom left, then Feature Previews).  In Database / Column Priviledges, you will need to let the role anon Select all Columns on the table Playlist and update the position column.  The role anon should also be allowed to select all columns on the Song table.

There's no test data included.  You should create Song records and link them in the Playlist table. Images are to be put in the `public` folder. 

### Environment Variables

Your Supabase public key and URL need to be added in `next.config.ts`.  You can find them under Project Settings / API.

### Run Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deploy

To deploy this project you first need to build the web app:

```bash
npm run build
# or
yarn build
```

The web app is now ready in the folder `out`.  Just copy the folder's content to your favorite static hosting service.