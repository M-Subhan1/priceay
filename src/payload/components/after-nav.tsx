import Link from "next/link";
import NavGroup from "payload/dist/admin/components/elements/NavGroup";

export default function CustomNav() {
  return (
    <>
      <NavGroup label="Pages">
        <Link href="/admin/views/summary">Summary</Link>
      </NavGroup>
    </>
  );
}
