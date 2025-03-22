import Joi from 'joi';

export default class RequestValidator {


  static validateId(id: any): Joi.ValidationResult{
    const schema = Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    })
    return schema.validate(id);
  }
  
  static createRequest(data: any): Joi.ValidationResult {
    const schema = Joi.object().keys({
        type: Joi.string().required(),
        reason: Joi.string().required(),
        date: Joi.date().required(),
        attachment: Joi.string().required(),
    });
    return schema.validate(data);
  }
}