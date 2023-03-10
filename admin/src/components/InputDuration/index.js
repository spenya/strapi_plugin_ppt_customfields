import React, { useEffect, useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { 
  TextInput,  
  Flex,
  Grid,
  GridItem,
  Label,
  Stack,
  Typography,
  Field,
  FieldHint,
  FieldError,
  FieldLabel,
  FieldInput
} from '@strapi/design-system';

const InputDuration = ({ name, onChange, value, options, attribute, required, error, description, intlLabel, labelAction }) => {
  
  const { formatMessage } = useIntl();

  var hours = Math.floor(value/60);
  var minutes = value % 60;

  // Handle toggle input change and update selectedOptions state
  const handleChange = (label, val) => {
    
    console.log(label + " >> " + val);
    /*
    if(val<0) val=0;
    if(isNaN(val)) val=0;
    */

    if(label == "hours")
    {
      hours = val;
    }
    else if(label== "minutes")
    {
      if(val>59) val=59;
      minutes = val;
    }

    if(isNaN(hours) || hours=="" || hours==undefined)  hours=0;
    if(isNaN(minutes) || minutes=="" || minutes==undefined) minutes=0;

    minutes = parseInt(minutes);
    hours = parseInt(hours);



    // Convert selectedOptions to array of labels and call onChange with the new value
    const newValue = parseInt(hours * 60, 10) + parseInt(minutes,10)
    onChange({ target: { name, value: newValue } });
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
          <FieldLabel action={labelAction}>{formatMessage(intlLabel)} </FieldLabel>
          <Grid gap={4}>
            <GridItem s={5} col={5}>
              <TextInput   
                value={hours} 
                aria-label="&nbsp;"
                step={1}
                onChange={(e) => handleChange("hours", e.target.value)} /> 
            </GridItem>
            <GridItem s={2} col={2}>
              <FieldLabel>h :</FieldLabel>
            </GridItem>
            <GridItem s={5} col={5}>
              <TextInput 
                value={minutes} 
                aria-label="&nbsp;"
                step={1}
                onChange={(e) => handleChange("minutes", e.target.value)} />
          </GridItem>
          <GridItem s={1} col={1}>
              <FieldLabel>m</FieldLabel>
            </GridItem>
          </Grid>
          <FieldHint/>
          <FieldError/>
        </Stack>
      </Field>
  );
};

InputDuration.defaultProps = {
  value: 0,
};

InputDuration.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default InputDuration;
