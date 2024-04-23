import express from 'express';

const router = express.Router();
import { validateData } from '../middlewares/dataValidation';
import { deleteCharacterById, getAllCharacters, getCharacterById, getCharacterByName, getSearhByCharacters, setCharacter, updateCharacter } from '../controllers/character';


router.post('/character/search', validateData, getSearhByCharacters); // graphql external
router.get('/character/all', validateData, getAllCharacters);
router.get('/character/id/:id', validateData, getCharacterById);
router.get('/character/name/:name', validateData, getCharacterByName);
router.post('/character', validateData, setCharacter);
router.put('/character/:id', validateData, updateCharacter);
router.delete('/character/:id', validateData, deleteCharacterById);

module.exports = router;