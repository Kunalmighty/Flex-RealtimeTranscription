import React, { useEffect, useState } from "react";
import { Card } from "@twilio-paste/core/card";
import { Text } from "@twilio-paste/core/text";
import { Box } from "@twilio-paste/core/box";
import { useFlexSelector } from "@twilio/flex-ui";
import { SyncClient } from "twilio-sync";

const TranscriptionPanel = () => {
  const [transcriptions, setTranscriptions] = useState([]);
  const [syncClient, setSyncClient] = useState(null);
  const token = useFlexSelector((state) => state.flex.session.ssoTokenPayload?.token); // Ensure token exists
  console.log("This is the token: ", token);

  useEffect(() => {
    if (!token) return;

    // Initialize Twilio Sync client
    const client = new SyncClient(token);
    console.log("This is the sync client: ", client);
    setSyncClient(client);

    // Fetch the transcription Sync document
    client.document("transcriptions").then((doc) => {
      // Ensure data is properly structured, avoiding undefined errors
      const initialData = doc.value?.transcriptions || [];
      setTranscriptions(initialData);

      // Listen for future updates
      doc.on("updated", (updatedDoc) => {
        setTranscriptions(updatedDoc.value?.transcriptions || []);
      });
    }).catch((err) => {
      console.error("Error fetching Sync document:", err);
    });

    return () => {
      client.removeAllListeners();
    };
  }, [token]);

  console.log("This is the transcriptions array: ", transcriptions);

  return (
    <Box padding="space60" backgroundColor="colorBackgroundBody">
      <Card>
        <Text as="h3" fontWeight="fontWeightBold">Live Transcriptions</Text>
        <Box marginTop="space40">
          {transcriptions.length > 0 ? (
            transcriptions.map((text, index) => (
              <Text key={index} as="p">
                {text}
              </Text>
            ))
          ) : (
            <Text as="p" color="colorTextWeak">
              No transcriptions available.
            </Text>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default TranscriptionPanel;
