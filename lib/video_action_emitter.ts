
const listeners: Set<Listener> = new Set();

export enum VideoAction {
  PLAY = 'play',
  PAUSE = 'pause',
  SEEK = 'seek',
  SEEK_TO = 'seek_to',
}

export interface VideoActionProps {
  seek?: number;
  seekTo?: number;
}

export type Listener = (action: VideoAction, payload: VideoActionProps) => void;

export function broadcast(action: VideoAction, props?: VideoActionProps): void {
  props = props || {};
  listeners.forEach((fn: Listener) => fn(action, props));
}

export function addListener(fn: Listener): void {
  listeners.add(fn);
}

export function removeListener(fn: Listener): void {
  listeners.delete(fn);
}
