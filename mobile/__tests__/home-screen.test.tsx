import { render, screen } from '@testing-library/react-native';

import HomeScreen from '../src/app/index';

describe('HomeScreen', () => {
  it('renders the app name', () => {
    render(<HomeScreen />);

    expect(screen.getByText('모아스퀘어')).toBeTruthy();
  });
});
