import { useState } from 'react';
import { ListItem, IconButton, ListItemText, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { mapPersonAttributes, IMapPersonKeys } from '../../constants/mapPersonAttributes';
import { IPerson } from '../../constants/person';


interface IEditField {
  attribute: IMapPersonKeys;
  person: IPerson;
  onChange: (key: IMapPersonKeys, value: string) => void;
};

export const EditField = ({ attribute, person, onChange }: IEditField) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState<string>(person[attribute].toString());

  const handleClick = () => {
    setEdit(false);
    onChange(attribute, text);
  };

  if (edit) {
    return (
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="done" onClick={handleClick}>
            <DoneIcon />
          </IconButton>
        }
      >
        <TextField id="outlined-basic" label={mapPersonAttributes[attribute]} variant="outlined" value={text} onChange={e => setText(e.target.value)} />
      </ListItem>
    )
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="edit" onClick={() => setEdit(true)}>
          <EditIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={mapPersonAttributes[attribute]}
        secondary={person[attribute]}
      />
    </ListItem>
  );
};