import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <section>
      <div>
        <div>
          <Link href={"/"}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/300px-EBay_logo.svg.png"
              alt=""
              className="ml-5 w-32 mt-5"
            />
          </Link>
          {children}
        </div>
      </div>
    </section>
  );
}
