#!/bin/bash        

SUPABASE_API_KEY="FILL ME IN" 
SUPABASE_URL="MISSING"

NEXT=`curl -s -X POST "$SUPABASE_URL/rest/v1/rpc/next_song" -H "Content-Type: application/json" -H "apikey: $SUPABASE_API_KEY" -H "Authorization: Bearer $SUPABASE_API_KEY"`

echo $NEXT
