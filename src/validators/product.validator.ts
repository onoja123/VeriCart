import Joi from 'joi';

export default class ProductValidator {

  static validateId(id: any): Joi.ValidationResult{
    const schema = Joi.object().keys({
      id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    })
    return schema.validate(id);
  }

  static createProduct(data: any): Joi.ValidationResult {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      category: Joi.string().required(),
      image: Joi.string().required(),
      quantity: Joi.number().required(),
    });
    return schema.validate(data);
  }

  static updateProduct(data: any): Joi.ValidationResult {
    const schema = Joi.object().keys({

    });
    return schema.validate(data);
  }

}