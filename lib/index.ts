import { Readable } from 'stream';

export default class DateFakerStream extends Readable {
  startingTimestamp: number;
  endingTimestamp: number;
  minInterval: number;
  maxInterval: number;

  private lastGeneratedTimeStamp: number;

  constructor(startingDate: Date, endingDate: Date, minInterval: number, maxInterval: number) {
    super({ objectMode: true, highWaterMark: 1000 });
    this.startingTimestamp = startingDate.getTime();
    this.endingTimestamp = endingDate.getTime();
    this.minInterval = Math.ceil(minInterval);
    this.maxInterval = Math.floor(maxInterval);
    this.lastGeneratedTimeStamp = this.startingTimestamp;
  }

  private _getRndomIncrement(): number {
    return Math.floor(Math.random() * (this.maxInterval - this.minInterval + 1)) + this.minInterval;
  }

  _read() {
    this.lastGeneratedTimeStamp = this.lastGeneratedTimeStamp + this._getRndomIncrement();

    if (this.lastGeneratedTimeStamp > this.endingTimestamp) {
      this.push(null);
      return;
    }
    
    this.push(new Date(this.lastGeneratedTimeStamp));
  }
}
