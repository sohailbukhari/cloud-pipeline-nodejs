const crypto = require('crypto');

const { SECRET } = require('../config/keys');

module.exports = {
  strict: async (req, res, next) => {
    try {
      const chunk = JSON.stringify(req.body);

      let sig = 'sha256=' + crypto.createHmac('sha256', SECRET).update(chunk).digest('hex');
      if (req.headers['x-hub-signature'] != sig) throw { status: 401, message: 'UNAUTHORIZED' };

      next();
    } catch (err) {
      return res.status(401).json({ success: false, message: 'UNAUTHORIZED' });
    }
  },
};
