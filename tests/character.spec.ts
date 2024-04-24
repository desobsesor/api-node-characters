
import { Character } from '../src/models/character';
import { getCharacterById, setCharacter, updateCharacter } from '../src/controllers/character';
import { mockResponse } from './mockResponse';
import NodeCache from 'node-cache'; 
//import redis from 'redis';


jest.mock('node-cache'); // Mock NodeCache
jest.mock('../src/models/character');
/*
jest.mock('redis');

type MockObject = { [key: string]: jest.Mock };

jest.spyOn(redis, 'createClient').mockReturnValue({
  connect: jest.fn().mockResolvedValue(undefined)
}); 
*/

describe('Characters', () => {
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

  it('should create a character and return a 201 status', async () => {
    const mockCharacterData = {
      name: 'Selena',
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

    (Character.sync as jest.Mock).mockReturnValue(undefined);

    (Character.create as jest.Mock).mockReturnValue(mockCharacterData);

    const req = { body: mockCharacterData };
    const res = mockResponse();

    await setCharacter(req, res);

    expect(Character.sync).toHaveBeenCalled();
    expect(Character.create).toHaveBeenCalledWith(mockCharacterData);
    expect(res.status).toBe(201);
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      status: 201,
      message: 'Character add to DB',
    });
  });

  it('should handle errors and return status 500', async () => {
    const mockError = new Error('Error creating character');

    (Character.sync as jest.Mock).mockResolvedValue(undefined);

    (Character.create as jest.Mock).mockRejectedValue(mockError);

    const req = { body: {} };
    const res = mockResponse();

    await setCharacter(req, res);

    expect(Character.sync).toHaveBeenCalled();
    expect(Character.create).toHaveBeenCalled();
    expect(res.status).toBe(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error when querying characters' });
  });

  /*
  it('should update a character and return a 201 status', async () => {
    const mockId = 1;
    const mockCharacterData = { // status, species, gender, name, origin, location, image, episode, url
      status: "Inactive",
      species: "Human",
      gender: "Female",
      name: 'Pato',
      origin: 1,
      location: 1,
      image: "image",
      episode: "1,2",
      url: "http://www.midominio.com"
    };
    const mockUpdateResult = [1]; 

    (Character.update as jest.Mock).mockResolvedValue(mockUpdateResult);

    const mockCache = new NodeCache({ stdTTL: 3600 });
    jest.spyOn(NodeCache.prototype, 'set').mockImplementation((key, value) => mockCache.set(key, value));

    const req = { params: { id: mockId }, body: mockCharacterData };
    const res = mockResponse();

    await updateCharacter(req, res);

    // expect(Character.update).toHaveBeenCalledWith(mockCharacterData, { where: { id: mockId } }); // Verify Character.update was called with correct arguments
    // expect(NodeCache.prototype.set).toHaveBeenCalledWith(mockId.toString(), mockCharacterData); // Verify cache.set was called with correct arguments
    expect(res.status).toBe(201); // Verify status code
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      status: 201,
      message: 'Character info has update en DB',
      characterUpdate: mockUpdateResult,
    }); // Verify response body
  }); */

  it('should handle errors and return status 500', async () => {
    const mockId = 1;
    const mockCharacterData = {
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
    const mockError = new Error('Error updating character');

    (Character.update as jest.Mock).mockRejectedValue(mockError);

    const req = { params: { id: mockId }, body: mockCharacterData };
    const res = mockResponse();

    await updateCharacter(req, res);

    expect(Character.update).toHaveBeenCalled();
    expect(NodeCache.prototype.set).not.toHaveBeenCalled();
    expect(res.status).toBe(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error when updating characters' });
  });
});