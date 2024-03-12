import NavBar from "@/app/components/NavBar";

export default function MainLayout({ children }) {
  return (
    <section>
      <div>
        <NavBar />
        <div>{children}</div>
      </div>
    </section>
  );
}
