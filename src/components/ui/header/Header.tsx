import { ChangeEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { Search, SearchIconWrapper, StyledInputBase } from './styles';

interface Props {
  pageHeader: string;
  showBackButton?: boolean;
  onBackButtonClick?: () => void;
  hideSearchBar?: boolean;
  onSearch?: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue?: string;
}

const Header: React.FC<Props> = ({
  pageHeader,
  showBackButton,
  onBackButtonClick,
  hideSearchBar,
  onSearch,
  searchValue,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{ backgroundColor: (theme) => theme.palette.common.black }}
      >
        <Toolbar>
          {showBackButton && (
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='open drawer'
              sx={{ mr: 2 }}
              onClick={onBackButtonClick}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}
          >
            {pageHeader}
          </Typography>
          {!hideSearchBar && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search…'
                value={searchValue}
                onChange={onSearch}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
