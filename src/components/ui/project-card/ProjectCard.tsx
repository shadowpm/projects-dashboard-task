import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { indigo } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMore from './styles';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  projectTitle: string;
  projectDuration?: string;
  usersList?: string;
  devicesList?: string;
  onClickEdit: () => void;
}

const ProjectCard: React.FC<Props> = ({
  projectTitle,
  projectDuration,
  onClickEdit,
  usersList,
  devicesList,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: indigo[500] }} aria-label='recipe'>
            {projectTitle.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <Tooltip title='Edit'>
            <IconButton aria-label='settings' onClick={onClickEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        }
        title={projectTitle}
        subheader={projectDuration}
      />
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography fontWeight='bold'>Users:</Typography>
          <Typography fontSize='small' paddingBottom='10px'>
            {usersList ? usersList : '-'}
          </Typography>
          <Typography fontWeight='bold'>Devices (SN):</Typography>
          <Typography fontSize='small'>
            {devicesList ? devicesList : '-'}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProjectCard;
