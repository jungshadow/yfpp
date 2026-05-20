import './candidateCard.scss';

interface CandidateCardProps {
    contest: {
        type: string;
        office?: string;
        candidates?: Array<{
            name: string;
            party?: string;
            channels?: Array<{ type: string; id: string }>;
        }>;
    };
}

function CandidateCard(props: CandidateCardProps) {
    const renderSocial = (channels?: Array<{ type: string; id: string }>) => {
        if (!channels) {
            return;
        }
        return channels.map((channel, index) => (
            <li key={index} className="candidateCard__socialChannel">
                <a
                    href={channel.id}
                    className={`candidateCard__socialLink candidateCard__socialLink--${channel.type.toLowerCase()}`}
                >
                    {channel.type}
                </a>
            </li>
        ));
    };

    const renderCandidateList = (contest: CandidateCardProps['contest']) => {
        return (contest.candidates || []).map((candidate, index) => (
            <li className="candidateCard__candidate" key={`candidate_${index}`}>
                <span className="candidateCard__candidateName">{candidate.name}</span>
                {candidate.party && (
                    <span className="candidateCard__candidateParty"> - {candidate.party}</span>
                )}
                <ul className="candidateCard__social">{renderSocial(candidate.channels)}</ul>
            </li>
        ));
    };

    const { contest } = props;

    return (
        <div className="candidateCard">
            <div className="candidateCard__hd">
                <span className="candidateCard__type">{contest.type}</span>
                <h3 className="candidateCard__office">{contest.office}</h3>
            </div>
            <div className="candidateCard__bd">
                <ul className="candidateCard__candidateList">{renderCandidateList(contest)}</ul>
            </div>
        </div>
    );
}

export default CandidateCard;
