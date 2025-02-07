import { EventCategory } from "../domain/entities/Event";
import { Label } from "../domain/entities/frontEntities";

export const getEnumLabel = (enumArray: any, all?: boolean): Label[] => {
    const allLabel = { label: 'tous', value: '' }
    const array = [...Object.keys(enumArray).map(key => ({
        label: enumArray[key as keyof typeof enumArray],
        value: key,
    }))];
    all && array.unshift(allLabel as Label);
    return array
};

export const eventCategoriesS = getEnumLabel(EventCategory, true);
export const eventCategories = getEnumLabel(EventCategory);