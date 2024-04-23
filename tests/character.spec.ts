
import { Character } from '../src/models/character';
import { getCharacterById } from '../src/controllers/character';
import { mockResponse } from './mockResponse';

jest.mock('../src/models/character');

describe('getCharacterById', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  
  it('should return a character with status 200', async () => {
    const mockCharacter = {
      id: 1,
      name: 'Pato',
      status: "Inactive",
      species: "Human",
      gender: "Female",
      origin: 1,
      location: 1,
      image: "image",
      episode: "1,2",
      url: "http://www.midominio.com",
      created: "Yovany"

    };

    (Character.findByPk as jest.Mock).mockReturnValue(mockCharacter);

    const req = { params: { id: 1 } };
    const res = mockResponse();

    await getCharacterById(req, res);

    expect(res.status).toBe(200);
    expect(res.json).toHaveBeenCalledWith(mockCharacter);
  });

  it('should handle errors and return status 500', async () => {
    const mockError = new Error('Error finding character');

    (Character.findByPk as jest.Mock).mockRejectedValueOnce(mockError);

    const req = { params: { id: 1 } };
    const res = mockResponse();

    await getCharacterById(req, res);

    expect(res.status).toBe(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error when searching character by ID' });
  });
});