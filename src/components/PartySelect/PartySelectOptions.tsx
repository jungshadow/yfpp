interface PartySelectOptionsProps {
    value: string;
    label: string;
}

function PartySelectOptions({ value, label }: PartySelectOptionsProps) {
    return <option value={value}>{label}</option>;
}

export default PartySelectOptions;
