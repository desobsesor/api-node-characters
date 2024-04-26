import { createCronJob } from "../src/utils/cronJob";

jest.mock("./mocks/cron");

interface CronJobInterface {
  start(): void;
  stop(): void;
}

describe("createCronJob function", () => {
  let mockCronJob: jest.Mock<CronJobInterface>;
  let mockMakeRequest: jest.Mock;
  let mockLoggerInfo: jest.Mock;
  let mockLoggerError: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    // Create mocks for dependencies
    mockCronJob = jest
      .fn()
      .mockImplementation(() => ({ running: false, start: jest.fn() }));
    // jest.mocked('./mocks/cron').CronJob = mockCronJob; // Use the mocked CronJob class
    mockMakeRequest = jest.fn().mockResolvedValue({}); // Mock makeRequest if needed
    mockLoggerInfo = jest.fn();
    mockLoggerError = jest.fn();
    // log4js.getLogger = jest.fn().mockReturnValue({ info: mockLoggerInfo, error: mockLoggerError }); // Simulate logger object
  });

  afterEach(() => {
    //jest.clearAllMocks(); // Reset mocks after each test
  });

  it("should create a cron job and start it", async () => {
    const cronExpression = "*/5 * * * *"; // Example cron expression

    const job = createCronJob(cronExpression);

    // expect(jest.mocked('./cron').CronJob).toHaveBeenCalledWith(cronExpression, expect.any(Function), null, true, 'America/Bogota');
    // expect(job.start()).toHaveBeenCalledTimes(1);

    // Simulate job execution
    // await job.callback(); // Access the scheduled function

    // expect(mockMakeRequest).toHaveBeenCalledTimes(1); // Call if mocked
    // expect(mockLoggerInfo).toHaveBeenCalledTimes(2); // Once for job start time, once for response (or error)
  });

  /*
  it('should handle errors during request', async () => {
    const cronExpression = '* 5 * * * *';
    const error = new Error('API request failed');
    mockMakeRequest.mockRejectedValue(error); // Mock error if needed

    const job = createCronJob(cronExpression);

    await job.callback();

    expect(mockMakeRequest).toHaveBeenCalledTimes(1); // Call if mocked
    expect(mockLoggerError).toHaveBeenCalledWith('Error invoking endpoint:', { error });
  });

  it('should stop a running job before starting a new one', () => {
    const cronExpression = '* 5 * * * *';
    mockCronJob.mockImplementation(() => ({ running: true, start: jest.fn(), stop: jest.fn() }));

    createCronJob(cronExpression);

    expect(mockCronJob.stop).toHaveBeenCalledTimes(1);
    expect(mockCronJob.start).toHaveBeenCalledTimes(1);
  });
  */
});
