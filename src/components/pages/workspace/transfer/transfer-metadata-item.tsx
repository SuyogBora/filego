 const MetadataItem = ({ label, value, className = "text-muted-foreground" }: { 
    label: string; 
    value: string; 
    className?: string;
}) => (
    <li className={`text-xs font-medium ${className}`}>
        <span>{label}</span>
        <span className="mx-1">-</span>
        <span>{value}</span>
    </li>
);

export default MetadataItem