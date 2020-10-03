export const required: FieldValidatorType = (value) =>
    value ? undefined : 'Field is required';

export const maxLength = (max: number): FieldValidatorType => (value) =>
    value && value.length > max
        ? `Number of letters is more than ${max}`
        : undefined;
export const maxLength10 = maxLength(10);
export const maxLength30 = maxLength(30);
export const maxLength100 = maxLength(100);

export const empty: EmptyType = (str) => /^\s+$/.test(str);

export const shouldNotBeEmpty: FieldValidatorType = (value) =>
    empty(value) && value !== ''
        ? 'Field should not be empty'
        : undefined;

//=========================== TYPES =====================================
type EmptyType = (str: string) => boolean
export type FieldValidatorType = (value: string) => string | undefined