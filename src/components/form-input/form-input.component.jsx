import { FormInputLabel, Input, Group} from './form-input.styles.jsx'

const FormInput = ({ label, otherProps}) => {

  return(
    <Group>
      <Input {...otherProps}/>
      { label && (
        <FormInputLabel shirnk={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  )
}

export default FormInput;