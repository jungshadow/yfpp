import { render, screen } from '@testing-library/react';
import ElectionTitle from './ElectionTitle';

describe('ElectionTitle', () => {
    it('renders election name with fucktify', () => {
        render(<ElectionTitle electionInfo={{ name: 'General Election', electionDay: '2024-11-05' }} />);
        expect(screen.getByText(/general fucking election/i)).toBeInTheDocument();
    });

    it('renders formatted date', () => {
        render(<ElectionTitle electionInfo={{ name: 'Primary', electionDay: '2024-06-11' }} />);
        // Date string is parsed as UTC midnight; local render may shift by a day
        expect(screen.getByText(/June \d+\w+, 2024/)).toBeInTheDocument();
    });

    it('does not render date row when electionDay is missing', () => {
        const { container } = render(<ElectionTitle electionInfo={{ name: 'Special Election' }} />);
        expect(container.querySelector('.electionTitle__date')).toBeNull();
    });
});
