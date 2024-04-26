export const mockResponse = () => {
  const res = {
    status: jest.fn(),
    json: jest.fn(),
    send: jest.fn(),
    body: jest.fn(),
  };

  res.status.mockImplementation((statusCode) => {
    res.status = statusCode;
    return res;
  });

  res.json.mockImplementation((responseBody) => {
    res.body = responseBody;
    return res;
  });

  res.send.mockImplementation((responseBody) => {
    res.body = responseBody;
    return res;
  });

  return res;
};
