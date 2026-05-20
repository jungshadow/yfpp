import React from 'react';

interface PageSectionProps {
    children: React.ReactNode;
}

const PageSection = ({ children }: PageSectionProps) => {
    return <section className="page__section">{children}</section>;
};

export default PageSection;
