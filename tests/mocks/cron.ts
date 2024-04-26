export class CronJob {
  constructor(
    public cronExpression: string,
    public callback: Function,
    public options?: object | null,
    public timeZone?: string,
    public running?: boolean,
  ) {}

  public start(): void {
    // Simulate job start (optional)
  }
}

jest.mock("./cron", () => ({ CronJob }));
