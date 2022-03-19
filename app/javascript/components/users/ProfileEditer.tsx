import { TargetObserver } from "@hotwired/stimulus/dist/types/core/target_observer";
import { Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { OnChangeEventSetter } from '../../types/utils/react';
import UploadButton from "../ui/buttons/UploadButton";

type Props = {
  name: string;
  bio: string;
  phone: string;
  image?: File | null;
  onChangeName: React.Dispatch<React.SetStateAction<string>>;
  onChangeBio: React.Dispatch<React.SetStateAction<string>>;
  onChangePhone: React.Dispatch<React.SetStateAction<string>>;
  onChangeImage: React.Dispatch<React.SetStateAction<File | undefined>>;
  onSubmitEdit: () => void
}

const ProfileEditer = ({ name, bio, phone, image, onChangeName, onChangeBio, onChangePhone, onSubmitEdit, onChangeImage}: Props) => {
  const [imageSrc, setImageSrc] = useState('');
  const createImageSource = () => {
    if(!image) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if(typeof event?.target?.result === 'string')
        setImageSrc(event.target.result);
    }
    reader.readAsDataURL(image);
  }
  const _onChangeName: OnChangeEventSetter = (event) => {
    onChangeName(event.target.value);
  }
  const _onChangeBio: OnChangeEventSetter = (event) => {
    onChangeBio(event.target.value);
  }
  const _onChangePhone: OnChangeEventSetter = (event) => {
    onChangePhone(event.target.value);
  }
  const _onChangeImage: OnChangeEventSetter = (event) => {
    const file: File | undefined = event.target.files?.item(0) || undefined;
    onChangeImage(file);
  }
  const _onSubmitEdit = () => {
    onSubmitEdit();
  }

  useEffect(() => {
    createImageSource()
  },[image]);

  return (
    <div>
      <Box component="form">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField onChange={_onChangeName} value={name} label="Name" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField onChange={_onChangeBio} value={bio} label="Bio" fullWidth variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField onChange={_onChangePhone} value={phone} label="phone" fullWidth variant="outlined" type="tel"/>
          </Grid>
          <Grid item xs={12}>
            <UploadButton
              onChange={_onChangeImage}
            />
            { imageSrc ? (
              <img src={imageSrc} className="object-contain object-center" width="84" height="84"/>
            ): null}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" size="large" fullWidth disableElevation onClick={_onSubmitEdit}>Update</Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
};

export default ProfileEditer;