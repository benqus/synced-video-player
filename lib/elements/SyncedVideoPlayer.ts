import { LitElement, html, css, query, customElement, property, internalProperty, TemplateResult } from 'lit-element';
import { VideoAction, VideoActionProps, broadcast, addListener, removeListener, Listener } from '../video_action_emitter';
import format_time from '../utils/format_time';
import styles from './SyncedVideoPlayer.styles';

import './SyncedVideoSeekbar';

@customElement('synced-video-player')
export default class SyncedVideoPlayer extends LitElement {

  static styles = styles;

  @internalProperty()
  loading: boolean = true;

  @internalProperty()
  currentTime: number = 0;

  @internalProperty()
  duration: number = 0;

  @property({ type: Object })
  data: any = null;

  @query('video')
  video: HTMLVideoElement;

  listener: Listener = (action: VideoAction, { seek, seekTo }: VideoActionProps): void => {
    switch(action) {
      case VideoAction.PLAY:
        this.video.play();
        break;
      case VideoAction.PAUSE:
        this.video.pause();
        break;
      case VideoAction.SEEK:
        this.video.currentTime += seek;
        break;
      case VideoAction.SEEK_TO:
        this.video.pause();
        this.video.currentTime = seekTo;
        break;
    }
  };

  connectedCallback(): void {
    super.connectedCallback();
    addListener(this.listener);
  }

  disconnectedCallback(): void {
    removeListener(this.listener);
    super.disconnectedCallback();
  }

  onLoadedMetadata = (e: Event): void => {
    const { duration, currentTime } = e.target as HTMLVideoElement;
    this.duration = duration;
    this.currentTime = currentTime;
    this.loading = false;
  }

  /**
   * TODO - video timeupdate events are a bit jerky
   * TODO - refactor this to have a 30-60fps timeout for smoother updates
   */
  onTimeUpdate = (e: Event): void => {
    const { currentTime } = e.target as HTMLVideoElement;
    this.currentTime = currentTime;
  }

  onClickSyncToCurrentTime = (e: Event): void => {
    const seekTo: number = this.video.currentTime;
    broadcast(VideoAction.SEEK_TO, { seekTo });
  }

  onSeek = (e: CustomEvent): void => {
    this.video.currentTime = e.detail;
  }

  render(): TemplateResult {
    const { sources, title, subtitle } = this.data;
    return html`
      <article>
        <header>
          <h3>${title}</h3>
          <p class="subtitle">${subtitle}</p>
          ${this.renderMetadata}
        </header>
        <video @timeupdate=${this.onTimeUpdate} @seeked=${_ => this.loading = false} @seeking=${_ => this.loading = true} @loadedmetadata=${this.onLoadedMetadata}>
          ${this.renderVideoSources(sources)}
        </video>
        ${this.renderSeekbar}
        <aside>
          <nav>
            <button @click=${this.onClickSyncToCurrentTime}>sync here</button>
          </nav>
        </aside
      </article>
    `;
  }

  get renderSeekbar(): TemplateResult {
    if (this.video) {
      return html`<synced-video-seekbar class="seekbar" .duration=${this.duration} .currentTime=${this.currentTime} @seek=${this.onSeek}></synced-video-seekbar>`;
    }
    return null;
  }

  get renderMetadata(): TemplateResult {
    if (!this.video || this.loading) return html`<p class="metadata">loading...</p>`;
    return html`<p class="metadata">${format_time(this.currentTime)}/${format_time(this.duration)}</p>`;
  }

  renderVideoSources(sources: Array<string>): TemplateResult[] {
    return sources.map((src: string) => html`<source src="${src}" type="video/mp4">`);
  }
}
