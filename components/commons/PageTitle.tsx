import Text from "@/components/commons/Text";

interface Props {
  title: string;
  desc?: string;
}

function PageTitle({ title, desc }: Props) {
  return (
    <div className="mb-4">
      <Text size="xxl" weight="bold">
        {title}
      </Text>
      <Text className="text-muted-foreground">{desc}</Text>
    </div>
  );
}

export default PageTitle;
