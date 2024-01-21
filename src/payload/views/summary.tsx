"use client";

import { Gutter } from "payload/components/elements";
import DefaultTemplate from "payload/dist/admin/components/templates/Default";
import { LoadingOverlay } from "payload/dist/admin/components/elements/Loading";
import { Table } from "payload/dist/admin/components/elements/Table";
import { useEffect, useState } from "react";

const Summary = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await fetch("/api/summary");
      const { data } = await response.json();

      setData(data);
      setIsLoading(false);
    })();
  }, []);

  return (
    <DefaultTemplate>
      {isLoading && <LoadingOverlay />}
      <Gutter>
        <h1>Best Price Summary</h1>
        <Table
          data={data}
          columns={[
            {
              name: "Store Name",
              label: "Store",
              accessor: "store.name",
              active: true,
              components: {
                Heading: <>Store Name</>,
                renderCell(data) {
                  return <>{data.store.name}</>;
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
