import express from 'express';

const router = express.Router();
import { validateData } from '../middlewares/dataValidation';
import { deleteCharacterById, getAllCharacters, getCharacterById, getSearhByCharacters, setCharacter, updateCharacter } from '../controllers/character';

router.post('/character/search', validateData, getSearhByCharacters);
router.get('/character/all', validateData, getAllCharacters);
router.get('/character/:id', validateData, getCharacterById);
router.post('/character', validateData, setCharacter);
router.put('/character', validateData, updateCharacter);
router.delete('/character/:id', validateData, deleteCharacterById);

module.exports = router;