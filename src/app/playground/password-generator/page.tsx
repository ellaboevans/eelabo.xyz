import Back from "@/components/back";
import ExternalLink from "@/components/external-link";
import PasswordGenerator from "./_components/password-generator";

export default function GeneratorPage() {
  return (
    <div className="mt-4">
      <Back />
      <h1 className="text-4xl  pb-1 font-bold mt-8">Password Generator</h1>
      <p className="dark:text-stone-400 text-stone-500  mt-2">
        Inspired by{" "}
        <ExternalLink href="https://www.lastpass.com/features/password-generator">
          LastPass
        </ExternalLink>
        , a simple and secure password generator that creates strong passwords based on user-defined
        criteria.
      </p>
      <PasswordGenerator />
    </div>
  );
}
