import React, { useMemo } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import MOCK_DATA from "./MOCK_DATA.json";
import { COLUMNS } from "./columns";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { FilterInput } from "./FilterInput";

//Functional component
export function DataTable({ isSorted, allowFilter }) {
  //useMemo is hook which helps in optimization and correct re-render of data
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  /* useTable is hook takes two argumensts
       It is used to initate the table instance from the react-table
    */

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      allowFilter ? useFilters : "",
      isSorted ? useSortBy : ""
    );

  return (
    <Table striped bordered hover size="sm" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((columns) =>
              isSorted ? (
                <th {...columns.getHeaderProps(columns.getSortByToggleProps())}>
                  {columns.render("Header")}
                  <span>
                    {columns.isSorted ? (
                      columns.isSortedDesc ? (
                        <FaSortDown />
                      ) : (
                        <FaSortUp />
                      )
                    ) : (
                      <FaSort />
                    )}
                  </span>
                  {allowFilter && columns.canFilter ? (
                    <FilterInput column={columns} />
                  ) : (
                    <></>
                  )}
                </th>
              ) : (
                <th {...columns.getHeaderProps()}>
                  {columns.render("Header")}
                  {allowFilter && columns.canFilter ? (
                    <FilterInput column={columns} />
                  ) : (
                    <></>
                  )}
                </th>
              )
            )}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  //destructing cell props
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
