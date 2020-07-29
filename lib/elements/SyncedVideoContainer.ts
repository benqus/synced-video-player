import { LitElement, html, css, customElement, TemplateResult } from 'lit-element';
import styles from './SyncedVideoContainer.styles';
import videos from '../videos.json';

import './SyncedVideoControls';
import './SyncedVideoPlayer';

@customElement('synced-video-container')
export default class SyncedVideoContainer extends LitElement {

  static styles = styles;

  render(): TemplateResult {
    return html`
      <article class="videos">
        ${videos.map((video: any, index: number) =>
          html`<synced-video-player .data=${video} .index=${index}></synced-video-player>`
        )}
      </article>
      <synced-video-controls></synced-video-controls>
    `;
  }
  
}