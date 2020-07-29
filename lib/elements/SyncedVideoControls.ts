import { LitElement, html, customElement, internalProperty, TemplateResult } from 'lit-element';
import { VideoAction, broadcast } from '../video_action_emitter';

import styles from './SyncedVideoControls.styles';

@customElement('synced-video-controls')
export default class SyncedVideoControls extends LitElement {

  static styles = styles;

  @internalProperty()
  playing: boolean = false;

  seek(seek: number): void {
    broadcast(VideoAction.SEEK, { seek });
  }

  onClickTogglePlayPause = (e: Event): void => {
    const action: VideoAction = this.playing ? VideoAction.PAUSE : VideoAction.PLAY;
    this.playing = !this.playing; // toggle state
    broadcast(action);
  }

  onClickSeekBackward = (e: Event): void => {
    this.seek(-1);
  }

  onClickSeekForward = (e: Event): void => {
    this.seek(1);
  }

  render(): TemplateResult {
    return html`
      <nav>
        <button @click=${this.onClickSeekBackward}>-1s</button>
        <button @click=${this.onClickTogglePlayPause}>${this.buttonLabel}</button>
        <button @click=${this.onClickSeekForward}>+1s</button>
      </nav>
    `;
  }

  get buttonLabel(): string {
    return this.playing ? 'Pause' : 'Play';
  }

}