import { Button, FormLabel, Select, MenuItem, TextField, FormControl } from "@mui/material";

export default function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText }) {
    function renderInputByComponentType(getControlItem) {
        const value = formData[getControlItem.name] || '';

        switch (getControlItem.componentType) {
            case 'input':
                return (
                    <TextField
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type || "text"}
                        value={value}
                        onChange={(event) => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value
                        })}
                        fullWidth
                        variant="outlined"
                    />
                );

            case 'select':
                return (
                    <FormControl fullWidth>
                        <Select
                            name={getControlItem.name}
                            value={value}
                            onChange={(event) => setFormData({
                                ...formData,
                                [getControlItem.name]: event.target.value
                            })}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>
                                {getControlItem.label}
                            </MenuItem>
                            {getControlItem.options?.map(optionItem => (
                                <MenuItem key={optionItem.id} value={optionItem.id}>
                                    {optionItem.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                );

            case 'text-field':
                return (
                    <TextField
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.id}
                        value={value}
                        onChange={(event) => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value
                        })}
                        fullWidth
                        variant="outlined"
                    />
                );

            default:
                return (
                    <TextField
                        name={getControlItem.name}
                        placeholder={getControlItem.placeholder}
                        id={getControlItem.name}
                        type={getControlItem.type || "text"}
                        value={value}
                        onChange={(event) => setFormData({
                            ...formData,
                            [getControlItem.name]: event.target.value
                        })}
                        fullWidth
                        variant="outlined"
                    />
                );
        }
    }

    return (
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            {formControls.map(controlItem => (
                <div key={controlItem.name} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <FormLabel>{controlItem.label}</FormLabel>
                    {renderInputByComponentType(controlItem)}
                </div>
            ))}
            <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#333' } }}
                fullWidth
            >
                {buttonText || 'Submit'}
            </Button>
        </form>
    );
}
