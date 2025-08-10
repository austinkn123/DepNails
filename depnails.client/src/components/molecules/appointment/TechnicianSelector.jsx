import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const TechnicianSelector = ({ technicians, selectedTechnician, handleChange, name = "technician" }) => {
    return (
        <FormControl fullWidth required>
            <InputLabel id="technician-select-label">Technician</InputLabel>
            <Select
                labelId="technician-select-label"
                id="technician-select"
                value={selectedTechnician}
                label="Technician"
                name={name}
                onChange={handleChange}
            >
                {technicians.map((tech) => (
                    <MenuItem key={tech.id} value={tech.id}>
                        {tech.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default TechnicianSelector;
