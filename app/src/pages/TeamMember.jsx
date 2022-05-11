import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { FiExternalLink } from "react-icons/fi";


export default function TeamMember() {
    const [team, setTeam] = useState([]);
    const [team2, setTeam2] = useState([]);
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
    const levels = [
        "Level 1",
        "Level 2",
        "Level 3",
        "Level 4",
        "Level 5",
        "Level 6",
        "Level 7",
        "Level 8",
        "Level 9",
        "Level 10",
        "Level 11",
        "Level 12",
        "Level 13",
        "Level 14",
        "Level 15",
        "Level 16",
        "Level 17",
        "Level 18",
        "Level 19",
        "Level 20",
        "Level 21",
        "Level 22",
        "Level 23",
        "Level 24",
        "Level 25",
        "Level 26",
        "Level 27",
        "Level 28",
        "Level 29",
        "Level 30",
        "Level 31",
        "Level 32",
        "Level 33",
        "Level 34",
        "Level 35",
        "Level 36",
        "Level 37",
        "Level 38",
        "Level 39",
        "Level 40",
      ];
      const teamcolumn = [
        {
          name: "Stair",
          selector: (row) => row.level,
          sortable: true,
          style: {
            backgroundColor: "transparent",
            color: "rgba(63, 195, 128, 0.9)",
          },
        },
    
        {
          name: "User Id",
          selector: (row) => row.user_id,
          sortable: true,
          style: {
            backgroundColor: "transparent",
            color: "rgba(63, 195, 128, 0.9)",
          },
        },
        {
          name: "Wallet Address",
          selector: (row) => (
            <a
              href={`https://explorer.bdltscan.io/address/${row.user}/transactions`}
              target="_blank"
              style={{ color: "white", textDecoration: "none" }}
            >
              {row.user
                ? row.user.substr(0, 7) + "......." + row.user.substr(35, 43)
                : "--"}
              <FiExternalLink size={18} className="mx-1 pb-1" color="white" />
            </a>
          ),
          sortable: true,
          style: {
            backgroundColor: "transparent",
            color: "rgba(63, 195, 128, 0.9)",
          },
        },
    
        {
          name: "Timestamp",
          selector: (row) => row.registration_date,
          sortable: true,
          style: {
            backgroundColor: "transparent",
            color: "black",
          },
        },
      ];
    const [selectedlevelTeam, setSelectedLevelTeam] = useState("");


    useEffect(() => {
        if (team.length > 0 && selectedlevelTeam) {
          const arr = team.filter((item) => item.level == selectedlevelTeam);
          setTeam2(arr);
        }
      }, [selectedlevelTeam]);

  return (
    <>
    <section className="pb_50">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>Team Members</span>
            </h2>
            <hr></hr>
          </div>
          <div className="sm_container">
            <select
              style={{
                color: "white",
                backgroundColor: "black",
                border: "none",
                width: "100px",
              }}
              value={selectedlevelTeam ? selectedlevelTeam : "Level 1"}
              onChange={(e) => {
                setSelectedLevelTeam(e.target.value);
              }}
            >
              {levels.map((data, index) => {
                return (
                  <option value={data} key={index}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="table_inner">
              <div className="table-responsive gridtable">
                <DataTable
                  columns={teamcolumn}
                  data={team2 ? (team2.length > 0 ? team2 : []) : []}
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
