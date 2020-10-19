export const required: FieldValidatorType = (value) =>
    value ? undefined : 'Field is required';

export const maxLength = (max: number) => (value: string) =>
    value && value.length > max
        ? `Number of letters is more than ${max}`
        : undefined;

export const maxLength10 = (max: number): FieldValidatorType => (value: string) =>
    value && value.length > max
        ? `Number of letters is more than ${max}`
        : undefined;

export const maxLength30 = maxLength(30);

export const empty: EmptyType = (str: string): boolean => /^\s+$/.test(str);

export const shouldNotBeEmpty: FieldValidatorType = (value) =>
    empty(value) && value !== ''
        ? 'Field should not be empty'
        : undefined;

//=========================== TYPES =====================================
type EmptyType = (str: string) => boolean
export type FieldValidatorType = (value: string) => string | undefined