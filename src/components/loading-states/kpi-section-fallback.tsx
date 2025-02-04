import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const KPISFallbackCard = () => (
  <Card className="bg-muted dark:bg-green-400/5 border border-green-500/10 border-dashed">
    <CardContent className="p-4 flex items-center gap-4">
      <Skeleton className="w-14 h-14 rounded-full" />
      <div>
        <Skeleton className="h-9 w-24 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
    </CardContent>
  </Card>
);

const KPISectionFallback = () => {
  return (
    <div className="space-y-4">
      <KPISFallbackCard />
      <KPISFallbackCard />
      <KPISFallbackCard />
    </div>
  );
};

export default KPISectionFallback;