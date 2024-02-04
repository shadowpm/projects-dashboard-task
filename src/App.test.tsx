import { render, screen } from '@testing-library/react';
import Home from './components/home/Home';
import { MemoryRouter } from 'react-router-dom';

describe('Home Component', () => {
  test('Renders correctly', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByText('Projects')).toBeInTheDocument();
  });
});
