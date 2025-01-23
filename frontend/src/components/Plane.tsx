import Businesspartners from "./Businesspartners";
import Businesspromoters from "./Businesspromoters";
import Dashboard from "./Dashboard"
import Invoice from "./Invoice";
import Newrequests from "./Newrequests";
import Renewal from "./Renewal";


export default function Plane({tab}:{tab:string}) {
  console.log(tab);
  
  if (tab==="Business partners") {
    return <Businesspartners/>
  }
  if (tab==="Business promoters") {
    return <Businesspromoters/>
  }
  if (tab==="New requests") {
    return <Newrequests/>
  }
  if (tab==="Invoice") {
    return <Invoice/>
  }
  if (tab==="Renewal") {
    return <Renewal/>
  }
  return <Dashboard/>
}
