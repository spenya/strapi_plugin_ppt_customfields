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

const InputPriceTable = ({ name, onChange, value, options, attribute, required, error, description, intlLabel, labelAction }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const { formatMessage } = useIntl();

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
            <Flex marginTop={1}>
            
            </Felx>
          <FieldHint />
          <FieldError />
        </Stack>
      </Field>
  );
};

InputPriceTable.defaultProps = {
  value: '',
};

InputPriceTable.propTypes = {
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

export default InputPriceTable;






