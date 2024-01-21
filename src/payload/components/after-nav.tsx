import NavGroup from "payload/dist/admin/components/elements/NavGroup";

export default function CustomNav() {
  return (
    <>
      <NavGroup label="Pages">
        <a href={"/admin/views/summary"} target="_blank">
          Summary
        </a>
      </NavGroup>
    </>
  );
}
