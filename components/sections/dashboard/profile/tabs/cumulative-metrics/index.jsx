import AttributeEvaluation from "./attribute-evaluation";
import MetricsProgress from "./metrics-progress";

const ContentLeft = () => <AttributeEvaluation />;

const ContentRight = () => <MetricsProgress />;

const CumulativeMetrics = {
  ContentLeft,
  ContentRight,
};

export default CumulativeMetrics;
