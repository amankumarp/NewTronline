import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { NotificationManager } from "react-notifications";
import { BiSupport } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  BsTelegram,
  BsWhatsapp,
  BsFacebook,
  BsInstagram,
} from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import "../index.css";
import axios from "axios";
import "react-dropdown/style.css";
import { AiFillStar } from "react-icons/all";
import MyTimer from "../Component/Timer";
// import FormModal from "../Component/FormModal";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import TeamMember from "./TeamMember";

import { CONTRACT_ADDRESS } from "../HelperFunction/config";
import {
  getIncome,
  getTeam,
  getUserInfo,
  getWithdraw,
  onConnect,
  royaltyWithdraw,
  userIdByWallet,
  globalStat,
  getRequiredMembers,
  getLevelSponsor,
  getRoyalityHistory,
  getLdpInfo,
} from "../HelperFunction/script";
import { Link } from "react-router-dom";
import {
  SET_ADDRESS,
  SET_CONTRACT_ADDRESS,
  SET_JOIN_PACKAGE,
  SET_LOGGEDIN,
  TOTAL_BALANCE,
} from "../redux/constant";

export default function Home() {
  const { isUnstake } = useSelector((state) => state.appStore);
  const [wallet_address, setWalletAddress] = useState("");
  const [fwaddress, setfwaddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [team, setTeam] = useState([]);
  const [requiredMember, getRequiredMember] = useState([]);
  const [income, setIncome] = useState([]);
  const [withdrawalAmt, setWithdrawAmt] = useState(0);
  const [withdraw, setWithdraw] = useState([]);
  const [contract, setContract] = useState({});
  const [joinAmount, setjoinAmount] = useState(0);
  const [ref_id, setref_id] = useState(0);
  const [levelIncome, setLevelIncome] = useState(0);
  const [directIncome, setDirectIncome] = useState(0);
  const [joiningPackage, setJoiningPackage] = useState(0);
  const [refferer, setRefferer] = useState("0x00");
  const [royaltyWallet, setRoyaltyWallet] = useState(0);
  const [roi, setRoi] = useState(0);
  const [direct_sponcer, setDirectSponcer] = useState(0);
  const [reflect, setReflect] = useState(true);
  const [ref_id1, setref_id1] = useState();
  const [spin, setspin] = useState("");
  const [spin2, setspin2] = useState("");
  const [spin3, setspin3] = useState("");
  const [vsi, setvsi] = useState(0);
  const [show, setShow] = useState(false);
  const [total_member, setTotalmember] = useState(0);
  const [total_investment, setTotalInv] = useState(0);
  const [total_withdraw, setTotalWithdraw] = useState(0);
  const [price, setPrice] = useState(0);
  const [avlIncome, setAvlIncome] = useState(0);
  const [disable, setdisable] = useState(false);
  const [viewmode, setViewMode] = useState(1);
  const [viewmodeflag, setViewModeFlag] = useState(0);
  const [smartBalance, setSmartBalance] = useState(0);
  const [ltRateINR, setltRateINR] = useState(0);
  const [ltRateUSDT, setLTRateUSDT] = useState(0);
  const [bdtprice, setbdtPrice] = useState(0);
  const [selectedlevel, setSelectedLevel] = useState("");
  const [income2, setIncome2] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [selectedlevelTeam, setSelectedLevelTeam] = useState("");
  const [stackingReward, setStackingReward] = useState(0);
  const [directSponsorRoi, setDirectSponsorRoi] = useState(0);
  const [selfNodeRoi, setSelfNodeRoi] = useState(0);
  const [nodeLevelRoi, setNodeLevelRoi] = useState(0);
  const [levelNode, setLevelNode] = useState(0);
  const [nodeBy, setNodeby] = useState(0);
  const [selectedIncome, setSelectedIncome] = useState("");
  const [selectedNode, setSelectedNode] = useState([]);
  const [nodetabType, setNodeTabType] = useState([]);
  const [levelNode2, setLevelNode2] = useState([]);
  const [oldRoi, setOldRoi] = useState(0);
  const [partnersCount, setPartnersCount] = useState("");
  const [rewardStatus, setRewardStatus] = useState("");
  const [royalityHistory, setRoyalityHistory] = useState([]);
  const [royalityIncome, setRoyalityIncome] = useState([]);
  const [ldp, setLdp] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [address, setAddress] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [mobileErr, setMobileErr] = useState(false);
  const [aadhaarErr, setAadhaarErr] = useState(false);
  const [addressErr, setAddressErr] = useState(false);
  const [id, setID] = useState("");
  const [nodeAmount, setNodeAmount] = useState("");
  const [joinAmount1, setJoinAmoun1] = useState("");

  const dispatch = useDispatch();
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
  const incometype = [
    "Sponsor income",
    "Stair Income",
    "Star Income",
    "Node Stair Income",
    "Sponsor ROI income",
  ];
  const nodeType = ["Sponsor Node", "Stair Node"];
  const { Waddress, isLoggedIn, wallet_balance, joinPackage, contractAddress } =
    useSelector((state) => state.appStore);
  /* const data2 = {
    amount: "16128130000000000000000",
    block_timestamp: "1649857620",
    id: 4,
    transaction_id:
      "0xe6692d93491b6aa41df45687e5f16bde38ee3996c39856fd1f63cdfbba03916a",
  }; */

  // setRoylityHistory(data2)

  useEffect(() => {
    if (income.length > 0 && selectedlevel) {
      const l = selectedlevel.split(" ");
      const arr = income.filter((item) => item.level == l[1]);
      setIncome2(arr);
    }
  }, [selectedlevel]);

  useEffect(() => {
    if (team.length > 0 && selectedlevelTeam) {
      const arr = team.filter((item) => item.level == selectedlevelTeam);
      setTeam2(arr);
    }
  }, [selectedlevelTeam]);

  useEffect(() => {
    const itarr = [
      "reward_income",
      "level_income",
      "direct_sponcer",
      "node_stair_income",
      "sponcer_roi_income",
    ];
    if (income.length > 0 && selectedIncome) {
      // console.log(selectedIncome, "selected income------------------")
      let it1 = "";
      if (selectedIncome === "Sponsor income") {
        it1 = itarr[2];
        const arr = income.filter((item) => item._for === it1);
        // console.log(it1, arr);
        setIncome2(arr);
      } else if (selectedIncome === "Stair Income") {
        it1 = itarr[1];
        const arr = income.filter((item) => item._for === it1);
        // console.log(it1, arr);
        setIncome2(arr);
      } else if (selectedIncome === "Star Income") {
        it1 = itarr[0];
        const arr = income.filter((item) => item._for === it1);
        // console.log(it1, arr);
        setIncome2(arr);
      } else if (selectedIncome === "Node Stair Income") {
        it1 = itarr[3];
        const arr = income.filter((item) => item._for === it1);
        // console.log(it1, arr);
        setIncome2(arr);
      } else if (selectedIncome === "Sponsor ROI income") {
        it1 = itarr[4];
        const arr = income.filter((item) => item._for === it1);
        // console.log(it1, arr);
        setIncome2(arr);
        console.log("====================================");
        console.log(arr, "roi income");
        console.log("====================================");
      } else {
        setIncome2(income);
      }
    }
  }, [selectedIncome]);

  useEffect(() => {
    const nrr = ["level_roi", "sponcer_roi"];
    if (levelNode.length > 0 && selectedNode) {
      let it2 = "";
      if (selectedNode === "Sponsor Node") {
        it2 = nrr[1];
      } else if (selectedNode === "Stair Node") {
        it2 = nrr[0];
      }
      console.log(it2, levelNode);
      const arr = levelNode.filter((item) => item._type === it2);
      setLevelNode2(arr);
    }
  }, [selectedNode]);

  useEffect(() => {
    if (income.length > 0) {
      // const arr = income.filter((item) => item.level == 1);
      setIncome2(income);
    }
  }, [income]);

  useEffect(() => {
    if (team.length > 0) {
      const arr = team.filter((item) => item.level == "Level 1");
      setTeam2(arr);
    }
  }, [team]);

  useEffect(() => {
    if (levelNode.length > 0) {
      const arr = levelNode.filter((item) => item._type == "level_roi");
      setLevelNode2(arr);
    }
  }, [levelNode]);

  useEffect(() => {
    const value = ltRateINR / ltRateUSDT;
    // console.log(value, "Value")
    setbdtPrice(value);
  }, [ltRateINR, ltRateUSDT]);

  const ref_addr = window.location.href;
  const reflink = useRef();

  function round(number) {
    return Math.round(number * 1000) / 1000;
  }

  const css = {
    color: "white",
  };
  useEffect(() => {
    const url_address = window?.frames?.location?.href;
    // console.log("url address: ", url_address.split("?"), window);
    const url = url_address ? url_address.split("?")[1] : "";
    console.log("embue1::", url);
    if (url && url.length > 21) {
      setWalletAddress(url);
      setfwaddress(url);
    }
    console.log("Referrer Id", ref_addr);
    let nnnnn = ref_addr.split("?ref_id=");
    setref_id1(nnnnn[1]);
    globalStat()
      .then((d) => {
        console.log("global Data", d);
        setTotalmember(d.result.totalUser);
        setTotalInv(d.result.totalPayout);
        setPrice(d?.totalNodeBuy ?? 0);
        setSmartBalance(d?.contract_balance);
        setTotalWithdraw(d?.withdraw ?? 0);
      })
      .catch((e) => console.log(e));
  }, []);

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

  const incomecolumn = [
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
      selector: (row) => row.userId,
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "rgba(63, 195, 128, 0.9)",
      },
    },
    {
      name: "Sender",
      selector: (row) => (
        <a
          href={`https://explorer.bdltscan.io/address/${row.sender}/transactions`}
          target="_blank"
          style={{ color: "white", textDecoration: "none" }}
        >
          {row.sender
            ? row.sender.substr(0, 7) + "......." + row.sender.substr(35, 43)
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
      name: "Amount",
      selector: (row) => (Number(row.amount) / 1e18).toFixed(2) + " BDLT",
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "black",
      },
    },
    {
      name: "Income Type",
      selector: (row) =>
        row._for == "direct_sponcer"
          ? "Sponsor Income"
          : row._for == "reward_income"
          ? "Star Income"
          : row._for == "node_stair_income"
          ? "Node Stair Reward"
          : row._for == "sponcer_roi_income"
          ? "Sponcer ROI Income"
          : "Stair Income",
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

  const withdrawcolumn = [
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

  const noderewardcolumn = [
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
      name: "User",
      selector: (row) => row._sender,
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "rgba(63, 195, 128, 0.9)",
      },
    },
    {
      name: "Node Type",
      selector: (row) =>
        row._type == "level_roi" ? "Stair Node " : "Sponsor Node",
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "black",
      },
    },
    {
      name: "Monthly Roi",
      selector: (row) => (row._type == "level_roi" ? "3% " : "2%"),
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

  useEffect(() => {
    // console.log("addressreflected::", wallet_address, "ghhg", fwaddress);
    if (fwaddress) {
      setWalletAddress(fwaddress);
    }
    if (wallet_address) {
      getUserInfo(wallet_address)
        .then((d) => {
          console.log(d, "::DDDD");
          if (d.status == 1 && d.data.id != 0) {
            setref_id(d.data.id);
            setDirectIncome(
              d.data.sponcerIncome
                ? round(Number(d.data.sponcerIncome) / 1e18)
                : 0
            );
            // setLdp(d.user[0].qualified_ldp);
            // setLdp(1);
            setOldRoi(
              d.user[0].old_roi ? round(Number(d.user[0].old_roi) / 1e18) : 0
            );
            setLevelIncome(
              d.data.levelIncome ? round(Number(d.data.levelIncome) / 1e18) : 0
            );
            setRoi(
              d.roi
                ? Math.round((Number(d.roi) / 1e18) * 1000000000) / 1000000000
                : 0
            );
            setStackingReward(
              d.data.rewardIncome
                ? Math.round(
                    (Number(d.data.rewardIncome) / 1e18) * 1000000000
                  ) / 1000000000
                : 0
            );
            setDirectSponsorRoi(
              d.direct_roi
                ? Math.round((Number(d.direct_roi) / 1e18) * 1000000000) /
                    1000000000
                : 0
            );
            setSelfNodeRoi(
              d.self_roi
                ? Math.round((Number(d.self_roi) / 1e18) * 1000000000) /
                    1000000000
                : 0
            );
            setNodeby(d.data.isNodebuy);
            setPartnersCount(d.data.partnersCount);
            setRewardStatus(d.data.reward_status);
            setNodeLevelRoi(
              d.data.node[2]
                ? Math.round((Number(d.data.node[2]) / 1e18) * 1000000000) /
                    1000000000
                : 0
            );
            setRefferer(d.data.referrer);
            setID(d.user[0].referrerId);
            console.log("Royalty Wallet :: ", d.user[0].royalty_wallet);
            setRoyaltyWallet(d.user[0].royalty_wallet);
            setjoinAmount(d.data.joiningAmt);

            setDirectSponcer(d.data.partnersCount);
            setWithdrawAmt(
              d.data.withdrawn
                ? round(Number(d.data.withdrawn) / 1e18) + d.withdraw
                : 0
            );
            console.log(
              Math.round((Number(d.roi) / 1e18) * 1000000000) / 1000000000 +
                Number(d.result[0].royalty_wallet)
            );
          } else {
            console.log("Error:::", d.err);
          }
        })
        .catch((e) => {
          console.log(e);
        });
      getRequiredMembers(wallet_address)
        .then((ss) => {
          if (ss) {
            getRequiredMember(ss);
          }
        })
        .catch((e) => {
          console.log(e);
        });
      getTeam(wallet_address)
        .then((ss) => {
          if (ss) {
            setTeam(ss);
          }
        })
        .catch((e) => {
          console.log(e);
        });
      getIncome(wallet_address)
        .then((ss) => {
          if (ss) {
            setIncome(ss.result);
            setRoyalityIncome(ss.income);
            /*  console.log(
              ss.income,
              "roylityIncome-------------------------------"
            ); */
          }
        })
        .catch((e) => {
          console.log(e);
        });
      getLevelSponsor(wallet_address)
        .then((ss) => {
          if (ss) {
            setLevelNode(ss.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
      getWithdraw(wallet_address)
        .then((ss) => {
          if (ss) {
            console.log("DATA :: ", ss);
            setWithdraw(ss.result);
          }
        })
        .catch((e) => {
          console.log(e);
        });
      getRoyalityHistory(wallet_address)
        .then((ss) => {
          if (ss) {
            // console.log("DATA :: ", ss);
            setRoyalityHistory(ss.royality);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("reflection else:");
    }
    // nodeJoiningAmount()
  }, [wallet_address, reflect, fwaddress]);

  function toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    return String(x);
  }

  console.log("====================================");
  console.log(id, "REFFEREL IDDD");
  console.log("====================================");

  async function onRegistration() {
    setspin("spinner-border spinner-border-sm");
    // balance >= joinAmount
    if (balance >= joinAmount) {
      console.log("refferal Id::", ref_id1, joinAmount);
      contract.methods
        .isUserExists(wallet_address)
        .call()
        .then((is_exist) => {
          if (!is_exist) {
            contract.methods
              .idToAddress(ref_id1)
              .call()
              .then((d) => {
                console.log("Refferal Address ::", d);
                if (d !== "0x0000000000000000000000000000000000000000") {
                  contract.methods
                    .registrationExt(wallet_address, d)
                    .send({
                      from: wallet_address,
                      value: joiningPackage,
                      // value: 0,
                    })
                    .then((d) => {
                      setspin("");
                      setdisable(false);
                      setReflect(!reflect);
                    })
                    .catch((e) => {
                      console.log("Error :: ", e);
                      setspin("");
                      setdisable(false);
                      setReflect(!reflect);
                    });
                } else {
                  NotificationManager.error(
                    "Refferal Not Exist",
                    "Invalid Referrel"
                  );
                  setspin("");
                  setdisable(false);
                  setReflect(!reflect);
                }
              })
              .catch((e) => {
                console.log("Error:: ", e);
                setspin("");
                setdisable(false);
              });
          } else {
            NotificationManager.error("user already Join", "Already Exist");
            setspin("");
            setdisable(false);
          }
        })
        .catch((e) => {
          console.log(e);
          setspin("");
          setdisable(false);
        });
    } else {
      NotificationManager.error("Low Balance ", "Error");
      setspin("");
      setdisable(false);
    }
  }

  async function onRoyaltyWithdraw() {
    if (viewmodeflag) {
      NotificationManager.info("Withdraw is not available in view mode!");
    } else {
      setspin3("spinner-border spinner-border-sm");
      royaltyWithdraw(wallet_address)
        .then((d) => {
          if (d.status) {
            NotificationManager.info(d.result);
          }
          console.log("Data:", d);
          setspin3("");
          setReflect(!reflect);
        })
        .catch((e) => {
          console.log("Error:: ", e);
          setspin3("");
          setReflect(!reflect);
        });
    }
  }

  async function openViewMode(viewmode) {
    const close = document.getElementById("closeModal");
    setspin3("spinner-border spinner-border-sm");
    userIdByWallet(viewmode)
      .then((d) => {
        if (d.status) {
          close.click();
          setWalletAddress(d.result[0].user);
          setViewModeFlag(1);
          setspin3("");
          setReflect(!reflect);
        } else {
          NotificationManager.info("No ID found!");
        }
      })
      .catch((e) => {
        console.log("Error:: ", e);
        setspin3("");
        setReflect(!reflect);
      });
  }

  async function exitViewMode() {
    window.location.reload(false);
  }

  async function onWithdraw() {
    if (viewmodeflag) {
      NotificationManager.info("Withdraw is not available in view mode!");
    } else {
      setspin3("spinner-border spinner-border-sm");
      contract?.methods
        ?.withdraw()
        .send({ from: wallet_address, value: 0 })
        .then((d) => {
          console.log("Data:", d);
          setspin3("");
          setReflect(!reflect);
        })
        .catch((e) => {
          console.log("Error:: ", e);
          setspin3("");
          setReflect(!reflect);
        });
    }
  }
  async function onNodeRoiWithdraw() {
    if (viewmodeflag) {
      NotificationManager.info("Withdraw is not available in view mode!");
    } else {
      setspin3("spinner-border spinner-border-sm");
      contract?.methods
        ?.getNodeRewardWithdraw()
        .send({ from: wallet_address, value: 0 })
        .then((d) => {
          console.log("Data:", d);
          setspin3("");
          setReflect(!reflect);
        })
        .catch((e) => {
          console.log("Error:: ", e);
          setspin3("");
          setReflect(!reflect);
        });
    }
  }

  async function onUpgradeNode() {
    if (viewmodeflag) {
      NotificationManager.info("Withdraw is not available in view mode!");
    } else {
      if (balance >= 50000) {
        setspin3("spinner-border spinner-border-sm");
        contract?.methods
          ?.stakeNode(wallet_address)
          .send({ from: wallet_address, value: "50000000000000000000000" })
          .then((d) => {
            console.log("Data:", d);
            setspin3("");
            setReflect(!reflect);
          })
          .catch((e) => {
            console.log("Error:: ", e);
            setspin3("");
            setReflect(!reflect);
          });
      } else {
        NotificationManager.error("Low Balance");
      }
    }
  }

  async function onUnstake() {
    if (viewmodeflag) {
      NotificationManager.info("Withdraw is not available in view mode!");
    } else {
      setspin3("spinner-border spinner-border-sm");
      contract?.methods
        ?.unstakeNode(wallet_address)
        .send({ from: wallet_address, value: 0 })
        .then((d) => {
          console.log("Data:", d);
          setspin3("");
          setReflect(!reflect);
        })
        .catch((e) => {
          console.log("Error:: ", e);
          setspin3("");
          setReflect(!reflect);
        });
    }
  }

  async function nodeJoiningAmount() {
    if (viewmodeflag) {
      NotificationManager.info("Withdraw is not available in view mode!");
    } else {
      setspin3("spinner-border spinner-border-sm");
      contract?.methods
        ?.nodejoiningamt()
        .call()
        .then((d) => {
          // console.log("Data: nodeJoin Amount", d);
          // setnodeJoinAmount(d)
          setspin3("");
          setReflect(!reflect);
        })
        .catch((e) => {
          console.log("Error:: ", e);
          setspin3("");
          setReflect(!reflect);
        });
    }
  }

  /* console.log(partnersCount, "test partner count value");
  console.log(rewardStatus, "test reward status value");

  const time = new Date(1646975640 * 1000);
  time.setSeconds(time.getSeconds() + 3.156e7);*/

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [showModal1, setShowModal1] = useState(false);

  const handleClose1 = () => setShowModal1(false);
  const handleShow1 = () => setShowModal1(true);

  //  const [validated, setValidated] = useState(false);

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };

  const handelFormSubmit = (waddr, name, mobile, aadhaar, address) => {
    if (
      name.trim().length > 0 &&
      mobile.trim().length > 0 &&
      aadhaar.trim().length > 0 &&
      address.trim().length > 0
    ) {
      getLdpInfo(waddr, name, mobile, aadhaar, address).then((res) => {
        if (res.status) {
          NotificationManager.success(res.result);
          setShowModal(false);
          handleShow1();
          setTimeout(() => {
            handleClose1();
          }, 20000);
        } else {
          NotificationManager.error("Something Went Wrong");
        }
      });
    } else {
      NotificationManager.error("Please fill all the fields");
    }
  };

  /*  handleInputChange = name => event => {
    this.setState({
      [name]: event.target.value.replace(/^[0-9]{10}$/)
    })
  } */
  useEffect(() => {
    setBalance(wallet_balance);
    setContract(contractAddress);
    setWalletAddress(Waddress);
    setJoiningPackage(joinPackage);
  }, []);

  return (
    <>
      {/* <div className="container">
        <div className="ticker">
          <div className="news">
            <marquee className="news-content">
              *****Bumper Tour Offer ***** *Travel for Bangkok/ Thailand*
              Qualify Criteria : New added 7th level Achiever or Achive next
              level in this time period. Time Period : 12 April-10 May Max
              Members : First 100 Members Time Duration : 3 Night and 4 Days
            </marquee>
          </div>
        </div>
      </div> */}
      <div className="container text-center mt-4">
        <div className="row">
          <div
            className="col-md-12 col-sm-12 col-lg-4"
            style={{ fontSize: "30px" }}
          >
            <img
              alt="img"
              src="./img/logo-black.png"
              className="img img-fluid"
              style={{ width: "150px" }}
            />
          </div>
          <div className="col-md-12 col-sm-12 col-lg-8">
            <div className="row">
              <div
                className="col-md-12 col-sm-12 col-lg-4"
                style={{ fontSize: "30px" }}
              ></div>
              <div className="col-md-12 col-sm-12 col-lg-8">
                <div className="row">
                  {/*   <div
                className="col-md-4 col-lg-4 col-sm-12 asm d-flex justify-content-center"
                style={{ flexDirection: "column" }}
              >
                <a
                  className="grad_btn btn-block text-light my-2"
                  style={{ fontSize: "0.875rem" }}
                  onClick={() => window.addNetwork("web3")}
                >
                  <img
                    className="mr-1"
                    width={24}
                    src="https://bscscan.com/images/svg/brands/metamask.svg"
                    alt="Metamask"
                  />{" "}
                  Add to Metamask
                </a>
              </div> */}
                  {/* <div
                className="col-md-6 col-lg-4 col-sm-12 d-flex justify-content-center"
                style={{ flexDirection: "column" }}
              >
                <a
                  href="/bdlt_pdfupdate.pdf"
                  className="grad_btn btn-block text-light my-2 "
                  style={{ padding: "10px 55px" }}
                  target="_blank"
                >
                 BDLT Swap
                </a>
              </div>

              <div
                className="col-md-6 col-lg-4 col-sm-12 d-flex justify-content-center"
                style={{ flexDirection: "column" }}
              >
                <a
                  href="https://trade.buyucoin.com/trade/INR-BDLT"
                  target="_blank"
                  className="grad_btn btn-block text-light my-2 "
                  style={{ padding: "10px 55px" }}
                >
                  Explorer
                </a>
              </div> */}
                  <nav class="navbar navbar-expand-lg navbar-dark">
                    <button
                      class="navbar-toggler"
                      type="button"
                      onClick={() => {
                        const nc = document.getElementById(
                          "navbarSupportedContent"
                        );
                        nc.classList.toggle("show");
                      }}
                    >
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div
                      class="collapse navbar-collapse"
                      id="navbarSupportedContent"
                    >
                      <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              className=""
                              width={24}
                              src="https://bscscan.com/images/svg/brands/metamask.svg"
                              alt="Metamask"
                            />
                            <a
                              class="nav-link"
                              style={{ color: "white" }}
                              onClick={() => window.addNetwork("web3")}
                            >
                              Add to Metamask
                              {/* <span class="sr-only">(current)</span> */}
                            </a>
                          </div>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            href="/bdlt_pdfupdate.pdf"
                            target="_blank"
                            style={{ color: "white" }}
                          >
                            Download Plan
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            href="https://trade.buyucoin.com/trade/INR-BDLT"
                            target="_blank"
                            style={{ color: "white" }}
                          >
                            Buy BDLT
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            href="https://bdltswap.com"
                            target="_blank"
                            style={{ color: "white" }}
                          >
                            BDLT Swap
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            href="https://explorer.bdltscan.io"
                            target="_blank"
                            style={{ color: "white" }}
                          >
                            Explorer
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                  {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <a class="navbar-brand" href="#">
                      Navbar
                    </a>
                    <button
                      class="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span class="navbar-toggler-icon"></span>
                    </button>

                    <div
                      class="collapse navbar-collapse"
                      id="navbarSupportedContent"
                    >
                      <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                          <a class="nav-link" href="#">
                            Home <span class="sr-only">(current)</span>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#">
                            Link
                          </a>
                        </li>
                        <li class="nav-item dropdown">
                          <a
                            class="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Dropdown
                          </a>
                          <div
                            class="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                          >
                            <a class="dropdown-item" href="#">
                              Action
                            </a>
                            <a class="dropdown-item" href="#">
                              Another action
                            </a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">
                              Something else here
                            </a>
                          </div>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link disabled" href="#">
                            Disabled
                          </a>
                        </li>
                      </ul>
                      <form class="form-inline my-2 my-lg-0">
                        <input
                          class="form-control mr-sm-2"
                          type="search"
                          placeholder="Search"
                          aria-label="Search"
                        />
                        <button
                          class="btn btn-outline-success my-2 my-sm-0"
                          type="submit"
                        >
                          Search
                        </button>
                      </form>
                    </div>
                  </nav> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div
            className="col-md-12 col-sm-12 col-lg-4"
            style={{ fontSize: "30px" }}
          ></div>
          <div className="col-md-12 col-sm-12 col-lg-8">
            <div className="row">
              {/*   <div
                className="col-md-4 col-lg-4 col-sm-12 asm d-flex justify-content-center"
                style={{ flexDirection: "column" }}
              >
                <a
                  className="grad_btn btn-block text-light my-2"
                  style={{ fontSize: "0.875rem" }}
                  onClick={() => window.addNetwork("web3")}
                >
                  <img
                    className="mr-1"
                    width={24}
                    src="https://bscscan.com/images/svg/brands/metamask.svg"
                    alt="Metamask"
                  />{" "}
                  Add to Metamask
                </a>
              </div> */}
              {/* <div
                className="col-md-6 col-lg-4 col-sm-12 d-flex justify-content-center"
                style={{ flexDirection: "column" }}
              >
                <a
                  href="/bdlt_pdfupdate.pdf"
                  className="grad_btn btn-block text-light my-2 "
                  style={{ padding: "10px 55px" }}
                  target="_blank"
                >
                 BDLT Swap
                </a>
              </div>

              <div
                className="col-md-6 col-lg-4 col-sm-12 d-flex justify-content-center"
                style={{ flexDirection: "column" }}
              >
                <a
                  href="https://trade.buyucoin.com/trade/INR-BDLT"
                  target="_blank"
                  className="grad_btn btn-block text-light my-2 "
                  style={{ padding: "10px 55px" }}
                >
                  Explorer
                </a>
              </div> */}
              {/* <div class="navbar navbar-expand-lg" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item active">
                   <img
                    className="mr-1"
                    width={24}
                    src="https://bscscan.com/images/svg/brands/metamask.svg"
                    alt="Metamask"
                  /> 
                    <a class="nav-link" href="#" style={{color: "white"}}
                    onClick={() => window.addNetwork("web3")}
                    >
                      Add to Metamask <span class="sr-only">(current)</span>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/bdlt_pdfupdate.pdf" target="_blank" style={{color: "white"}}>
                      Download Plan
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="https://trade.buyucoin.com/trade/INR-BDLT" target="_blank" style={{color: "white"}}>
                      Buy BDLT
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="https://bdltswap.com" target="_blank" style={{color: "white"}}>
                      BDLT Swap
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="https://explorer.bdltscan.io" target="_blank" style={{color: "white"}}>
                    Explorer
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Modal show={showModal1} onHide={handleClose1} style={{ color: "black" }}>
        <Modal.Header closeButton>
          {/* <Modal.Title style={{ color: "black" }}>
            Info
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <h5>Admin Team will contact and confirm you for LDP.</h5>
        </Modal.Body>
        {/*  <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer> */}
      </Modal>

      <section className="banner_section pt_50 pb_50 mt-5">
        <div className="container">
          <div className="banner_text text-center middle_text">
            <h1 className="tirw">BDLT COMMUNITY DEVELOPMENT PROGRAM</h1>
            {/* <h5>BDLT COMMUNITY DEVELOPMENT PROGRAM</h5> */}
            <p>
              {" "}
              World First Decentralized Program on BDLT Blockchain. All Funds
              are store in Smart Contract and members can withdraw their reward
              directly from Smart contract. Get 200% Return On Stake .
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row cus_row">
            <div className="col-md-4 col-sm-6 col-6">
              <div className="Personal_Details_inner">
                <h4> Smart Contract Address </h4>
                <h5>
                  <a
                    href={`https://explorer.bdltscan.io/address/${CONTRACT_ADDRESS}/contracts`}
                    target={"_blank"}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {CONTRACT_ADDRESS.substr(0, 5)}....
                    {CONTRACT_ADDRESS.substr(-8)}
                    <FiExternalLink
                      size={18}
                      className="mx-1 pb-1"
                      color="white"
                    />
                  </a>
                </h5>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 col-6">
              <div className="Personal_Details_inner">
                <h4>Contract Balance </h4>
                <h5>{round(smartBalance)} BDLT</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-6">
              <div className="Personal_Details_inner">
                <h4>Total Node Member </h4>
                <h5>{price}</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-6">
              <div className="Personal_Details_inner">
                <h4>Total Community Member</h4>
                <h5>{total_member}+</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-6">
              <div className="Personal_Details_inner">
                <h4> Total Staking </h4>
                <h5>{round(total_investment)} BDLT</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 col-6">
              <div className="Personal_Details_inner">
                <h4> Total Withdrawal Distributed</h4>
                <h5>{round(total_withdraw)} BDLT</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      {ref_id == 0 ? (
        <section className="pt_50 pb_50">
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          ></div>

          <div className="container">
            <div className="all_heading text-center">
              <h2>
                <span>Join Us now</span>&nbsp;
              </h2>
              <div
                className="small_heading my-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <h6>
                  Wallet address -{" "}
                  <span style={{ fontSize: "15px" }}>
                    {wallet_address
                      ? wallet_address.substr(0, 10) +
                        "......." +
                        wallet_address.substr(25)
                      : "Press Refresh for Wallet Address if Metamask is connected"}
                  </span>{" "}
                </h6>
                {!wallet_address ? (
                  <button
                    className="grad_btn btn-block mx-4"
                    style={{ padding: "10px 15px" }}
                    onClick={() => {
                      onConnect()
                        .then((d) => {
                          console.log(d);
                          dispatch({ type: SET_ADDRESS, data: d?.userAddress });
                          dispatch({ type: SET_LOGGEDIN, data: true });
                          dispatch({ type: TOTAL_BALANCE, data: d?.balance });
                          dispatch({
                            type: SET_JOIN_PACKAGE,
                            data: d?.joiningPackage,
                          });
                          dispatch({
                            type: SET_CONTRACT_ADDRESS,
                            data: d?.contract,
                          });
                          setBalance(round(d?.balance));
                          setContract(d?.contract);
                          setWalletAddress(d?.userAddress);
                          // setWalletAddress("0x4d5181BE0CF14C8F6E125D833dE4D9AcAA4aBe16");
                          setJoiningPackage(d?.joiningPackage);
                        })
                        .catch((e) => console.log(e));
                    }}
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div
                  className="text-light"
                  style={{ margin: "10px 0px", fontSize: "15px" }}
                >
                  Wallet Balance: {" " + balance + " "} BDLT
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Joining Package{" "}
                  {": " + parseInt(joiningPackage / 1e18)} BDLT
                </div>
                <div className="col-md-4 col-lg-4 col-sm-4">
                  <div className="form-group">
                    {ref_id != 0 ? null : (
                      <input
                        className="cus_input"
                        type="text"
                        name="join_amount"
                        placeholder="Enter Joining Package in multiple of 1250"
                        onChange={(e) => {
                          setJoinAmoun1(
                            e.target.value
                              .replace(/[^0-9.]/g, "")
                              .replace(/(\..*?)\..*/g, "$1")
                          );
                        }}
                        value={joinAmount1}
                      />
                    )}
                  </div>
                </div>
                <div className="col-md-4 col-lg-4 col-sm-4">
                  <div className="form-group">
                    {ref_id != 0 ? null : (
                      <input
                        className="cus_input"
                        type="text"
                        name="sponsor_address"
                        placeholder="Enter Refferer Id "
                        onChange={(e) => {
                          setref_id1(e.target.value);
                        }}
                        value={ref_id1 ? ref_id1 : ""}
                      />
                    )}
                  </div>
                </div>
                <div className="col-md-4 col-lg-4 col-sm-4">
                  <div className="form-group">
                    {ref_id != 0 ? null : (
                      <button
                        className="grad_btn btn-block"
                        style={{ padding: "10px 95px" }}
                        onClick={() => {
                          if (wallet_address) {
                            if (ref_id1) {
                              if (joinAmount1 % 1250 == 0) {
                                setdisable(true);
                                onRegistration(contract, wallet_address);
                              } else {
                                NotificationManager.info(
                                  "Please enter joining Package in multiple of 1250"
                                );
                              }
                            } else {
                              NotificationManager.info(
                                "Please provide Referral Id"
                              );
                            }
                          } else {
                            NotificationManager.info(
                              "Please Connect  Wallet!!"
                            );
                          }
                        }}
                        disabled={disable}
                      >
                        <span className={`${spin} mx-2`}></span>
                        Join Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="pt_50 pb_50">
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          ></div>

          <div className="container">
            <div className="all_heading text-center">
              {/* <h2>
                <span></span>&nbsp;
              </h2> */}
              <div
                className="small_heading my-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <h6>
                  Your Wallet address -{" "}
                  <span style={{ fontSize: "15px" }}>
                    {wallet_address
                      ? wallet_address.substr(0, 10) +
                        "......." +
                        wallet_address.substr(25)
                      : "Press Refresh for Wallet Address if Metamask is connected"}
                  </span>{" "}
                  {rewardStatus == 2 && partnersCount == 10 ? (
                    <sup>
                      <AiFillStar size={20} /> user
                    </sup>
                  ) : null}
                </h6>
                <h6>
                  Your Wallet Balance -{" "}
                  <span style={{ fontSize: "15px" }}>{balance ?? 0} BDLT</span>{" "}
                </h6>
                {viewmodeflag == 0 ? (
                  <div className="ldp">
                    <button
                      className="grad_btn btn-block mx-4"
                      style={{ padding: "10px 15px" }}
                      onClick={() => {
                        onConnect()
                          .then((d) => {
                            console.log(d);
                            dispatch({
                              type: SET_ADDRESS,
                              data: d?.userAddress,
                            });
                            dispatch({ type: SET_LOGGEDIN, data: true });
                            dispatch({ type: TOTAL_BALANCE, data: d?.balance });
                            dispatch({
                              type: SET_JOIN_PACKAGE,
                              data: d?.joiningPackage,
                            });
                            dispatch({
                              type: SET_CONTRACT_ADDRESS,
                              data: d?.contract,
                            });
                            setBalance(round(d?.balance));
                            setContract(d?.contract);
                            setWalletAddress(d?.userAddress);
                            setJoiningPackage(d?.joiningPackage);
                            console.log("====================================");
                            console.log(d?.joiningPackage, d?.userAddress);
                            console.log("====================================");
                          })
                          .catch((e) => console.log(e));
                      }}
                    >
                      Connect Wallet
                    </button>
                    {/* {ldp == 1 ? (
                      <button
                        className="grad_btn btn-block mx-2"
                        style={{ padding: "10px 15px" }}
                        onClick={handleShow}
                      >
                        Apply for LDP
                      </button>
                    ) : ldp == 2 ? (
                      <button
                        className="grad_btn btn-block mx-2"
                        style={{ padding: "10px 15px" }}
                      >
                        LDP Already Applied
                      </button>
                      // <button onClick={handleShow1}> Click</button>
                    ) : null} */}

                    <>
                      {/* <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "1vh" }}
                      ></div> */}
                      <Modal
                        show={showModal}
                        onHide={handleClose}
                        style={{ color: "black" }}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title style={{ color: "black" }}>
                            Enter Details
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form
                            onSubmit={(e) => {
                              e.preventDefault();

                              handelFormSubmit(
                                wallet_address,
                                name,
                                mobile,
                                aadhaar,
                                address
                              );
                            }}
                          >
                            <Form.Group className="mb-3">
                              <Form.Label>Name*</Form.Label>
                              <Form.Control
                                required
                                minLength={2}
                                maxLength={30}
                                name="name"
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value);
                                  setNameErr(false);
                                }}
                                onBlur={() => {
                                  if (name === "") {
                                    setNameErr(true);
                                  }
                                }}
                              />
                              {nameErr == true ? (
                                <p
                                  style={{
                                    color: "firebrick",
                                    marginTop: "5px",
                                  }}
                                >
                                  Name is Requierd*
                                </p>
                              ) : null}
                            </Form.Group>

                            <Form.Group
                              className="mb-3"
                              controlId="formBasicPassword"
                            >
                              <Form.Label>Contact Number*</Form.Label>
                              <Form.Control
                                required
                                name="contactNumber"
                                type="text"
                                maxLength={10}
                                minLength={10}
                                placeholder="Contact Number"
                                value={mobile}
                                onChange={(e) => {
                                  setMobile(
                                    e.target.value
                                      .replace(/[^0-9.]/g, "")
                                      .replace(/(\..*?)\..*/g, "$1")
                                  );
                                  setMobileErr(false);
                                }}
                                onBlur={() => {
                                  if (mobile === "") {
                                    setMobileErr(true);
                                  }
                                }}
                              />
                              {mobileErr == true ? (
                                <p
                                  style={{
                                    color: "firebrick",
                                    marginTop: "5px",
                                  }}
                                >
                                  Contact Number is Requierd*
                                </p>
                              ) : null}
                            </Form.Group>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicPassword"
                            >
                              <Form.Label>Aadhaar Number*</Form.Label>
                              <Form.Control
                                required
                                name="aadhaarNumber"
                                type="text"
                                maxLength={12}
                                minLength={12}
                                placeholder="Enter Aadhaar Number"
                                value={aadhaar}
                                onChange={(e) => {
                                  setAadhaar(
                                    e.target.value
                                      .replace(/[^0-9.]/g, "")
                                      .replace(/(\..*?)\..*/g, "$1")
                                  );
                                  setAadhaarErr(false);
                                }}
                                onBlur={() => {
                                  if (aadhaar === "") {
                                    setAadhaarErr(true);
                                  }
                                }}
                              />
                              {aadhaarErr == true ? (
                                <p
                                  style={{
                                    color: "firebrick",
                                    marginTop: "5px",
                                  }}
                                >
                                  Aadhaar Number is Requierd*
                                </p>
                              ) : null}
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Address*</Form.Label>
                              <Form.Control
                                required
                                name="address"
                                type="text"
                                minLength={4}
                                placeholder="Enter Address as on Aadhaar"
                                value={address}
                                onChange={(e) => {
                                  setAddress(e.target.value);
                                  setAddressErr(false);
                                }}
                                onBlur={() => {
                                  if (aadhaar === "") {
                                    setAddressErr(true);
                                  }
                                }}
                              />
                              {addressErr == true ? (
                                <p
                                  style={{
                                    color: "firebrick",
                                    marginTop: "5px",
                                  }}
                                >
                                  Address is Requierd*
                                </p>
                              ) : null}
                            </Form.Group>
                            <Button type="submit">Submit</Button>
                          </Form>
                        </Modal.Body>
                      </Modal>
                    </>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              {nodeBy == false ? (
                <>
                  <div className="row cus_row ">
                    <div className="col-md-6 col-sm-12 col-lg-6 mx-auto">
                      <div className="Personal_Details_inner Personal_bg">
                        <div className="row ">
                          <div className="col-4 col-md-6 mx-auto">
                            <h4>Node Buy Amount</h4>
                            <input
                              style={{ color: "white" }}
                              className="cus_input"
                              type="text"
                              value={nodeAmount}
                              name="sponsor_address"
                              placeholder="Enter Node amount in multiple of 10000 "
                              onChange={(e) => {
                                setNodeAmount(
                                  e.target.value
                                    .replace(/[^0-9.]/g, "")
                                    .replace(/(\..*?)\..*/g, "$1")
                                );
                              }}
                            />
                          </div>
                        </div>
                        <button
                          className="grad_btn my-3"
                          onClick={() => {
                            if (nodeAmount % 10000 == 0) {
                              onUpgradeNode();
                            } else {
                              NotificationManager.info(
                                "Enter amount in multiple of 10000!!"
                              );
                            }
                          }}
                        >
                          Stake Node
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="row cus_row ">
                    <div className="col-md-6 col-sm-12 col-lg-6 mx-auto">
                      <div className="Personal_Details_inner Personal_bg">
                        <div className="row ">
                          <div className="col-4 col-md-6 mx-auto">
                            <h4>Node Staked Amount</h4>
                            <h5>50000 BDLT</h5>
                          </div>
                        </div>
                        {/*  {isUnstake ? null :
                            <MyTimer expiryTimestamp={time} /> 
                          }
                          {isUnstake ?
                            < button className="grad_btn my-3" onClick={onUnstake}>
                              Unstake
                            </button>
                            : null} */}
                        <button className="grad_btn my-3" onClick={onUnstake}>
                          Unstake
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="pb_50">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>Dashboard</span>
            </h2>
          </div>
          <div className="row cus_row">
            <div className="col-md-4 col-sm-4 col-6">
              <div className="Personal_Details_inner Personal_bg">
                <h4>User Id</h4>
                <h5>{ref_id}</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-6">
              <div className="Personal_Details_inner">
                <h4> Direct Sponsor </h4>
                <h5>{direct_sponcer}</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-12">
              <div
                className="Personal_Details_inner"
                style={{ padding: "17px 10px" }}
              >
                <h4>Referred By </h4>
                <h5>
                  {refferer.substr(0, 5)}......{refferer.substr(-8)}
                </h5>
                <h6>
                  {" "}
                  <b>({id})</b>{" "}
                </h6>
              </div>
            </div>
          </div>
          {/* second row */}
          <div className="row cus_row">
            <div className="col-md-4 col-sm-4 col-6">
              <div className="Personal_Details_inner">
                <h4>Direct Sponsor Reward</h4>
                <h5>{directIncome.toFixed(2)} BDLT</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-6">
              <div className="Personal_Details_inner">
                <h4>Stair Reward</h4>
                <h5>{levelIncome.toFixed(2)} BDLT</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-lg-4">
              <div className="Personal_Details_inner">
                <h4>Star Reward</h4>
                <h5>
                  {stackingReward ? Number(stackingReward).toFixed(2) : 0} BDLT
                </h5>
              </div>
            </div>
          </div>
          {/* Third row */}
          <div className="row cus_row">
            <div className="col-md-4 col-sm-4 col-lg-4">
              <div className="Personal_Details_inner Personal_bg">
                <h4>Total Reward</h4>
                <h5>
                  {round(
                    (roi ? Number(roi) : 0) +
                      (royaltyWallet ? Number(royaltyWallet) : 0) +
                      Number(withdrawalAmt)
                  ).toFixed(2)}{" "}
                  BDLT
                </h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-lg-4">
              <div className="Personal_Details_inner">
                <h4>Total Withdrawal</h4>
                <h5>
                  {round(withdrawalAmt ? Number(withdrawalAmt).toFixed(2) : 0)}{" "}
                  BDLT
                </h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-12">
              <div className="Personal_Details_inner">
                <h4>Total Available Reward</h4>
                <h5>
                  {round(
                    (roi ? Number(roi).toFixed(2) : 0) +
                      (royaltyWallet ? Number(royaltyWallet).toFixed(2) : 0)
                  )}{" "}
                  BDLT
                </h5>
              </div>
            </div>
          </div>
          {/* fourth row*/}
          <div className="row cus_row">
            <div className="col-md-4 col-sm-4 col-lg-4">
              <div className="Personal_Details_inner Personal_bg">
                <h4>Node Stair Reward</h4>
                <h5>
                  {nodeLevelRoi ? Number(nodeLevelRoi).toFixed(2) : 0} BDLT
                </h5>
                <button
                  className="grad_btn my-2"
                  style={{ visibility: "hidden" }}
                >
                  Withdraw
                </button>
              </div>
            </div>

            <div className="col-md-4 col-sm-4 col-lg-4">
              <div className="Personal_Details_inner Personal_bg">
                <h4>ROS Reward</h4>
                <h5>{Number(roi).toFixed(2)} BDLT</h5>
                <button className="grad_btn my-2" onClick={onWithdraw}>
                  Withdraw ROS
                </button>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-lg-4">
              <div className="Personal_Details_inner Personal_bg">
                <h4>Royalty Reward</h4>
                <h5>{royaltyWallet ? royaltyWallet : 0} BDLT</h5>
                <button className="grad_btn my-2" onClick={onRoyaltyWithdraw}>
                  Withdraw Royalty
                </button>
              </div>
            </div>
            {/*  <div className="col-md-3 col-sm-3 col-lg-3">
              <div className="Personal_Details_inner Personal_bg">
                <h4>Self Node ROI</h4>
                <h5>{0} BDLT</h5>
                <button className="grad_btn my-2" onClick={onRoyaltyWithdraw}>
                  Withdraw Roi
                </button>
              </div>
            </div> */}
            {/* <div className="col-md-3 col-sm-3 col-lg-3">
              <div className="Personal_Details_inner Personal_bg">
                <h4>Direct Sponsor ROI</h4>
                <h5>{0} BDLT</h5>
                <button className="grad_btn my-2" onClick={onRoyaltyWithdraw}>
                  Withdraw Roi
                </button>
              </div>
            </div> */}
          </div>

          <div className="row cus_row">
            <div className="col-md-4 col-sm-4 col-lg-4">
              <div className="Personal_Details_inner Personal_bg">
                <div className="row ">
                  <h4>Remaining ROS (Old Contract)</h4>
                  <h5>{oldRoi ? Number(oldRoi).toString() : 0} BDLT</h5>
                </div>
                <button className="grad_btn my-3" disabled={true}>
                  Withdraw
                </button>
              </div>
            </div>
            <div className="col-md-8 col-sm-8 col-lg-8">
              <div className="Personal_Details_inner Personal_bg">
                <div className="row ">
                  <div className="col-6 col-md-6">
                    <h4>Self Node ROS</h4>
                    <h5>
                      {selfNodeRoi ? Number(selfNodeRoi).toString() : 0} BDLT
                    </h5>
                  </div>
                  <div className="col-6 col-md-6">
                    <h4>Sponsor Node ROS</h4>
                    <h5>
                      {directSponsorRoi
                        ? Number(directSponsorRoi).toFixed(2)
                        : 0}{" "}
                      BDLT
                    </h5>
                  </div>
                </div>
                <button className="grad_btn my-3" onClick={onNodeRoiWithdraw}>
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb_50">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>Team Members</span>
            </h2>
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
              <div className="text-end">
                <Link to="/teammember">View more</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb_50">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>My Team Downline </span>
            </h2>
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
              <div className="text-end">
                <Link to="/myteamdownline">View more</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb_50">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>Rewards</span>
            </h2>
          </div>
          <div className="sm_container">
            <select
              style={{
                color: "white",
                backgroundColor: "black",
                border: "none",
                padding: "2px",
                width: "100px",
              }}
              value={selectedlevel ? selectedlevel : "Level 1"}
              onChange={(e) => {
                console.log("selected level::", e.target.value);
                setSelectedLevel(e.target.value);
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

            <select
              className="px-2"
              style={{
                color: "white",
                backgroundColor: "black",
                border: "none",
              }}
              value={selectedIncome}
              onChange={(e) => {
                setSelectedIncome(e.target.value);
              }}
            >
              <option>Select IncomeType</option>
              {incometype.map((data, index) => {
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
                  columns={incomecolumn}
                  data={income2 ? (income2.length > 0 ? income2 : []) : []}
                  // defaultSortFieldId={income2.slice(-1)[0].id}
                  pagination
                  paginationPerPage={4}
                  progressPending={false}
                  customStyles={customStyles}
                />
              </div>
              <div className="text-end">
                <Link to="/rewards"> view more</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb_50 text-light">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>Withdraw History</span>
            </h2>
          </div>
          <div className="sm_container text-light">
            <div className="table_inner">
              <div className="table-responsive gridtable">
                <DataTable
                  columns={withdrawcolumn}
                  data={withdraw ? withdraw : []}
                  pagination
                  paginationPerPage={4}
                  progressPending={false}
                  customStyles={customStyles}
                />
              </div>
              <div className="text-end">
                <Link to="/withdrawhistory">view more</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb_50 text-light">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>Royality Income</span>
            </h2>
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
              <div className="text-end">
                <Link to="/royalityincome">view more</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb_50 text-light">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>Royality History</span>
            </h2>
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
              <div className="text-end">
                <Link to="/royalityhistory">view more</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb_50 text-light">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>Node Reward</span>
            </h2>
          </div>
          <div className="sm_container text-light">
            {/* <select style={{ color: "white", backgroundColor: "black", border: "none", padding: "2px", width: "150px" }}
              // value={selectedNode ? selectedNode : 'Sponsor Node'}
              onChange={(e) => {
                console.log("selected level::", e.target.value);
                setSelectedLevel(e.target.value);
              }}>
              {
                nodeType.map((data, index) => {
                  return (

                    <option value={data} key={index}>{data}</option>
                  )
                })
              }
            </select> */}
            <div className="table_inner">
              <div className="table-responsive gridtable">
                <DataTable
                  columns={noderewardcolumn}
                  data={levelNode ? levelNode : []}
                  pagination
                  paginationPerPage={4}
                  progressPending={false}
                  customStyles={customStyles}
                />
              </div>
              <div className="text-end">
                <Link to="/nodereward">view more</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb_50">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>Your Referral Link</span>
            </h2>
          </div>
          <div className="referal_inner text-center">
            {ref_id != 0 ? (
              <>
                <input
                  className="word-break refinpt"
                  ref={reflink}
                  defaultValue={`http://bdltcommunity.io/?ref_id=${ref_id}`}
                  style={{
                    background: "transparent",
                    color: "white",
                    border: "none",
                    outline: "none",
                    width: "100%",
                    textAlign: "center",
                    fontSize: "20px",
                  }}
                  readOnly={true}
                />
                <br />
                <button
                  title="copy Link"
                  className="grad_btn my-2"
                  onClick={() => {
                    reflink.current.select();
                    document.execCommand("copy");
                    // This is just personal preference.
                    // I prefer to not show the whole text area selected.
                  }}
                >
                  Copy Link
                </button>
                <div className="share-with">
                  <span>Share With</span>
                  <div className="py-2">
                    <a
                      className="p-2 mx-2"
                      href={`https://telegram.me/share/url?url=http://bdltcommunity.io/?ref_id=${ref_id}&text= Join BDLT Community`}
                      target="_blank"
                    >
                      <BsTelegram size={24} color="white" />
                    </a>
                    <a
                      className="p-2 mx-2"
                      href={`whatsapp://send?url=http://bdltcommunity.io/?ref_id=${ref_id}&text= Join BDLT Community`}
                      target="_blank"
                    >
                      <BsWhatsapp size={24} color="white" />
                    </a>
                    <a
                      className="p-2 mx-2"
                      href={`https://www.facebook.com/sharer/sharer.php?u=http://bdltcommunity.io/?ref_id=${ref_id}&text= Join BDLT Community`}
                      target="_blank"
                    >
                      <BsFacebook size={24} color="white" />
                    </a>
                    <a
                      className="p-2 mx-2"
                      href={`https://www.instagram.com/?url=http://bdltcommunity.io/?ref_id=${ref_id}&text= Join BDLT Community`}
                    >
                      <BsInstagram size={24} color="white" />
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <h5>Join first, then you can get your referral id.</h5>
            )}
          </div>
        </div>
      </section>

      <div>
        <footer>
          <div className="container">
            <div className="mt_20">
              {/* <h2> TronLine</h2> */}
              <img
                src="./img/logo-black.png"
                className="img img-fluid"
                style={{ width: "150px" }}
              />
            </div>

            <div
              className="row"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                className="col-sm-12"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <a
                  style={{ borderRadius: "10px" }}
                  className="grad_btn px-3 text-light mx-2"
                  href={`https://explorer.bdltscan.io/address/${CONTRACT_ADDRESS}/contracts`}
                  target="_blank"
                >
                  <img
                    src="/icon_lg.png"
                    className="mx-2"
                    style={{ width: "30px" }}
                  />
                  Smart Contract info
                </a>
                <a
                  className="grad_btn my-3 mt-4"
                  href="https://bdltcommunity.io/support/Login.php"
                  target="_blank"
                >
                  <span className="mx-2">
                    <BiSupport size={24} color="white" />
                  </span>
                  Support
                </a>
                <div
                  className="m-2"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    background:
                      "linear-gradient(to right, rgb(183 183 183), rgb(92 91 94))",
                    padding: "8px 15px",
                    borderRadius: "10px",
                  }}
                >
                  <span className="mx-2">
                    <BsTelegram size={24} color="white" />
                  </span>
                  <a
                    href="https://t.me/+7tHV4QkwDeEyOGM9"
                    className="text-light"
                    target="_blank"
                  >
                    Telegram
                  </a>
                </div>
              </div>
            </div>
            <hr />
            <p>© 2022 BDLT Community | All Rights Reserved. </p>
          </div>
        </footer>
      </div>
    </>
  );
}
