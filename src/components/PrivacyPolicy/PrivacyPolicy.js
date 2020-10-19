import KitchenSink from 'components/KitchenSink/KitchenSink';
import React from 'react';

const PrivacyPolicy = (props) => {
    return (
        <KitchenSink isReversed>
            <h3>We only collect anonymous information.</h3>
            <p>
                We use technologies like cookies (small files stored by your browser), web beacons, or unique device
                identifiers to anonymously identify your computer or device so we can deliver a better experience. Our
                systems also log information like your browser, operating system and IP address.
            </p>
            <p>
                We do not collect personally identifiable information about you. In other words, we do not collect
                information such as your name, address, phone number or email address.
            </p>
            <p>We do not knowingly contact or collect personal information from children under 13.</p>
            <h3>We do not store your precise location.</h3>
            <p>We do not use or collect your precise geographic location.</p>
            <h3>We do not store personal data.</h3>
            <p>See heading.</p>
            <h3>We don&apos;t keep personal data.</h3>
            <p>&apos;nuff said.</p>
            <h3>Address lookups are sent directly to Google</h3>
            <p>
                Lookups are done by submitting your address directly to Google via the{' '}
                <a href="https://developers.google.com/civic-information/">Google Civic Information API</a> and{' '}
                <a href="https://developers.google.com/places/">Google Places API</a>. As part of this request some
                additional information about you, such as the browser you use, the domain name you&apos;re submitting
                your address via (this one) and your IP address are attached. How Google treats user data is governed by
                the <a href="https://www.google.com/intl/en/policies/privacy/">Google Privacy Policy</a>.
            </p>
            <h3>No ad companies collect data through our service.</h3>
            <p>We do not allow advertising companies to collect data through our service for ad targeting.</p>
            <h3>Analytics providers access data on our behalf.</h3>
            <p>
                Analytics companies may access anonymous data (such as your IP address or device ID) to help us
                understand how our services are used. They use this data solely on our behalf. They do not share it
                except in aggregate form; no data is shared as to any individual user. Click to see company privacy
                policies that govern their use of data.
            </p>
            <h3>We take steps to protect personal information</h3>
            <p>...by not collecting it.</p>
            <h3>Special situations may require disclosure of your data.</h3>
            <p>
                To operate the service, we also may make identifiable and anonymous information available to third
                parties in these limited circumstances: (1) with your express consent, (2) when we have a good faith
                belief it is required by law, (3) when we have a good faith belief it is necessary to protect our rights
                or property, or (4) to any successor or purchaser in a merger, acquisition, liquidation, dissolution or
                sale of assets. Your consent will not be required for disclosure in these cases, but we will attempt to
                notify you, to the extent permitted by law to do so.
            </p>
            <h3>You can review more privacy-related information.</h3>
            <p>
                This privacy policy was last updated on Nov 2, 2014. Our privacy policy may change from time to time. If
                we make any material changes to our policies, we will place a prominent notice on our website or
                application.
            </p>
        </KitchenSink>
    );
};

export default PrivacyPolicy;
