import classnames from 'classnames';
import IconLink from 'components/IconLink/IconLink';
import { MapBoxIcon, PointingIconRight } from 'components/Icons';
import './supplementalLinks.scss';

interface SupplementalLinksProps {
    searchIsActive: boolean;
}

const SupplementalLinks = ({ searchIsActive }: SupplementalLinksProps) => {
    const getSupplementalLinksClassName = () => {
        return classnames({
            supplementalLinks: true,
            'supplementalLinks--searchIsActive': searchIsActive,
        });
    };

    return (
        <div className={getSupplementalLinksClassName()}>
            <div className="supplementalLinks__link">
                <IconLink to="/about" label="Who We Are" icon={<PointingIconRight />} />
            </div>
            <div className="supplementalLinks__link">
                <IconLink to="/privacy-policy" label="Privacy Policy" size="small" color="medium">
                    Privacy Policy
                </IconLink>
            </div>
            <div className="supplementalLinks__link">
                <IconLink
                    href="https://www.mapbox.com/"
                    label="Thanks to"
                    icon={<MapBoxIcon />}
                    isStacked
                    iconPosition="after"
                    size="small"
                    color="medium"
                />
            </div>
        </div>
    );
};

export default SupplementalLinks;
