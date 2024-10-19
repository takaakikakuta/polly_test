import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import Polly from "@/components/Polly";

Amplify.configure(outputs);

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Polly/>
    </div>
  );
}
