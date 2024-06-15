import { isNullOrEmpty } from './common';

const validationHandlerFactory = (fields, setFields) => {
    return () => {
        const updatedFields = {...fields};

        Object.keys(updatedFields).forEach(
            key => updatedFields[key] = { ...updatedFields[key], error: false, errorMessage: null });
    
        const emptyFields = Object.keys(updatedFields)
            .filter(key => isNullOrEmpty(updatedFields[key].value) && updatedFields[key].required);
        
        if (emptyFields.length)
            emptyFields.forEach(key => updatedFields[key] = { ...updatedFields[key], error: true });
    
        Object.keys(updatedFields).filter(key => updatedFields[key].validation && updatedFields[key].value).forEach(key => {
            if (!updatedFields[key].validation.regex.test(updatedFields[key].value))
                updatedFields[key] = { ...updatedFields[key], error: true, errorMessage: updatedFields[key].validation.message };
        });
    
        setFields(prevFields => ({ ...prevFields, ...updatedFields }));
        return !Object.keys(updatedFields).some(key => updatedFields[key].error);
    }
}

const changeHandlerFactory = (fields, setFields) => {
    return (field, value) => setFields({...fields, [field]: {...fields[field], value: value}})
}

export { validationHandlerFactory, changeHandlerFactory }