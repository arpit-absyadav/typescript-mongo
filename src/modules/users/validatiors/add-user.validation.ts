import * as Joi from 'joi';
import validations from '@abslibs/core/dist/validations';

export default Joi.object().keys({
  name: validations.name.required().label('Name'),
  description: validations.description.label('Description'),
});
