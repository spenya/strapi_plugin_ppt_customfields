import React, { useEffect, useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { 
  ToggleInput,  
  Flex,
  Grid,
  GridItem,
  Stack,
  Typography,
  Field,
  FieldHint,
  FieldError,
  FieldLabel,
  FieldInput
} from '@strapi/design-system';

const InputMultiBoolean = ({ name, onChange, value, options, attribute, required, error, description, intlLabel, labelAction }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const { formatMessage } = useIntl();

  const div = styled.div`
    margin-top:20px;
    margin-bottom: 30px;
  `

  // Load options from Content Type Builder and transform them to include label and value properties
  options = useMemo(() => {
    return (attribute['options'].list || []).map((option, index) => {
      const label = option;
      if (!label) return null;

      const bit = 1 << index;
      const value = parseInt(bit, 10);

      return { label, value };
    }).filter(Boolean);
  }, [attribute]);

  // Update selectedOptions state when the value prop changes
  useEffect(() => {
    const selectedLabels = JSON.parse(value) || [];
    const selectedOptions = options.filter(option => selectedLabels.includes(option.label));
    setSelectedOptions(selectedOptions);
  }, [value, options]);

  // Handle toggle input change and update selectedOptions state
  const handleOptionChange = (label, isChecked) => {
    let newSelectedOptions = [];
    if (isChecked) {
      newSelectedOptions = [...selectedOptions, label];
    } else {
      newSelectedOptions = selectedOptions.filter(selectedOption => selectedOption !== label);
    }

    setSelectedOptions(newSelectedOptions);

    // Convert selectedOptions to array of labels and call onChange with the new value
    const newValue = JSON.stringify(newSelectedOptions.map(option => option.label));
    onChange({ target: { name, value: newValue } });
  };

  // Check if an option is checked based on its label
  const isChecked = (label) => {
    const selectedOption = selectedOptions.find(selectedOption => selectedOption.label === label);
    return selectedOption !== undefined;
  };

  return (
     <Field
      name={name}
      id={name}
      // GenericInput calls formatMessage and returns a string for the error
      error={error}
      hint={description && formatMessage(description)}
      required={required}>

        <Stack spacing={1}>
          
          <FieldLabel action={labelAction}>{formatMessage(intlLabel)}</FieldLabel>
          <div></div>
          <hr/>
            <Grid gap={4}>
              {options.map((option) => (
                <GridItem s={12} col={4}>
                  <ToggleInput
                    key={option.value}
                    name={`${name}_${option.value}`}
                    label={option.label}
                    offLabel= {attribute['options'].offText}
                    onLabel= {attribute['options'].onText}
                    onChange={(e) => handleOptionChange(option, e.target.checked)}
                    checked={isChecked(option.label)}
                  />
                </GridItem>
              ))}
            </Grid>
          <FieldHint />
          <FieldError />
        </Stack>
      </Field>
  );
};

InputMultiBoolean.defaultProps = {
  value: '',
};

InputMultiBoolean.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default InputMultiBoolean;
