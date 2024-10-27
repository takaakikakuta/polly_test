import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import Polly from "@/components/Polly";

Amplify.configure(outputs);

export default function Home() {
  return (
    <div className="container mt-10">
      <Polly/>
    </div>
  );
}
