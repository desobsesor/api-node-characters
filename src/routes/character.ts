import express from 'express';

const router = express.Router();
import { validateData } from '../middlewares/dataValidation';
import { deleteCharacterById, getAllCharacters, getCharacterById, getSearhByCharacters, setCharacter, updateCharacter } from '../controllers/character';

router.get('/character/search', validateData, getSearhByCharacters);
router.get('/allcharacters', validateData, getAllCharacters);
router.post('/character', validateData, setCharacter);
router.get('/character/id', validateData, getCharacterById);
router.put('/character', validateData, updateCharacter);
router.delete('/character/:id', validateData, deleteCharacterById);

module.exports = router;