import { LitElement, html, css, property, customElement, TemplateResult } from 'lit-element';

import styles from './SyncedVideoSeekbar.styles';

@customElement('synced-video-seekbar')
export default class SyncedVideoSeekbar extends LitElement {

  static styles = styles;

  @property({ type: Number })
  duration: number = 0;

  @property({ type: Number })
  currentTime: number = 0;

  onInputSeekToTime = (e: Event): void => {
    const { value } = e.target as HTMLInputElement;
    const detail: number = parseFloat(value);
    this.dispatchEvent(new CustomEvent('seek', { detail }));
  }

  render(): TemplateResult {
    return html`
      <input type="range" min="0" step="0.001" max=${this.duration} .value=${this.currentTime} @input=${this.onInputSeekToTime}>
    `;
  }
}