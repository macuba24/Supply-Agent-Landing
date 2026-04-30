import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b border-slate-700 bg-slate-950 px-6 py-4 shadow-2xl">
      <div className="flex gap-8">
        <Link href="/flow-agent" className="group flex items-center gap-3 transition-all hover:opacity-80">
          <div className="relative h-11 w-11 overflow-hidden rounded-lg border border-slate-700 bg-slate-800 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.35),0_6px_14px_rgba(0,0,0,0.45)] group-hover:border-blue-500">
            <Image src="/flow-icon.png" alt="Flow Agent Icon" fill className="object-cover" />
          </div>
          <span className="hidden font-semibold tracking-wide text-slate-200 md:block">Flow Agent</span>
        </Link>

        <Link href="/supply-agent" className="group flex items-center gap-3 transition-all hover:opacity-80">
          <div className="relative h-11 w-11 overflow-hidden rounded-lg border border-slate-700 bg-slate-800 shadow-[inset_0_0_0_1px_rgba(148,163,184,0.35),0_6px_14px_rgba(0,0,0,0.45)] group-hover:border-amber-500">
            <Image src="/supply-icon.png" alt="Supply Agent Icon" fill className="object-cover" />
          </div>
          <span className="hidden font-semibold tracking-wide text-slate-200 md:block">Supply Agent</span>
        </Link>
      </div>

      <Link
        href="/#request-demo"
        className="rounded-md bg-blue-600 px-5 py-2 font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-colors hover:bg-blue-500"
      >
        Jetzt System-Demo vereinbaren
      </Link>
    </nav>
  );
};

export default Navbar;
