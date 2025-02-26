# Flex-RealtimeTranscription
Realtime Transcription on Twilio Flex using TwiML Bin, Twilio Functions and Twilio Sync

Things to note: 

1. You will need to point your Twilio phone number to a newly created TwiML Bin that has the contents of the TwiML Bin provided in their repository. Make sure to change the statusCallbackUrl in the TwiML Bin and the TaskRouter Workflow SID accordingly. The statusCallbackUrl should point to the URL of your Twilio function as described in (2) below.
2. Create a Twilio function with the contents in the updateTranscription.js functon provided in this repo. Make sure to provide your Sync Service SID as an environment variable that is referenced by context.SYNC_SERVICE_SID.
3. The relevant Flex plugin files needed are provided in the Flex Plugin/src folder.


