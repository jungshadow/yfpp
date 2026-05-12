import React from 'react';

interface ElectionSelectOptionsProps {
    value: string;
    label: string;
    selected?: boolean;
}

function ElectionSelectOptions({ value, label }: ElectionSelectOptionsProps) {
    return <option value={value}>{label}</option>;
}

export default ElectionSelectOptions;
