import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";

export default function RoyalityIncome() {
    const [royalityIncome, setRoyalityIncome] = useState([]);


    const royalityincomecolumn = [
        {
          name: "SR No.",
          selector: (row, i) => i + 1,
          sortable: true,
          style: {
            backgroundColor: "transparent",
            color: "rgba(63, 195, 128, 0.9)",
          },
        },
        {
          name: "Level",
          selector: (row, i) => row.level,
          sortable: true,
          style: {
            backgroundColor: "transparent",
            color: "rgba(63, 195, 128, 0.9)",
          },
        },
        {
          name: "Amount",
          selector: (row) => Number(row.amount).toFixed(2) + " BDLT",
          sortable: true,
          style: {
            backgroundColor: "transparent",
            color: "black",
          },
        },
        {
          name: "Timestamp",
          selector: (row) => new Date(row.timestamp).toLocaleString(),
          sortable: true,
          style: {
            backgroundColor: "transparent",
            color: "black",
          },
        },
      ];

      const customStyles = {
        rows: {
          style: {
            minHeight: "52px", // override the row height
          },
        },
        headCells: {
          style: {
            fontSize: "14px",
            fontWeight: "500",
            textTransform: "uppercase",
            paddingLeft: "0 8px",
          },
        },
        cells: {
          style: {
            fontSize: "14px",
            paddingLeft: "0 8px",
          },
        },
      };  
  return (
    <>
      <section className="pb_50 text-light">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>Royality Income</span>
            </h2>
            <hr></hr>
          </div>
          <div className="sm_container text-light">
            <div className="table_inner">
              <div className="table-responsive gridtable">
                <DataTable
                  columns={royalityincomecolumn}
                  data={royalityIncome ? royalityIncome : []}
                  pagination
                  paginationPerPage={4}
                  progressPending={false}
                  customStyles={customStyles}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
