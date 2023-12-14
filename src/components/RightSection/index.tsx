import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  TextField,
  MenuItem,
  Button,
  Alert
} from "@mui/material";
import axios from "axios";

const RightSection = ({base64Image, setImageUrl, setSelectedFile}) => {
  const [expand, setExpand] = React.useState<string>("");
  const [upscale, setUpscale] = React.useState<string>("smart_enhance");
  const [resize, setResize] = React.useState<number>(100);
  const [isImagePresent, setIsImagePresent] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<boolean>(false);
  const [background, setBackground] = React.useState<string>("none");
  const [disableSubmit, setDisableSubmit] = React.useState<boolean>(false);

  const handleChangeUpscale = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpscale(event.target.value);
  };

  const handleExpand = (panel: string) => () => {
    setExpand(panel);
  };

  const handleSizeChange = (event: Event, newValue: number | number[]) => {
    setResize(newValue as number);
    console.log(event);
  };

  const handleBackgroundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBackground(event.target.value);
  }

  const handleClick = () => {
    if (!isImagePresent) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  }

  const handleSubmit = () => {
    setDisableSubmit(true);
    let backgroundRemove = false;
    let backgroundBlur = false;
    let upscaleValue = null;
    if (background === "transparent") {
      backgroundRemove = true;
    } else if (background === "blur") {
      backgroundBlur = true;
    }

    if (upscale === "smart_enhance") {
      upscaleValue = "smart_enhance";
    } else if (upscale === "digital_art") {
      upscaleValue = "digital_art";
    } else if (upscale === "photo") {
      upscaleValue = "photo";
    } else if (upscale === "faces") {
      upscaleValue = "faces";
    } else if (upscale === "none") {
      upscaleValue = null;
    }

    console.log(import.meta.env.VITE_APP_API_URL);


    axios({
      method: "post",
      url: import.meta.env.VITE_APP_API_URL,
      data: {
        image: base64Image,
        operations: {
          restorations: {
            upscale: upscaleValue
          },
          resizing: {
            width: `${resize}%`,
            height: `${resize}%`
          },
          background: {
            remove: backgroundRemove,
            blur: backgroundBlur
          }
        }
      }
    })
    .then((response) => {
      setDisableSubmit(false);
      window.alert("Image successfully processed!");
      console.log("RESPONSE:",response);
      const data = response.data;
      async function loadImageFile(){const response = await fetch(data.data.data.output.tmp_url, {mode: 'no-cors'});
        const blob = await response.blob();
        const fileName = 'image.jpg';
        const file = new File([blob], fileName, { type: blob.type });
        setSelectedFile(file);
      }
      loadImageFile();
      setImageUrl(data.data.data.output.tmp_url);
    })
    .catch((error) => {
      setDisableSubmit(false);
      window.alert("Error processing image!");
      console.log(error);
    })
  }

  React.useEffect(() => {
    if (base64Image) {
      setIsImagePresent(true);
    } else {
      setIsImagePresent(false);
    }
  }, [base64Image]);

  return (
    <div className="h-full">
      <div className="w-full flex items-center justify-center text-4xl font-semibold pt-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        {" "}
        OPTIONS
      </div>
      <div className="w-full flex flex-col flex-justify-between">
      <div className="w-full p-4">
        <div className={`w-full rounded ${!isImagePresent && "bg-white"}`} onClick={handleClick}>
        {alert && <Alert severity="warning">Please upload an image first!</Alert>}
        <Accordion
          expanded={expand === "panel1"}
          onChange={handleExpand("panel1")}
          disabled={!isImagePresent}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <div className="text-lg font-bold">Upscale</div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={upscale}
                defaultValue={upscale}
                onChange={handleChangeUpscale}
              >
                <FormControlLabel
                  value="smart_enhance"
                  control={<Radio />}
                  label="Smart Enhance"
                />
                <FormControlLabel
                  value="digital_art"
                  control={<Radio />}
                  label="Digital Art"
                />
                <FormControlLabel
                  value="photo"
                  control={<Radio />}
                  label="Photo"
                />
                <FormControlLabel
                  value="faces"
                  control={<Radio />}
                  label="Faces"
                />
                <FormControlLabel
                  value="none"
                  control={<Radio />}
                  label="None"
                />
              </RadioGroup>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expand === "panel2"}
          onChange={handleExpand("panel2")}
          disabled={!isImagePresent}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>
              <div className="text-lg font-bold">Resize</div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div>Value: {resize + `%`}</div>
              <Stack
                spacing={2}
                direction="row"
                sx={{ mx: 4 }}
                alignItems="center"
              >
                <Slider
                  valueLabelDisplay="auto"
                  defaultValue={100}
                  aria-label="Size"
                  value={resize}
                  onChange={handleSizeChange}
                  min={10}
                  max={200}
                />
              </Stack>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expand === "panel3"}
          onChange={handleExpand("panel3")}
          disabled={!isImagePresent}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>
              <div className="text-lg font-bold">Background</div>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>

              
              <TextField
                id="background-remove"
                select
                defaultValue="none"
                label="Type"
                variant="filled"
                className="w-full"
                onChange={handleBackgroundChange}
              >
                <MenuItem key="none" value="none">
                    None
                  </MenuItem>
                  <MenuItem key="transparent" value="transparent">
                    Transparent
                  </MenuItem>
                  <MenuItem key="blur" value="blur">
                    Blur
                  </MenuItem>
              </TextField>
            </Typography>
          </AccordionDetails>
        </Accordion>
      <div className={`w-full ${isImagePresent && "mt-4"}`}>

      <Button variant="contained" className="w-full" disabled={!isImagePresent || disableSubmit} onClick={handleSubmit}>Apply Changes</Button>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default RightSection;
