import TextField, { type TextFieldVariants } from '@mui/material/TextField';
type Props = {
  label: string;
  variant?: TextFieldVariants;
};

const CommonTextField = (props: Props) => {
  const { label, variant } = props;
  return <TextField label={label} variant={variant} />;
};

export default CommonTextField;
