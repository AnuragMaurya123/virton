import Businesspartners from "./Businesspartners";
import Businesspromoters from "./Businesspromoters";
import Dashboard from "./Dashboard";
import Invoice from "./Invoice";
import Newrequests from "./Newrequests";
import Renewal from "./Renewal";

interface PlaneProps {
  tab: string;  // The current tab selected
}

export default function Plane({ tab }: PlaneProps) {
  // Render the component based on the selected tab
  if (tab === "Business partners") {
    return <Businesspartners />;
  }

  if (tab === "Business promoters") {
    return <Businesspromoters />;
  }

  if (tab === "New requests") {
    return <Newrequests />;
  }

  if (tab === "Invoice") {
    return <Invoice />;
  }

  if (tab === "Renewal") {
    return <Renewal />;
  }

  // Default to Dashboard if no tab matches
  return <Dashboard />;
}
