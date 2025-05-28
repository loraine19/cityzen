import { Label } from "./frontEntities";

export const getEnumLabel = (enumArray: any, all?: boolean): Label[] => {
    const allLabel = { label: 'tous', value: '' }
    const array = [...Object.keys(enumArray).map(key => ({
        label: enumArray[key as keyof typeof enumArray],
        value: key,
    }))];
    all && array.unshift(allLabel as Label);
    return array
};

export const TextLength = {
    SHORT: 255,
    MEDIUM: 1000,
    LONG: 5000,
    EXTRA_LONG: 65535, // Correspond à un TEXT dans MySQL
    MAX_LONGTEXT: 4294967295, // Correspond à un LONGTEXT dans MySQL
    USERNAME_MIN: 3,
    USERNAME_MAX: 50,
    PASSWORD_MIN: 8,
    DESCRIPTION: 2000,
    COMMENT: 1000,
} as const;