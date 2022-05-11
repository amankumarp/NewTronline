import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { FiExternalLink } from "react-icons/fi";


export default function RoyalityHistory() {
    const [royalityHistory, setRoyalityHistory] = useState([]);

    const royalitycolumn = [
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
          name: "Amount",
          selector: (row) => (Number(row.amount) / 1e18).toFixed(2) + " BDLT",
          sortable: true,
          style: {
            backgroundColor: "transparent",
            color: "black",
          },
        },
        {
          name: "Timestamp",
          selector: (row) =>
            new Date(Number(row.block_timestamp) * 1000).toLocaleString(),
          sortable: true,
          style: {
            backgroundColor: "transparent",
            color: "black",
          },
        },
    
        {
          name: "Transaction Id",
          selector: (row) => (
            <a
              href={`https://explorer.bdltscan.io/tx/${row.transaction_id}/internal-transactions`}
              target="_blank"
              style={{ color: "white", textDecoration: "none" }}
            >
              {row.transaction_id
                ? row.transaction_id.substr(0, 10) +
                  "......." +
                  row.transaction_id.substr(
                    row.transaction_id.length - 10,
                    row.transaction_id.length
                  )
                : "--"}
              <FiExternalLink size={18} className="mx-1 pb-1" color="white" />
            </a>
          ),
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
              <span>Royality History</span>
            </h2>
            <hr></hr>
          </div>
          <div className="sm_container text-light">
            <div className="table_inner">
              <div className="table-responsive gridtable">
                <DataTable
                  columns={royalitycolumn}
                  data={royalityHistory ? royalityHistory : []}
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
