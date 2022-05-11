import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";

export default function MyTeamDownline() {

    const [requiredMember, getRequiredMember] = useState([]);
    const requiredmembercolumn = [
        {
          name: "Level",
          selector: (row) => row.level,
          sortable: true,
          style: {
            backgroundColor: "transparent",
            color: "rgba(63, 195, 128, 0.9)",
          },
        },
        {
          name: "Required Members",
          selector: (row) => row.required_member + " Members",
          sortable: true,
          style: {
            backgroundColor: "transparent",
            color: "rgba(63, 195, 128, 0.9)",
          },
        },
        {
          name: "Actual Members",
          selector: (row) => row.total_member + " Members",
          sortable: true,
          style: {
            backgroundColor: "transparent",
            color: "rgba(63, 195, 128, 0.9)",
          },
        },
        {
          name: "Target Status",
          selector: "vip2",
          sortable: true,
          cell: (data) => (
            <span
              className={`badge text-white ${
                data.total_member >= data.required_member
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {data.total_member >= data.required_member
                ? "Achieved"
                : "Not Achieved"}
            </span>
          ),
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
       <section className="pb_50">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>My Team Downline </span>
            </h2>
            <hr></hr>
          </div>
          <div className="sm_container">
            <div className="table_inner">
              <div className="table-responsive gridtable">
                <DataTable
                  columns={requiredmembercolumn}
                  data={
                    requiredMember
                      ? requiredMember.length > 0
                        ? requiredMember
                        : []
                      : []
                  }
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
