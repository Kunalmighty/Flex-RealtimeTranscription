import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';
import TranscriptionPanel from "./components/TranscriptionPanel";

const PLUGIN_NAME = 'FlexRealtimeTranscriptionPlugin';

export default class FlexRealtimeTranscriptionPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    const options = { sortOrder: -1 };
    flex.CRMContainer.Content.replace(<TranscriptionPanel key="transcription-panel" />, options);
  }
}