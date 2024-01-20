import { Gutter } from "payload/components/elements";
import DefaultTemplate from "payload/dist/admin/components/templates/Default";
import { Table } from "payload/dist/admin/components/elements/Table";

const Summary = () => {
  return (
    <DefaultTemplate>
      <Gutter>
        <h1>Best Price Summary</h1>
        <Table
          data={[
            {
              store: "Store 1",
              first: 10,
              second: 5,
              third: 10,
            },
            {
              store: "Store 2",
              first: 10,
              second: 5,
              third: 10,
            },
            {
              store: "Store 3",
              first: 10,
              second: 5,
              third: 10,
            },
            {
              store: "Store 4",
              first: 10,
              second: 5,
              third: 10,
            },
            {
              store: "Store 5",
              first: 10,
              second: 5,
              third: 10,
            },
          ]}
          columns={[
            {
              name: "Store Name",
              label: "Store",
              accessor: "store",
              active: true,
              components: {
                Heading: <>Store Name</>,
                renderCell(_, data) {
                  return <>{data}</>;
                },
              },
            },
            {
              name: "First",
              label: "First",
              accessor: "first",
              active: true,
              components: {
                Heading: <>First</>,
                renderCell(_, data) {
                  return <>{data}</>;
                },
              },
            },
            {
              name: "Second",
              label: "Second",
              accessor: "second",
              active: true,
              components: {
                Heading: <>Second</>,
                renderCell(_, data) {
                  return <>{data}</>;
                },
              },
            },
            {
              name: "Third",
              label: "Third",
              accessor: "third",
              active: true,
              components: {
                Heading: <>Third</>,
                renderCell(_, data) {
                  return <>{data}</>;
                },
              },
            },
          ]}
        ></Table>
      </Gutter>
    </DefaultTemplate>
  );
};

export default Summary;
