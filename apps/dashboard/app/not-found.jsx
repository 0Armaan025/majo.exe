import { QuestionMarkCircleIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Header1, HeaderBig } from "@/components/blocks/Headers";
import { PrimaryButton } from "@/components/buttons/server/Primary";
import { SecondaryButton } from "@/components/buttons/server/Secondary";
import "styles/glitch.css";

export default function NotFound() {
 return (
  <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center gap-4 before:absolute before:z-10  before:h-full before:w-full before:opacity-5 before:grayscale before:md:bg-grid-[#fff]">
   <div className="absolute left-0 top-0 z-10 h-full w-full bg-[radial-gradient(circle,rgba(2,0,36,0)0,rgb(16,17,16,100%))]" />
   <div className="z-30 flex flex-col items-center justify-center gap-4">
    <HeaderBig title="404!" className={"glitch relative"}>
     404!
    </HeaderBig>
    <Header1>Sorry, page not found!</Header1>
    <h2 className="text-center text-xl opacity-50">We're sorry we can't find the page you're looking for.</h2>
    <div className="flex gap-4">
     <PrimaryButton href="/">
      <ArrowLeftIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" />
      Go back home
     </PrimaryButton>
     <SecondaryButton href="/discord">
      <QuestionMarkCircleIcon className="mr-2 h-5 w-5" aria-hidden="true" role="img" /> Contact support
     </SecondaryButton>
    </div>
   </div>
  </div>
 );
}
