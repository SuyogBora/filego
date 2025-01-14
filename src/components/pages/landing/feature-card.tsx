interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    bgColor: string;
}

const FeatureCard = ({ title, description, icon, bgColor }: FeatureCardProps) => {
    return (
        <div className={`p-4 flex items-start gap-4 shadow-lg ${bgColor} rounded-sm border-border border`}>
            <span className="flex-shrink-0">{icon}</span>
            <div className="text-start">
                <h6 className="text-sm mb-0.5 font-medium">{title}</h6>
                <p className="text-xs text-muted-foreground leading-[1.5]">{description}</p>
            </div>
        </div>
    );
};

export default FeatureCard;
