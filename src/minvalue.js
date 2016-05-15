import validator from './validator';
import { gte } from 'lodash';

export default function minvalue(min = 0, props = {}) {
    props.message = props.message || `At least ${min}`;

    return validator(
        (value) => gte(value, min),
        props
    );
}
