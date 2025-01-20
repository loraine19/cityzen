
export const createFormData = (element: any): FormData => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(element)) {
        if (value instanceof File) {
            formData.append(key, value);
        } else if (value !== undefined && value !== null) {
            (typeof value === 'object') ?
                formData.append(key, JSON.stringify(value))
                : formData.append(key, value.toString())
        }
    }
    return formData;
}

export const handleApiCall = async (apiCall: () => Promise<any>) => {
    try {
        const { data } = await apiCall(); return data;
    } catch (error) {
        //   console.error('apiCall', error);
        // throw error;
    }
}