import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <section>
      <div>
        <div className="mt-5">
          <Link
            href={"/"}
            className="text-4xl  ml-8 mr-7 font-bold text-black hover:text-gray-500 "
          >
            MyStore
          </Link>
          {children}
        </div>
      </div>
    </section>
  );
}
