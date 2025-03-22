import Joi from "joi";

export default class AuthValidator {
    
    static signup(data: any): Joi.ValidationResult {
        const schema = Joi.object().keys({
            firstname: Joi.string().required(), 
            lastname: Joi.string().required(), 
            phone: Joi.string().required(), 
            state: Joi.string().required(), 
            gender: Joi.string().required(), 
            email: Joi.string().email().required(),
            password: Joi.string().required(), 
            referralId: Joi.string().optional()

        });
        return schema.validate(data);
    }
    static signUpEmployer(data: any): Joi.ValidationResult {
        const schema = Joi.object().keys({
            business: Joi.object().keys({
                businessType: Joi.string().required(),
                businessName: Joi.string().required(),
                businessRc: Joi.string().required(),
                businessPhone: Joi.string().required(),
                businessState: Joi.string().required(),
            }).required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            referralId: Joi.string().optional()
        });
        return schema.validate(data);
    }
    
    static verify(data: any): Joi.ValidationResult {
        const schema = Joi.object().keys({
            otpCode: Joi.string().required(),
        });
        return schema.validate(data);
    }

    static setupLocation(data: any): Joi.ValidationResult {
        const schema = Joi.object().keys({
            location: Joi.object().keys({
                formattedAddress: Joi.string().required(),
                placeId: Joi.string().required(),
                coordinates: Joi.array().items(Joi.number()).required()
            }).required()
        });
        return schema.validate(data);
    }

    static login(data: any): Joi.ValidationResult {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        });
        return schema.validate(data);
    }
    static forgotPassword(data: any): Joi.ValidationResult {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
        });
        return schema.validate(data);
    }

    static resetPassword(data: any): Joi.ValidationResult {
        const schema = Joi.object().keys({
            otpCode: Joi.string().required(),
            password: Joi.string().required(),
            passwordConfirm: Joi.string().required(),
        });
        return schema.validate(data);
    }

}
