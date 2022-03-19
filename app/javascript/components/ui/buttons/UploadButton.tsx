import { Button } from '@mui/material';
import React from 'react';
import { OnChangeEventSetter } from '../../../types/utils/react';

type Props = {
  onChange: OnChangeEventSetter;
};
const UploadButton = ({ onChange }: Props) => {
  return (
    <label htmlFor="contained-button-file">
      <input
        onChange={onChange}
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        className="hidden"
      />
      <Button variant="contained" component="span">
        Upload
      </Button>
    </label>
  );
};
export default UploadButton;
