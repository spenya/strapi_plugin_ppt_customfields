import React, { useEffect, useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { 
  TextInput,  
  Flex,
  Grid,
  Box,
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
    var hours = Math.floor(value/3600);
    let restSeconds =  value % 3600;
    var minutes = Math.floor(restSeconds/60);
    var seconds = restSeconds % 60;
    var withSeconds = false;
    if( attribute['options'].withSeconds != undefined)
    {
        withSeconds = attribute['options'].withSeconds;
    }
    
    console.log("withSeconds: " + withSeconds);
                                
    const FormatLeadingZeros = (m) => {

        if(m<10)
        {
            m = "0" + m.toString();
        }
        m = m.toString();

        return m;
    }

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
          if(val>59)
          {
            /*
            hours += Math.floor(val/60); 
            val = val%60;
            */
            val = 59;
          }
          minutes = val;
        }
        else if(label== "seconds")
        {
          if(val>59)
          {
            val = 59;
          }
          seconds = val;
        }

        if(isNaN(hours) || hours=="" || hours==undefined)  hours=0;
        if(isNaN(minutes) || minutes=="" || minutes==undefined) minutes=0;
        if(isNaN(seconds) || seconds=="" || seconds==undefined) seconds=0;

        seconds = parseInt(seconds);
        minutes = parseInt(minutes);
        hours = parseInt(hours);



        // Convert selectedOptions to array of labels and call onChange with the new value
        const newValue = parseInt(hours * 3600, 10) + parseInt(minutes * 60,10) + parseInt(seconds,10)
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
                    <Flex marginTop={1}>
                        <TextInput   
                            value={hours} 
                            aria-label='&nbsp;'
                            onChange={(e) => handleChange('hours', e.target.value)} />
                        <Box paddingRight={1} paddingLeft={1}>
                            <Typography as='label' textColor='neutral600'>
                                : 
                            </Typography>
                        </Box>
                        <TextInput 
                            value={FormatLeadingZeros(minutes)} 
                            aria-label='&nbsp;'
                            onChange={(e) => handleChange('minutes', e.target.value)} />

                        {
                       withSeconds  && (
                                 <Box paddingRight={1} paddingLeft={1}>
                                    <Typography as='label' textColor='neutral600'>
                                        : 
                                    </Typography>
                                </Box>)
                        }
                        {
                        withSeconds && (<TextInput 
                                value={FormatLeadingZeros(seconds)} 
                                aria-label='&nbsp;' onChange={(e) => handleChange("seconds", e.target.value)} />
                                )
                        }
                    </Flex>
                
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
