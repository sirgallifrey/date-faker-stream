import { Readable } from 'stream';

export default class DateFakerStream extends Readable {
  
  startingTimestamp: number;
  endingTimestamp: number;
  minIntervalInSeconds: number;
  maxIntervalInSeconds: number;

  private lastGeneratedTimeStamp: number;

  constructor(startingDate: Date, endingDate: Date, minIntervalInSeconds: number, maxIntervalInSeconds: number) {
    super({ objectMode: true, highWaterMark: 1000 });
    this.startingTimestamp = startingDate.getTime();
    this.endingTimestamp = endingDate.getTime();
    this.minIntervalInSeconds = minIntervalInSeconds;
    this.maxIntervalInSeconds = maxIntervalInSeconds;
    this.lastGeneratedTimeStamp = this.startingTimestamp;
  }

  private _getRndomIncrement(): number {
    const minInt = Math.ceil(this.minIntervalInSeconds);
    const maxInt = Math.floor(this.maxIntervalInSeconds);
    return Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;
  }

  _read() {

    this.lastGeneratedTimeStamp = this.startingTimestamp + this._getRndomIncrement();

    if (this.lastGeneratedTimeStamp > this.endingTimestamp) {
      this.push(null);
      return;
    }
    
    this.push(new Date(this.lastGeneratedTimeStamp));
  }
}
