import Joi from 'joi';

export default class AttendanceValidator {


  static validateId(id: any): Joi.ValidationResult{
    const schema = Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    })
    return schema.validate(id);
  }
  
  static checkIn(data: any): Joi.ValidationResult {
    const schema = Joi.object().keys({
        location: Joi.string().required(),
    });
    return schema.validate(data);
  }
}