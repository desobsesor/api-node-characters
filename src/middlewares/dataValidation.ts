
export const validateData = (req, res, next) => {
    const { status, species, name } = req.body;
  
    /* if (!status || !species || !name) {
      return res.status(400).json({ error: 'Mandatory data missing' });
    } */
  
    next();
  };