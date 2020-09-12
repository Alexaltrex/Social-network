export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) =>
    value ? undefined : 'Field is required';

export const maxLength = (max: number): FieldValidatorType => (value) =>
    value && value.length > max
        ? `Количество введенных символов больше, чем ${max}`
        : undefined;

export const maxLength30 = maxLength(30);
export const maxLength100 = maxLength(100);