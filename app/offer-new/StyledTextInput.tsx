import TextField from '@mui/material/TextField';

type Props = {
    fullWidth?: boolean;
    label?: string;
    onChange?: (v: any) => void;
    placeholder?: string;
    value?: string;
}

const StyledTextInput = ({ value, onChange, label, fullWidth, placeholder }: Props) => {
    return (
        <TextField
            sx={{ pb: 2 }}
            label={label}
            value={value}
            placeholder={placeholder}
            fullWidth={fullWidth}
            onChange={onChange}
            InputLabelProps={{
                shrink: true, // Keeps label above input
                sx: {
                    fontSize: "2.4rem",
                    fontWeight: 500,
                    color: "black", pb: 2, top: -12, left: -8,
                }, // Bold label with margin
            }}
            FormHelperTextProps={{
                sx: {
                    position: 'relative',
                    left: -8
                    // fontSize: "1rem", // Adjust font size
                    // fontWeight: 500, // Adjust font weight
                    // color: "red", // Change color
                    // mt: 1, // Add margin to separate from input
                },
            }}
            InputProps={{
                sx: {
                    // mb: 2,
                    minHeight: 50,
                    backgroundColor: "#efefef", // Background color
                    borderRadius: 1, // Rounded corners
                    color: "black", // White text
                    "& .MuiOutlinedInput-notchedOutline": { border: "none" }, // Remove border
                },
            }}
            inputProps={{
                // sx: { padding: "10px", color: "black" }, // Padding and white text
            }}
        />

    )
}

export default StyledTextInput
