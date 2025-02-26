exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient();
  const syncServiceSid = context.SYNC_SERVICE_SID;

  try {
    // Parse the TranscriptionData JSON string into an object
    const transcriptionData = JSON.parse(event.TranscriptionData || "{}");
    const transcript = transcriptionData.transcript || ""; // Extract the actual text

    if (!transcript) {
      console.warn("No valid transcription text received.");
      return callback(null, { success: false, message: "No valid transcription text." });
    }

    // Fetch existing Sync document or create one if it doesn't exist
    let doc;
    try {
      doc = await client.sync.v1.services(syncServiceSid)
        .documents("transcriptions")
        .fetch();
    } catch (error) {
      // If the document doesn't exist, create it
      doc = await client.sync.v1.services(syncServiceSid)
        .documents
        .create({ uniqueName: "transcriptions", data: { transcriptions: [] } });
    }

    // Append new transcription to the existing list
    const updatedTranscriptions = [...doc.data.transcriptions, transcript];

    // Update Sync document with new transcription data
    await client.sync.v1.services(syncServiceSid)
      .documents("transcriptions")
      .update({ data: { transcriptions: updatedTranscriptions } });

    return callback(null, { success: true });
  } catch (error) {
    console.error("Error updating transcription:", error);
    return callback(error);
  }
};
