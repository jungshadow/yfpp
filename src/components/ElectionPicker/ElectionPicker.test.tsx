import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppContext, DispatchContext } from 'appReducer';
import ElectionPicker from './ElectionPicker';
import type { AppState } from 'types/state';
import { initialState } from 'appReducer';
import type { ElectionInfo } from 'types/api';

const mockElections: ElectionInfo[] = [
    {
        id: '11098',
        name: 'Texas Democratic Primary Runoff Election',
        electionDay: '2026-05-26',
        ocdDivisionId: 'ocd-division/country:us/state:tx',
    },
    {
        id: '11256',
        name: 'Texas Republican Primary Runoff Election',
        electionDay: '2026-05-26',
        ocdDivisionId: 'ocd-division/country:us/state:tx',
    },
];

const renderWithContext = (stateOverrides: Partial<AppState> = {}) => {
    const state = { ...initialState, ...stateOverrides };
    const dispatch = vi.fn();
    return {
        dispatch,
        ...render(
            <MemoryRouter>
                <AppContext.Provider value={state}>
                    <DispatchContext.Provider value={dispatch}>
                        <ElectionPicker />
                    </DispatchContext.Provider>
                </AppContext.Provider>
            </MemoryRouter>,
        ),
    };
};

describe('ElectionPicker', () => {
    it('renders nothing when no pending or relevant elections', () => {
        const { container } = renderWithContext();
        expect(container.firstChild).toBeNull();
    });

    it('renders nothing for a single election', () => {
        const { container } = renderWithContext({
            relevantElections: [mockElections[0]],
        });
        expect(container.firstChild).toBeNull();
    });

    it('renders election buttons when pendingElections is set', () => {
        renderWithContext({ pendingElections: mockElections });
        expect(screen.getByText(/multiple fucking elections/i)).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Texas Democratic Primary Runoff/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /Texas Republican Primary Runoff/i }),
        ).toBeInTheDocument();
    });

    it('renders election buttons from relevantElections when no pending', () => {
        renderWithContext({ relevantElections: mockElections });
        expect(screen.getByText(/upcoming fucking elections/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Texas Democratic/i })).toBeInTheDocument();
    });

    it('groups elections by date', () => {
        const multiDate: ElectionInfo[] = [
            ...mockElections,
            {
                id: '9999',
                name: 'Texas Special Election',
                electionDay: '2026-06-16',
                ocdDivisionId: 'ocd-division/country:us/state:tx',
            },
        ];
        renderWithContext({ pendingElections: multiDate });
        // Dates may shift by a day due to UTC parsing in local timezone
        expect(screen.getByText(/May \d+\w+, 2026/i)).toBeInTheDocument();
        expect(screen.getByText(/June \d+\w+, 2026/i)).toBeInTheDocument();
        expect(screen.getAllByRole('button')).toHaveLength(3);
    });

    it('highlights the active election', () => {
        renderWithContext({
            relevantElections: mockElections,
            electionInfo: { id: '11098', name: 'Texas Democratic Primary Runoff Election' },
        });
        const activeButton = screen.getByRole('button', { name: /Texas Democratic/i });
        expect(activeButton.className).toContain('electionPicker__button--active');
    });
});
