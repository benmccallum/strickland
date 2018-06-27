import {form, every, required, minLength, compare} from 'strickland';
import usernameValidator from './usernameValidator';

const formDefinition = {
    firstName: required({message: 'Required'}),
    lastName: [
        required({message: 'Required'}),
        minLength({minLength: 2, message: 'Must have at least 2 characters'})
    ],
    username: [
        required({message: 'Required'}),
        (value) => {
            if (value && value.trim().indexOf(' ') > -1) {
                return {
                    isValid: false,
                    message: 'Cannot contain spaces'
                };
            }

            return true;
        },
        minLength({minLength: 4, message: 'Must have at least 4 characters'}),
        usernameValidator(({value}) => ({
            validMessage: `"${value} is available`,
            invalidMessage: `Sorry, "${value}" is not available`,
            pendingMessage: `Checking availability of "${value}"...`
        }))
    ],
    password: every(
        [required(), minLength(8)],
        {message: 'Must have at least 8 characters'}
    ),
    confirmPassword: every(
        [required(), compare(({form: {values: {password}}}) => ({compare: password}))],
        {message: 'Must match password'}
    )
};

export default form(formDefinition);
