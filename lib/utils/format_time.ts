
export default function format_time(time: number = 0): string {
  const hours: number = Math.floor(time / 3600);
  time -= hours * 3600;
  
  const minutes: number = Math.floor(time / 60);
  time -= minutes * 60;

  const seconds: number = Math.floor(time);
  time -= seconds;

  const tenths: string = time.toFixed(3).split('.')[1];

  const parts: string = [
    `${hours}`.padStart(2, 0),
    `${minutes}`.padStart(2, 0),
    `${seconds}`.padStart(2, 0)
  ].join(':');

  return parts + `.${tenths}`;
}
